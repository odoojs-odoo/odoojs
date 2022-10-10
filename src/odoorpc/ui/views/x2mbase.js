import { FormView } from './formview'

export class X2mBase {
  constructor(field_info, payload) {
    const { env, type, parent } = payload
    this._type = type
    this._env = env
    this._field_info = field_info
    this._parent_info = parent
  }

  get parent_info() {
    return this._parent_info
  }

  get parent() {
    const info = this.parent_info
    const { action, view } = info
    const { fields } = view
    const env = this.env
    return new FormView(action, { env, fields })
  }

  get relation() {
    return this.env.relation(this.field_info, {
      parent: this.parent_info
    })
  }

  get field_info() {
    return this._field_info
  }

  get env() {
    return this._env
  }

  get Model() {
    const model = this.field_info.relation
    const fields_form = this.field_info.views.form.fields
    const fields_tree = this.field_info.views.tree.fields

    return this.env.model(model, { fields: { ...fields_form, ...fields_tree } })
  }

  get fields_list() {
    return Object.keys(this.fields)
  }

  get fields() {
    const view = this.field_info.views[this._type]
    return view.fields
  }
}
