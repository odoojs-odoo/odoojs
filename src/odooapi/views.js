import xml2json from './xml2json'

import { Search } from './view/search_view'
import { Calendar } from './view/calendar_view'
import { Tree, List } from './view/list_view'
import { Kanban } from './view/kanban_view'
import { Form } from './view/form_view'
import { Pivot, Graph } from './view/pivot_view'

export class Views {
  constructor() {}

  static get search() {
    return Search
  }

  static get tree() {
    return Tree
  }

  static get list() {
    return List
  }

  static get kanban() {
    return Kanban
  }

  static get calendar() {
    return Calendar
  }

  static get pivot() {
    return Pivot
  }

  static get graph() {
    return Graph
  }

  static get form() {
    return Form
  }

  static hide_button({ views }, view_type) {
    const { fields_views = {} } = views
    const info = fields_views[view_type]
    const { arch } = info
    const node = xml2json.toJSON(arch)
    const { create, edit, delete: del } = node.attrs

    const btns = { create, edit, del }
    const res = Object.keys(btns).reduce((acc, btn) => {
      const str = btns[btn]
      const val = str ? !eval(str) : false
      acc[btn === 'del' ? 'delete' : btn] = val
      return acc
    }, {})

    return { ...res }
  }
}
