import { Model as BaseModel } from './models'
import controllers from './controllers'

import ui from './ui'

const web = controllers.web

export class Environment {
  constructor(payload = {}) {
    const { context } = payload
    this.web = web

    if (context) this._context = context
    else {
      const ctx = web.session.user_context
      this._context = ctx
    }
  }

  get menus() {
    const obj = new ui.Menus()
    return obj.menus
  }

  get menus_list() {
    const obj = new ui.Menus()
    return obj.menus_list
  }

  // get actions() {
  //   return ui.Action.actions
  // }

  get session() {
    return web.session.session_info
  }

  get baseURL() {
    return web.baseURL
  }

  has_group(ref_name) {
    // todo 考虑 ! 取反
    if (!ref_name) return true

    // 开启 debug模式 需要在用户中设置
    // todo. 暂时 约定 无 debug 模式
    const debug = 1

    const no_one = 'base.group_no_one'
    const refs = ref_name.split(',')
    const groups = web.groups
    const grp = groups.filter(
      item => refs.includes(item.name) && (debug || item.name !== no_one)
    )
    return grp.length ? true : false
  }

  get uid() {
    return this.session.uid
  }

  get lang() {
    return this.context.lang || 'en_US'
  }

  get context() {
    return this._context
  }

  with_context(kwargs = {}, context) {
    const context2 = context ? context : this.context
    const context3 = { ...context2, ...kwargs }
    const env = new this.constructor({ context: context3 })
    return env
  }

  copy(context) {
    const env = new this.constructor({ context })
    return env
  }

  async ref(xml_id) {
    const Model = this.model('ir.model.data')

    // for  version < 15:
    // const args = ['xmlid_to_res_model_res_id', xml_id, true]
    // next for odoo version >=15

    const [module, ref_name] = xml_id.split('.')
    const args = ['check_object_reference', module, ref_name, true]

    const [model, res_id] = await Model.execute(...args)
    const res2 = { model, id: res_id }
    return res2
  }

  action_info_get(action_id) {
    const action = new ui.Action(action_id)
    return action.info
  }

  view_get(action_id, type) {
    const fn_name = `${type}view`
    return this[fn_name](action_id)
  }

  treeview(action_id) {
    const view = new ui.TreeView(action_id, { env: this })
    return view
  }

  kanbanview(action_id) {
    const view = new ui.KanbanView(action_id, { env: this })
    return view
  }

  formview(action_id, kw = {}) {
    const view = new ui.FormView(action_id, { ...kw, env: this })
    return view
  }

  wizardview(action_id, kw = {}) {
    const view = new ui.WizardView(action_id, { ...kw, env: this })
    return view
  }

  // x2mtree(field_info) {
  //   const view = new ui.X2mTree(field_info, { env: this })
  //   return view
  // }

  // x2mform(field_info) {
  //   const view = new ui.X2mForm(field_info, { env: this })
  //   return view
  // }

  field(field_info, payload = {}) {
    const view = new ui.Field(field_info, { env: this, ...payload })
    return view
  }

  relation(field_info, payload = {}) {
    const view = new ui.Relation(field_info, { env: this, ...payload })
    return view
  }

  _model_sync(model, payload = {}) {
    const { fields } = payload
    const Model = this._create_model_class({ model, fields })
    return Model
  }

  async _model_async(model, payload = {}) {
    const { fields = [] } = payload
    const Model = this._model_sync(model)
    const fields_info = await Model.fields_get(fields)
    Model._updata_fields(fields_info)
    return Model
  }

  model(model, payload = {}) {
    const { fields } = payload
    if (!fields) {
      return this._model_sync(model)
    } else if (Array.isArray(fields)) {
      return this._model_async(model, payload)
    } else {
      // fields is object
      return this._model_sync(model, payload)
    }
  }

  _create_model_class({ model, fields = {} }) {
    const WebModels2 = ui.Action.get_models()
    const BaseModel2 = WebModels2[model] || BaseModel
    // const env = this

    class Model extends BaseModel2 {
      constructor(...args) {
        super(...args)
      }

      static _updata_fields(fields) {
        this._fields = { ...this._fields, ...fields }
      }

      // static get _model_id() {
      //   return env.get_model_id(Model._name)
      // }
    }

    const cls_name = model.replace('.', '_')
    Object.defineProperty(Model, 'name', { value: cls_name })
    Model._env = this
    Model._model = model
    Model._fields = fields

    return Model
  }

  // model(model, payload = {}) {
  //   const { fields } = payload
  //   if (!Object.keys(this._registry).includes(model)) {
  //     const MyClass = this._create_model_class({ model, fields })
  //     this._registry[model] = MyClass
  //   } else {
  //     const MyClass = this._registry[model]
  //     MyClass._updata_fields(fields)
  //   }
  //   const Model = this._registry[model]
  //   return Model.with_env(this)
  // }

  // get_model_id(model) {
  //   return this._model_registry[model]
  // }

  // get _registry() {
  //   return this.constructor._registry
  // }
  // get _ref_registry() {
  //   return this.constructor._ref_registry
  // }
  // get _model_registry() {
  //   return this.constructor._model_registry
  // }

  // async _set_model_registry(models2) {
  //   const old_models = Object.keys(this._model_registry)
  //   const models = models2.filter(item => !old_models.includes(item))
  //   if (models.length === 0) return

  //   const domain = [['model', 'in', models]]

  //   const Model = this.model('ir.model')
  //   const model_ids = await Model.search_read({ domain, fields: ['model'] })
  //   const all_models = model_ids.reduce((acc, cur) => {
  //     acc[cur.model] = cur.id
  //     return acc
  //   }, {})

  //   Object.keys(all_models).forEach(item => {
  //     this._model_registry[item] = all_models[item]
  //   })
  // }
}

// Environment._ref_registry = {}
// Environment._registry = {}
// Environment._model_registry = {}
