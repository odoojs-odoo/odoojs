const addons_load = AddonsFiles => {
  const load_one_addons = (records1, module_name) => {
    if (!records1) {
      return {}
    }

    const patch_xml_id = (module_name, xml_name, one) => {
      const xml_id = `${module_name}.${xml_name}`
      return { ...one, xml_id, id: xml_id }
    }

    const patch_module_name = (module_name, str) => {
      if (!str) {
        return undefined
      } else {
        const len = str.split('.').length
        if (len === 1) {
          return `${module_name}.${str}`
        } else {
          return str
        }
      }
    }

    const load_menu_childs = (module_name, menu) => {
      const children1 = menu.children || {}

      const children = Object.keys(children1).reduce((acc, cur) => {
        const one = patch_xml_id(module_name, cur, children1[cur])
        one.parent = menu.xml_id
        one._odoo_model = 'ir.ui.menu'
        const acc2 = load_menu(module_name, one)
        return { ...acc, ...acc2 }
      }, {})

      return children
    }

    const load_menu = (module_name, menu) => {
      const children = load_menu_childs(module_name, menu)

      const me = {
        ...menu,
        sequence: menu.sequence !== undefined ? menu.sequence : 10
      }
      delete me.children

      const parent2 = patch_module_name(module_name, me.parent)
      const action2 = patch_module_name(module_name, me.action)
      if (parent2) me.parent = parent2
      if (action2) me.action = action2

      return { [menu.xml_id]: me, ...children }
    }

    const load_view = one => {
      const one2 = {
        ...one,
        buttons: { ...(one.buttons || {}) },
        priority: one.priority || 16
      }

      if (one2.buttons.create === undefined) one2.buttons.create = true
      if (one2.buttons.edit === undefined) one2.buttons.edit = true
      if (one2.buttons.delete === undefined) one2.buttons.delete = true

      return one2
    }

    const load_action = (module_name, one) => {
      const one2 = { ...one, views: { ...(one.views || {}) } }

      const search_view_id2 = patch_module_name(
        module_name,
        one2.search_view_id
      )
      if (search_view_id2) one2.search_view_id = search_view_id2

      const { view_mode = ['tree', 'kanban', 'form'], views = {} } = one
      view_mode.forEach(mode => {
        one2.views[mode] = patch_module_name(module_name, views[mode])
      })

      return one2
    }

    return Object.keys(records1).reduce((acc, cur) => {
      const one = patch_xml_id(module_name, cur, records1[cur])

      if (one._odoo_model === 'ir.ui.menu') {
        const menus = load_menu(module_name, one)
        // console.log('menus,', menus)
        acc = { ...acc, ...menus }
      } else if (one._odoo_model === 'ir.actions') {
        const one2 = load_action(module_name, one)
        acc = { ...acc, [one.xml_id]: one2 }
      } else if (one._odoo_model === 'ir.ui.view') {
        const one2 = load_view(one)
        acc = { ...acc, [one.xml_id]: one2 }
      } else {
        acc[one.xml_id] = one
      }

      return acc
    }, {})
  }
  const addonsAll = AddonsFiles.keys().reduce((acc, modulePath) => {
    const value = AddonsFiles(modulePath)
    const paths = modulePath.split('/')
    const module_name = paths[1]
    const one_addons = load_one_addons(value.default, module_name)
    acc = { ...acc, ...one_addons }
    return acc
  }, {})

  return addonsAll
}

// const addonsFiles = require.context('@/odoorpc/addons', true, /\.js$/)
// const test_res = addons_load(addonsFiles)
// console.log('asdasd,', test_res)

export class Addons {
  constructor() {}
  static get data() {
    return this.load(this.addons_list)
  }

  static load(addons_list) {
    const res = addons_list.reduce((acc, files) => {
      const one = addons_load(files)
      return { ...acc, ...one }
    }, {})

    const filter_fn = (res, odoo_model) => {
      return Object.keys(res)
        .filter(item => res[item]._odoo_model === odoo_model)
        .reduce((acc, cur) => {
          return { ...acc, [cur]: res[cur] }
        }, {})
    }

    const menus = filter_fn(res, 'ir.ui.menu')
    const actions = filter_fn(res, 'ir.actions')
    const views = filter_fn(res, 'ir.ui.view')

    const view_get_first = (res_model, mode) => {
      const res = Object.values(views)
        .filter(item => item.model === res_model && item.type === mode)
        .sort((a, b) => a.priority - b.priority)

      if (res.length) {
        return res[0].xml_id
      } else {
        return undefined
      }
    }

    const actions2 = Object.values(actions).reduce((acc, one) => {
      const one2 = { ...one, views: { ...(one.views || {}) } }
      const {
        res_model,
        view_mode = ['tree', 'kanban', 'form'],
        views = {}
      } = one

      view_mode.forEach(mode => {
        const view1 = views[mode]

        if (view1) {
          one2.views[mode] = view1
        } else {
          const view_1st = view_get_first(res_model, mode)
          if (view_1st) {
            one2.views[mode] = view_1st
          } else {
            if (mode === 'kanban') {
              one2.views[mode] = view_get_first(res_model, 'tree')
            } else {
              one2.views[mode] = view_1st
            }
          }
        }

        // one2.views[mode] = views[mode] || view_get_first(res_model, mode)
      })

      one2.views.search =
        one.search_view_id || view_get_first(res_model, 'search')

      // console.log(one2.xml_id, one2)

      acc[one.xml_id] = one2

      return acc
    }, {})

    const menus2 = Object.values(menus)
      .sort((a, b) => a.sequence - b.sequence)
      .filter(item => item.active !== false)
      .reduce((acc, cur) => {
        acc[cur.xml_id] = cur
        return acc
      }, {})

    return { menus: menus2, actions: actions2, views }
  }
}

Addons.addons_list = []

const menus_load = () => {
  const addons_data = Addons.data

  const addons_menus = addons_data.menus || {}

  const menus_get = (root = {}) => {
    const children = Object.values(addons_menus)
      .filter(item => {
        if (!root.xml_id) {
          return !item.parent
        } else {
          return item.parent === root.xml_id
        }
      })
      .map(item => {
        return {
          ...item,
          children: menus_get(item)
        }
      })

    return children
  }

  const children = menus_get()

  // console.log(addons_menus, children)

  return { children }
}

export class Menus {
  constructor() {
    this._addons = Addons.data

    this._menus = menus_load()
  }

  get menus() {
    return this._menus
  }

  get menus_list() {
    return this._addons.menus
  }
}

const actions_load = action => {
  const addons_data = Addons.data
  const actions = addons_data.actions
  const info = actions[action]

  const views_all = addons_data.views
  const views = Object.keys(info.views).reduce((acc, cur) => {
    const view_info = (info.views[cur] && views_all[info.views[cur]]) || {}

    if (cur === 'kanban' && view_info.type === 'tree') {
      acc[cur] = { ...view_info, type: 'kanban', templates: {} }
    } else {
      acc[cur] = view_info
    }

    return acc
  }, {})
  return { ...info, views }
}

export class Action {
  constructor(action_id, payload = {}) {
    const { env, context } = payload
    const info =
      typeof action_id === 'string' ? actions_load(action_id) : action_id

    if (context) {
      this._raw_info = { ...info, context: { ...info.context, ...context } }
    } else {
      this._raw_info = info
    }

    this._env = env
  }

  get info() {
    return this._raw_info
  }

  get env() {
    return this._env
  }

  get context_default() {
    const ctx = this.info.context
    if (typeof ctx !== 'function') {
      return ctx || {}
    }
    const ctx2 = ctx({ record: this.env.context })
    return ctx2
  }

  get context() {
    const ctx1 = this.context_default
    const ctx2 = this.env.context
    return { ...ctx2, ...ctx1 }
  }

  get domain() {
    const domain1 = this.info.domain
    return domain1
  }

  //
  // static get actions() {
  //   return Addons.data.actions
  // }
}
