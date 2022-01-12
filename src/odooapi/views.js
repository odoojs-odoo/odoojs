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

  // static onchange(info, view_type, { calendarData }) {
  //   if (view_type === 'calendar') {
  //     const res =
  //       calendarData && calendarData.date
  //         ? calendarData
  //         : Calendar.default_value()

  //     return { calendarData: res }
  //   }
  //   return { calendarData }
  // }

  // static async load_data(info, payload) {
  //   const { view_type, searchValue: search } = payload
  //   const { views } = info
  //   const { fields_views = {} } = views
  //   const { calendar, list, kanban } = fields_views

  //   if (view_type === 'calendar') {
  //     const { calendarData: value } = payload
  //     return Calendar.load_data({ ...info, view: calendar }, { value, search })
  //   } else if (['list'].includes(view_type)) {
  //     return List.load_data({ ...info, view: list }, { search })
  //   } else if (['kanban'].includes(view_type)) {
  //     return Kanban.load_data({ ...info, view: kanban }, { search })
  //   } else {
  //     return {}
  //   }

  //   // return {}
  // }

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
