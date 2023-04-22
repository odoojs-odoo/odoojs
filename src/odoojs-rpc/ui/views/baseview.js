import { Action } from '../action'

import { ViewHelp } from './viewhelp'

export class BaseView {
  static metadata_fields(model) {
    const web_fields = Action.get_web_fields(model)
    return web_fields
  }

  constructor(action_id, payload = {}) {
    const { env, type, fields = {} } = payload
    this._action = new Action(action_id, { env })
    this._type = type
    this._env = env
    this._fields_info = fields
  }

  viewhelp_get() {
    return new ViewHelp(this)
  }

  async metadata_fields_get() {
    //
    // 预定义的 domain 需要 异步调用的.
    // 通过 domain_creater 异步创建 同步函数 domain
    // 在 load views 时 一期处理
    // 例子 sale.order.user_id
    const model = this.res_model
    const fields = this.constructor.metadata_fields(model)

    const fields2 = {}
    for (const fld of Object.keys(fields)) {
      const meta = fields[fld]
      if (meta.domain_creater) {
        const domain = await meta.domain_creater({ env: this.env })
        fields2[fld] = { ...meta, domain }
      } else {
        fields2[fld] = meta
      }
    }

    return fields2
  }

  new_action(action_id, payload) {
    // button click return action.
    //
    const { context } = payload
    return new Action(action_id, { env: this.env, context })
  }

  get env() {
    return this._env
  }

  get action() {
    return this._action
  }

  get action_info() {
    return this._action.info
  }

  get res_model() {
    return this.action_info.res_model
  }

  get context() {
    return { ...this.action.context }
  }

  context_get() {
    return { ...this.action.context }
  }

  get buttons() {
    const action = this.action_info
    const view = action.views[this._type]
    return view.buttons
  }

  get action_buttons() {
    const action = this.action_info
    const view = action.views[this._type]
    const { toolbar = {} } = view
    const { action: action_buttons = [] } = toolbar
    return action_buttons
  }

  get fields() {
    return this._fields_info
  }

  get fields_list() {
    return Object.keys(this.fields)
  }

  get view_info() {
    const action = this.action_info
    const view = action.views[this._type]

    return {
      action: this.action_info,
      view: { ...view, fields: this.fields }
    }
  }

  get Model() {
    const model = this.res_model
    const Model = this.env.model(model, { fields: this.fields })
    return Model
  }

  // async _load_x2m_views(meta) {
  //   const x2m = new Relation(meta, { env: this.env })
  //   return x2m._load_views()
  // }

  async set_lang(lang) {
    this.env._set_env_lang(lang)

    const model = this.res_model
    const Model = this.env.model(model)

    const fields = this._fields_info

    const fields_list = Object.keys(fields)
    const fields_odoo = await Model.fields_get(fields_list, [
      'string',
      'selection'
    ])

    const fields_in_sheet = this._load_fields_from_sheet()
    const fields_in_model = this.constructor.metadata_fields(model)

    function new_meta_get(fld) {
      const meta1 = fields_in_sheet[fld] || {}
      const meta2 = fields_in_model[fld] || {}
      const meta3 = fields_odoo[fld] || {}
      const meta4 = fields[fld] || {}

      function str_get() {
        if ('string' in meta1) {
          return meta1.string
        } else if ('string' in meta2) {
          return meta2.string
        } else if ('string' in meta3) {
          return meta3.string
        } else {
          return meta4.string
        }
      }
      function sel_get() {
        if ('selection' in meta3) {
          if ('selection' in meta2) {
            return { selection: meta2.selection }
          } else {
            return { selection: meta3.selection }
          }
        } else {
          return {}
        }
      }

      return { string: str_get(), ...sel_get() }
    }

    const fields2 = Object.keys(fields).reduce((acc, fld) => {
      acc[fld] = { ...fields[fld], ...new_meta_get(fld) }
      return acc
    }, {})

    this._fields_info = fields2
    return fields2
  }

  get_fields_from_sheet(sheet) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.get_fields_from_sheet(sheet)
  }

  _load_fields_from_sheet() {
    const fields_raw_get_from_sheet = () => {
      const { view } = this.view_info
      const { arch = {} } = view
      const { sheet = {}, header = {} } = arch
      const { fields = {} } = header
      const sheet2 = { ...fields, ...sheet }
      console.log(view, arch)
      return this.get_fields_from_sheet(sheet2)
    }

    const fields_raw_get = () => {
      const fs = fields_raw_get_from_sheet()
      const action = this.action_info
      const fs2 = action.views[this._type].fields || {}
      return { ...fs2, ...fs }
    }

    return fields_raw_get()
  }

  async _load_fields() {
    const model = this.res_model
    const Model = this.env.model(model)
    const fields_raw = this._load_fields_from_sheet()

    const fields_list = Object.keys(fields_raw)
    const info = await Model.fields_get(fields_list)

    const fields_in_model = await this.metadata_fields_get()

    const fields = Object.keys(fields_raw).reduce((acc, cur) => {
      acc[cur] = {
        ...(info[cur] || {}),
        ...(fields_in_model[cur] || {}),
        ...(fields_raw[cur] || {})
      }
      return acc
    }, {})

    this._fields_info = fields

    return fields
  }

  async load_fields() {
    return this._load_fields()
  }

  async unarchive(ids) {
    if (!ids.length) return true
    return await this.Model.action_unarchive(ids)
  }

  async archive(ids) {
    if (!ids.length) return true
    return await this.Model.action_archive(ids)
  }

  download({ filename, filetype, data }) {
    // //ArrayBuffer 转为 Blob
    const blob = new Blob([data], { type: filetype })
    const objectUrl = URL.createObjectURL(blob)
    const filename2 = decodeURIComponent(filename)
    const a = document.createElement('a')
    a.setAttribute('href', objectUrl)
    a.setAttribute('download', filename2)
    a.click()
    return true
  }
}
