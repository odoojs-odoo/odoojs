import { Addons } from './addons'

const menus_load = addons_data => {
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

  return { children }
}

export class Menus {
  constructor() {
    const addons_data = Addons.addons_register
    this._addons = addons_data
    this._menus = menus_load(addons_data)
  }

  get menus() {
    return this._menus
  }

  get menus_list() {
    return this._addons.menus
  }
}

export class Action {
  static get_web_fields(model) {
    const addons_data = Addons.addons_register
    const { models_for_fields } = addons_data
    const web_fields = models_for_fields[model] || {}

    return web_fields
  }

  static get_models() {
    const addons_data = Addons.addons_register
    const { models } = addons_data
    return models
  }

  constructor(action_id, payload = {}) {
    // console.log(action_id)

    const { env, context } = payload
    this._env = env
    this._context = context
    this._action_id = action_id
  }

  load_action_info(action) {
    const addons_data = Addons.addons_register

    const actions = addons_data.actions
    const info = actions[action]
    if (!info) {
      throw `${action} error`
      // return {}
    }

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

  get info() {
    const action_id = this._action_id
    const context = this._context || {}

    const info =
      typeof action_id === 'string'
        ? this.load_action_info(action_id)
        : action_id

    const ctx1 = this.get_context_default(info.context)

    return { ...info, context: { ...ctx1, ...context } }
  }

  get env() {
    return this._env
  }
  get_context_default(ctx) {
    if (typeof ctx !== 'function') {
      return ctx || {}
    }
    //
    const ctx2 = ctx({ env: this.env })
    return ctx2
  }

  // todo
  get context_default() {
    const ctx = this.info.context
    if (typeof ctx !== 'function') {
      return ctx || {}
    }
    //
    const ctx2 = ctx({ record: this.env.context })
    return ctx2
  }

  // todo
  get context() {
    const ctx1 = this.context_default
    const ctx2 = this.env.context
    const ctx3 = this._context || {}
    return { ...ctx2, ...ctx1, ...ctx3 }
  }

  get domain() {
    const domain1 = this.info.domain
    return domain1
  }

  get limit() {
    const limit = this.info.limit
    return limit
  }
}
