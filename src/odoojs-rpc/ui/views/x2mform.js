import { X2mBase } from './x2mbase'

import { EditX2m } from './editmodel'

import { ViewHelp } from './viewhelp'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export class X2mFormModel extends X2mBase {
  constructor(field_info, payload) {
    super(field_info, { ...payload, type: 'form' })
    this.edit_model = undefined
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

  get fields_list() {
    return Object.keys(this.fields)
  }

  set_editable(record, values) {
    this.edit_model = new EditX2m(this)
    return this.edit_model.set_editable(record, values)
  }

  async onchange_new(parentFormInfo) {
    // console.log('onchange_new', parentFormInfo)
    return this.edit_model.onchange_new(parentFormInfo)
  }

  async onchange(fname, value, parentFormInfo) {
    return this.edit_model.onchange(fname, value, parentFormInfo)
  }

  async commit(kwargs = {}) {
    return this.edit_model.commit(kwargs)
  }
}

export class X2mForm extends X2mFormModel {
  constructor(field_info, payload) {
    super(field_info, { ...payload })
  }

  get view_info() {
    return { view: this.field_info.views.form }
  }

  get arch_sheet() {
    const view = this.field_info.views.form
    const { arch = {} } = view
    const { sheet = {} } = arch
    return sheet
  }

  viewhelp_get() {
    return new ViewHelp(this)
  }

  view_sheet(formInfo) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.view_sheet({ ...formInfo, for_o2m: true })
  }

  //
  // check modifiers
  //

  check_invisible(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.check_invisible(fieldInfo, { ...kw, for_o2m: true })
  }

  check_required(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.check_required(fieldInfo, { ...kw, for_o2m: true })
  }

  check_readonly(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.check_readonly(fieldInfo, { ...kw, for_o2m: true })
  }

  get_string(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.get_string(fieldInfo, { ...kw, for_o2m: true })
  }

  get_domain(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.get_domain(fieldInfo, { ...kw, for_o2m: true })
  }

  //
  // for record and values
  //

  merge_data(record, values) {
    // call by editmodel.set_editable
    const viewhelp = this.viewhelp_get()
    return viewhelp._merge_data(record, values)
  }

  merge_to_modifiers(record, values, parentFormInfo) {
    // call by check_modifers
    const viewhelp = this.viewhelp_get()
    return viewhelp.merge_to_modifiers(record, values, {
      parentFormInfo,
      for_o2m: true
    })
  }

  merge_to_onchange(record, values) {
    // call by editmodel.onchange
    // call by treeview.format_to_onchange
    const viewhelp = this.viewhelp_get()
    return viewhelp.merge_to_onchange(record, values, { for_o2m: true })
  }

  merge_to_write(record, values, parentFormInfo) {
    //  call by  treeview.format_to_write
    const viewhelp = this.viewhelp_get()
    return viewhelp.merge_to_write(record, values, {
      parentFormInfo,
      for_o2m: true
    })
  }

  // never to call
  format_to_onchange(record) {
    const viewhelp = this.viewhelp_get()
    return viewhelp._format_to_onchange(record, true)
  }

  //
  // todel
  //
  // // never call
  // format_to_modifiers(record) {
  //   const viewhelp = this.viewhelp_get()
  //   return viewhelp._format_to_modifiers(record, true)
  // }

  // // never call
  // format_to_write(values, record) {
  //   const viewhelp = this.viewhelp_get()
  //   return viewhelp._format_to_write(values, record, true)
  // }
}
