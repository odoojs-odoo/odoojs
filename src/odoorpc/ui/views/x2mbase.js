export class X2mBase {
  constructor(field_info, payload) {
    const { env, type } = payload
    this._type = type
    this._env = env
    this._field_info = field_info
  }

  parent_get(parentInfo) {
    const { fields, viewInfo } = parentInfo
    const { action } = viewInfo
    return this.env.formview(action, { fields })
  }

  // todo 嵌套 o2m
  // o2xtree,  读数据, 需要 context
  // o2xform oncgange 需要 context
  context_get(parentInfo) {
    // console.log('X2mTree context_get: ', parentInfo)
    const context_fn = this.field_info.context
    const prt = this.parent_get(parentInfo)
    const context = prt.context
    if (typeof context_fn !== 'function') {
      return { ...context, ...(context_fn || {}) }
    }
    const { record, values } = parentInfo
    const parent_record = prt.merge_to_modifiers(record, values)
    const env = this.env
    const ctx = context_fn({ env, context, record: { ...parent_record } })
    return { ...context, ...ctx }
  }

  get relation() {
    return this.env.relation(this.field_info)
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
    const views = this.field_info.views
    const fields = Object.keys(views).reduce((acc, viewname) => {
      acc = { ...acc, ...views[viewname].fields }
      return acc
    }, {})
    const view = views[this._type]
    return { ...fields, ...view.fields }
  }
}
