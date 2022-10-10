import { X2mTreeBase } from './x2mtree'

export class X2mKanban extends X2mTreeBase {
  constructor(field_info, payload) {
    super(field_info, { ...payload, type: 'kanban' })
  }

  async read(ids) {
    // console.log('X2mKanban read: ', ids, this.field_info)

    const fields_me = this.fields
    const fields_form = this.field_info.views.form.fields
    const fields_list = Object.keys({ ...fields_me, ...fields_form })

    // const fields_list = this.fields_list
    const res = await this.Model.read(ids, fields_list)
    return res
  }

  get templates() {
    const templates = this.field_info.views.kanban.templates || {}
    return templates
  }

  kanban_title(record) {
    // console.log(record, this.templates)
    const fn = this.templates.title
    if (fn) {
      return fn({ record })
    } else {
      return record.display_name
    }
  }

  kanban_label(record) {
    const fn = this.templates.label
    if (fn) {
      return fn({ record })
    } else {
      return undefined
    }
  }

  kanban_default(record) {
    const fn = this.templates.default
    if (fn) {
      return fn({ record })
    } else {
      return undefined
    }
  }
}
