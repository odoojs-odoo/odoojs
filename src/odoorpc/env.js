import { Model as BaseModel } from './models'
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
  constructor(payload) {
    const { odoo, context } = payload
    this._odoo = odoo
    this._context = context
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

  get odoo() {
    return this._odoo
  }

  get uid() {
    return this.odoo.session_info.uid
  }

  get context() {
    if (this._context) return this._context

    // 登录后, context 不为空
    const context = this.odoo.web.session.context
    return context
  }

  async _set_model_registry(models2) {
    const old_models = Object.keys(this._model_registry)
    const models = models2.filter(item => !old_models.includes(item))
    if (models.length === 0) return

    const domain = [['model', 'in', models]]

    // const model = 'ir.model'
    // const method = 'search_read'
    // const kwargs = { domain, fields: ['model'] }
    // const payload = { model, method, args: [], kwargs }
    // const model_ids = await this.odoo.web.dataset.call_kw(payload)

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

  with_context(context) {
    // env.copy 前, 需要自己把 context 组织好
    // env里的 旧的 context 被全覆盖
    const env = new this.constructor({ odoo: this._odoo, context })
    return env
  }

  append_context(context) {
    const context2 = { ...this.context, ...context }
    return this.with_context(context2)
  }

  copy(context) {
    return this.with_context(context)
  }

  async ref(xml_id) {
    const res = this._ref_registry[xml_id]
    if (res) return res

    const Model = this.model('ir.model.data')
    const args = ['xmlid_to_res_model_res_id', xml_id, true]
    const [model, id_] = await Model.execute(...args)
    const res2 = { model, id: id_ }
    this._ref_registry[xml_id] = res2
    return res2
  }

  model(model, payload = {}) {
    const { fields } = payload
    if (!Object.keys(this._registry).includes(model)) {
      const MyClass = this._create_model_class({ model, fields })
      this._registry[model] = MyClass
    } else {
      const MyClass = this._registry[model]
      MyClass._updata_fields(fields)
    }
    const Model = this._registry[model]
    return Model.with_env(this)
  }

  _create_model_class({ model, fields = {} }) {
    // const BaseModel2 = AllModels[model] || BaseModel

    const WebModels = this.odoo._addons || {}
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
    Model._odoo = this._odoo
    Model._model = model
    Model._fields = fields

    return Model
  }
}

Environment._ref_registry = {}

Environment._registry = {}
Environment._model_registry = {}
