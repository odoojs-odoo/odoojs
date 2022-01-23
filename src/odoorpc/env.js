import { Model as BaseModel } from './models'
import controllers from './controllers'

const web = controllers.web

// ok
const AddonsFiles = require.context('./addons', true, /\.js$/)

// you do not need `import sale from './addons/sale'`
// it will auto require all odoo model from addons file
const AddonsModels = AddonsFiles.keys().reduce((models, modulePath) => {
  const value = AddonsFiles(modulePath)
  models = { ...models, ...value.default }
  return models
}, {})

const AllModels = { ...AddonsModels }
// console.log('xxxx AllModels,', AddonsModels)

export class Environment {
  constructor(payload = {}) {
    const { context } = payload

    if (context) this._context = context
    else {
      const ctx = web.session.user_context
      this._context = ctx
    }
  }

  get _registry() {
    return this.constructor._registry
  }
  get _ref_registry() {
    return this.constructor._ref_registry
  }
  get _model_registry() {
    return this.constructor._model_registry
  }

  get session() {
    return web.session.session_info
  }

  get uid() {
    return this.session.uid
  }

  get context() {
    return this._context
  }

  async _set_model_registry(models2) {
    const old_models = Object.keys(this._model_registry)
    const models = models2.filter(item => !old_models.includes(item))
    if (models.length === 0) return

    const domain = [['model', 'in', models]]

    const Model = this.model('ir.model')
    const model_ids = await Model.search_read({ domain, fields: ['model'] })
    const all_models = model_ids.reduce((acc, cur) => {
      acc[cur.model] = cur.id
      return acc
    }, {})

    Object.keys(all_models).forEach(item => {
      this._model_registry[item] = all_models[item]
    })
  }

  get_model_id(model) {
    return this._model_registry[model]
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
    // const res = this._ref_registry[xml_id]
    // if (res) return res

    const Model = this.model('ir.model.data')
    const args = ['xmlid_to_res_model_res_id', xml_id, true]
    const [model, res_id] = await Model.execute(...args)
    const res2 = { model, id: res_id }
    // this._ref_registry[xml_id] = res2
    return res2
  }

  model(model, payload = {}) {
    const { fields } = payload
    const Model = this._create_model_class({ model, fields })
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

  _create_model_class({ model, fields = {} }) {
    // const BaseModel2 = AllModels[model] || BaseModel

    // const WebModels = this.odoo._addons || {}

    const WebModels = {}
    const BaseModel2 = WebModels[model] || AllModels[model] || BaseModel

    const env = this

    class Model extends BaseModel2 {
      constructor(...args) {
        super(...args)
      }

      static _updata_fields(fields) {
        this._fields = { ...this._fields, ...fields }
      }

      static get _model_id() {
        return env.get_model_id(Model._name)
      }
    }

    const cls_name = model.replace('.', '_')
    Object.defineProperty(Model, 'name', { value: cls_name })
    Model._env = this
    Model._model = model
    Model._fields = fields

    return Model
  }
}

Environment._ref_registry = {}
Environment._registry = {}
Environment._model_registry = {}
