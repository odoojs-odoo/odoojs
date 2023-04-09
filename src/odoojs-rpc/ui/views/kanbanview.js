import { TreeBaseView } from './treeview'

export class KanbanView extends TreeBaseView {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload, type: 'kanban' })

    const templates = this.templates
    // console.log(templates)

    if (!templates.title) {
      const action = this.action_info
      const fields_raw = action.views[this._type].fields
      if (!('display_name' in fields_raw)) {
        fields_raw.display_name = {}
      }
    }
  }

  get templates() {
    const action = this.action_info
    const view = action.views.kanban
    return view.templates || {}
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
