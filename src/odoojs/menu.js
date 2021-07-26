import py_utils from './py_utils'

const menuLoadodoo = process.env.VUE_APP_MENU_LOAD_ODOO

const menuLoad = process.env.VUE_APP_MENU_LOAD

export class Menu {
  constructor(env) {
    this._env = env
    this._menus = []

    this._actions = {}
  }

  get env() {
    return this._env
  }

  get menus() {
    return this._menus
  }

  get actions() {
    return Object.keys(this._actions).map(item => {
      return { name: item }
    })
  }

  async load_menus() {
    const my_menus = await this._load_menus_me()
    // console.log(my_menus)
    const comp_menus = await this._load_menus_comp()
    // console.log(comp_menus)

    const odoojs_menus = [...my_menus, ...comp_menus]

    const odoo_menus = await this._load_menus_odoo()
    // const odoo_menus = []
    const subMenus = [...odoo_menus, ...odoojs_menus]
    this._menus = subMenus
    return subMenus
  }

  async _load_menus_comp() {
    if (!menuLoad) {
      return []
    }
    const user_info = await this.env
      .model('res.users')
      .read(1, { fields: ['action_id'] })

    const user = user_info.find(item => item.id === 1) || {}

    const action_id = (user.action_id || [0, null])[0]
    // console.log(1, user, action_id)
    if (!action_id) {
      return []
    }
    const comp_menus = await this._load_menus_by_action(action_id)

    const comp_root = {
      icon: 'ios-apps',
      id: 0,
      name: 'comp_root',
      title: '公司控制台',
      children: comp_menus
    }

    return [comp_root]
  }

  async _load_menus_me() {
    if (!menuLoad) {
      return []
    }
    const uid = this.env.odoo.session_info.uid

    // console.log(this.env, uid)
    if (!uid) {
      return []
    }

    const user_info = await this.env
      .model('res.users')
      .read(uid, { fields: ['action_id'] })

    const user = user_info.find(item => item.id === uid) || {}

    const action_id = (user.action_id || [0, null])[0]
    // console.log(uid, user, action_id)
    if (!action_id) {
      return []
    }
    const me_menus = await this._load_menus_by_action(action_id)

    const me_root = {
      icon: 'ios-apps',
      id: 0,
      name: 'me_root',
      title: '我的控制台',
      children: me_menus
    }

    return [me_root]
  }

  async _load_menus_by_action(action_id) {
    const action_info = await this.env.odoo.web.action.load(
      action_id
      // additional_context
    )

    // console.log(action_info)

    const domain = py_utils.eval(action_info.domain, {})

    // console.log(action_info, domain)
    const root_id = domain[0][2]
    // console.log(action_info, domain, root_id)
    // const root = await get_root()
    // if (!root) {
    //   return []
    // }
    const odoojs_menus = await this._load_menus_by_root(root_id)
    // console.log('odoojs_menus', JSON.parse(JSON.stringify(odoojs_menus)))
    return odoojs_menus
  }

  async _load_menus_odoo() {
    if (!menuLoadodoo) {
      return []
    }

    const odoo_menus = await this._load_menus_by_root()

    // console.log('odoo_menus', JSON.parse(JSON.stringify(odoo_menus)))

    const odoo_root = {
      icon: 'ios-apps',
      id: 0,
      name: 'odoo_root',
      title: 'odoo官方菜单',
      children: odoo_menus
    }

    return [odoo_root]
  }

  async _load_menus_by_root(root_id_in) {
    const Model = this.env.model('ir.ui.menu')

    const domain = root_id_in ? [['id', 'child_of', root_id_in]] : []
    const res = await Model.search_read({ domain })
    // console.log(domain, JSON.parse(JSON.stringify(res)))

    const get_sub = root_id => {
      const my_filter = item => {
        // root_id
        //   ? item.parent_id && item.parent_id[0] === root_id
        //   : item.parent_id === false
        if (root_id) {
          return item.parent_id && item.parent_id[0] === root_id
        } else {
          return item.parent_id === false
        }
      }

      return res.filter(my_filter).map(item => {
        if (item.action) {
          // ir.actions.act_window
          // ir.actions.act_window

          const [action_type, action_id] = item.action.split(',')

          return {
            id: item.id,
            type: action_type,
            name: action_id,
            title: item.name,
            item
          }
        } else {
          const children = get_sub(item.id)

          return {
            id: item.id,
            name: `ir.ui.menu,${item.id}`,
            title: item.name,
            icon: item.iview_icon,
            children,
            item
          }
        }
      })
    }

    const subMenus = get_sub(root_id_in)

    // console.log(subMenus)

    const actions = res
      .filter(item => item.action)
      .reduce((acc, item) => {
        const action_id = item.action.split(',')[1]
        return { ...acc, [action_id]: action_id }
      }, {})

    this._actions = { ...this._actions, ...actions }

    return subMenus
  }
}
