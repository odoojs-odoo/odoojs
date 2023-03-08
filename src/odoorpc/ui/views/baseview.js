import { Action } from '../action'

const AddonsFieldsFiles = require.context('../../addons_fields', true, /\.js$/)

const load_from_files = files => {
  return files.keys().reduce((models, modulePath) => {
    const value = files(modulePath)
    // console.log('AddonsFields,', modulePath, value)

    models = { ...models, ...value.default }
    return models
  }, {})
}

const AddonsFields = load_from_files(AddonsFieldsFiles)

const load_from_files_list = files_list => {
  return files_list.reduce((acc, files) => {
    const acc2 = load_from_files(files)
    return { ...acc, ...acc2 }
  }, {})
}

export class BaseView {
  static metadata_fields(model) {
    const web_fields = load_from_files_list(this.web_fields_list)
    const addons_fields = { ...AddonsFields, ...web_fields }
    return addons_fields[model] || {}
  }

  constructor(action_id, payload = {}) {
    const { env, type, fields = {} } = payload
    this._action = new Action(action_id, { env })
    this._type = type
    this._env = env
    this._fields_info = fields
  }

  new_action(action_id, payload) {
    const { env, context } = payload
    return new Action(action_id, { env, context })
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
    return {
      action: this.action_info,
      view: {
        fields: this.fields
      }
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

  async _load_fields() {
    const model = this.res_model
    const Model = this.env.model(model)
    const action = this.action_info
    const fields_raw = action.views[this._type].fields
    const fields_list = Object.keys(fields_raw)
    const info = await Model.fields_get(fields_list)

    const fields_in_model = this.constructor.metadata_fields(model)

    const fields = Object.keys(fields_raw).reduce((acc, cur) => {
      acc[cur] = {
        ...(info[cur] || {}),
        ...(fields_in_model[cur] || {}),
        ...(fields_raw[cur] || {})
      }
      return acc
    }, {})

    // console.log('xxxx fields,', model, fields)

    // console.log(fields)

    // for (const fld in fields) {
    //   // console.log(fields, fld, fields[fld])
    //   const meta = fields[fld]
    //   if (meta.widget === 'x2many_tree') {
    //     const views = await this._load_x2m_views(meta)
    //     // console.log(fld, meta.views, views)
    //     meta.views = views
    //   }
    // }

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

BaseView.web_fields_list = []
