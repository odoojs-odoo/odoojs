import rpc from '@/odoorpc'

import { JsonRequest } from '@/odoorpc/request'

import xml2json from '../xml2json'
import { Action, XML } from '../action'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export class ViewBase {
  constructor() {}

  static get baseURL() {
    return JsonRequest.baseURL
  }

  static download({ filename, filetype, data }) {
    // //ArrayBuffer 转为 Blob
    const blob = new Blob([data], { type: filetype })
    const objectUrl = URL.createObjectURL(blob)
    const filename2 = decodeURIComponent(filename)
    const a = document.createElement('a')
    a.setAttribute('href', objectUrl)
    a.setAttribute('download', filename2)
    a.click()
    return true
  }

  static _context({ context, action }) {
    return Action._context({ context, action })
  }

  static _default_domain({ context, action }) {
    return Action._default_domain({ context, action })
  }

  static _view_get({ views, view }, viewType) {
    if (view) return view
    const { fields_views = {} } = views
    const view2 = fields_views[viewType] || {}
    return view2
  }

  static view_node({ action, views, view }, viewType) {
    const view1 = this._view_get({ views, view }, viewType)
    const { arch } = view1
    const node = xml2json.toJSON(arch)

    if (!action.$xml_id) {
      return node
    }

    // console.log('view_node2 local 1', action.$xml_id)
    // const action1 = XML.record_get(action.$xml_id)
    // console.log('view_node2 local 2', action.$xml_id, action1)

    const view2 = XML.search_view({
      act_window_id: action.$xml_id,
      type: view1.type
    })
    console.log('view_node2 local 99', [XML], action.$xml_id, view2)

    if (!view2) return node
    else return view2.arch
  }

  static _fields_all({ views }) {
    const { fields } = views
    return fields
  }

  static Model({ context, action }) {
    const { res_model } = action
    const ctx = this._context({ context, action })
    const env = rpc.env.with_context(ctx)
    return env.model(res_model)
  }

  static Relation(relation, kwargs = {}) {
    const { context = {} } = kwargs
    const env = rpc.env.with_context(context)
    return env.model(relation)
  }

  static async load_action(action_xml_id, { additional_context }) {
    const action = await Action.load(action_xml_id, { additional_context })

    if (!action) {
      return
    }

    const context = additional_context
    return { context, action }

    // const views = await Action.load_views({ context, action })
    // return { ...info, context, action, views }
  }

  static async button_clicked_after({ context, action }) {
    const action2 = await Action._load_after({ context, action })
    return { context, action: action2 }

    // if (action2.type === 'ir.actions.act_window') {
    //   const views = await Action.load_views({
    //     context,
    //     action: action2
    //   })
    //   return { context, action: action2, views }
    // } else {
    //   return { context, action: action2 }
    // }
  }
}

// _view_node_label(node, parent) {
//   const arch = this._view_arch
//   // console.log(node.attrs.for, node, arch)

//   const _get_field_by_for_recursion = (for2, node2) => {
//     if (node2.tagName === 'field') {
//       if (node2.attrs.id === for2 || node2.attrs.name === for2) return node2
//     }

//     for (const nd of node2.children || []) {
//       const to_ret = _get_field_by_for_recursion(for2, nd)
//       if (to_ret) return to_ret
//     }

//     return null
//   }

//   const _get_field_by_for = (for2, node2) => {
//     const nd = _get_field_by_for_recursion(for2, node2)
//     if (!nd) return nd
//     return nd.attrs.name
//   }

//   let string = 'UnKown'
//   if (node.attrs.for) {
//     const field_name = _get_field_by_for(node.attrs.for, arch)
//     // console.log(node.attrs.for, field_name)

//     const meta = this.view_info.fields[field_name] || {}
//     string = node.attrs.string || meta.string || ''
//   } else {
//     //
//   }

//   const fullName = parent ? `${parent}.${node.tagName}` : node.tagName

//   return {
//     fullName,
//     tagName: node.tagName,
//     attrs: {
//       ...get_attrs(node.attrs),
//       string
//     },
//     class: node.attrs.class,
//     children:
//       !node.isParent && node.content
//         ? [node.content]
//         : (node.children || []).map(item =>
//             this._view_node_default_html(item, fullName)
//           )
//   }
// }

// const _feilds_buttons_spec = node_in => {
//   const result = { field: {}, button: {} }

//   const process = node => {
//     if (node.tagName === 'field') {
//       const name2 = node.attrs.name || '_noname'
//       if (!result.field[name2]) result.field[name2] = []
//       result.field[name2].push(node)
//     } else if (node.tagName === 'button') {
//       const btype = node.attrs.type || '_notype'
//       const bname = node.attrs.name || '_noname'
//       const name2 = `${btype}.${bname}`
//       if (!result.button[name2]) result.button[name2] = []
//       result.button[name2].push(node)
//     } else {
//       if (node.children && Array.isArray(node.children)) {
//         node.children.forEach(child => {
//           if (is_node(child)) process(child)
//         })
//       }
//     }
//   }

//   process(node_in)

//   const buttons_node = result.button
//   const fields_node = result.field

//   return { buttons_node, fields_node }
// }

// // ('search', 'Search'),
// // ('tree', 'Tree'),
// // ('form', 'Form'),
// // ('kanban', 'Kanban'),

// // ('graph', 'Graph'),
// // ('pivot', 'Pivot'),
// // ('calendar', 'Calendar'),

// // ('gantt', 'Gantt'),
// // ('qweb', 'QWeb'),

// // ('activity', 'Activity')

// class ModelForOlap {
//   get pivot_data() {
//     return this.views.pivot.pivot_data
//   }

//   async pivot_search_browse(payload) {
//     // console.log(this, this.views.calendar)
//     return this.views.pivot.search_browse(payload)
//   }

//   async pivot_change(payload) {
//     return this.views.pivot.pivot_change(payload)
//   }

//   get graph_data() {
//     return this.views.graph.graph_data
//   }

//   async graph_change(payload) {
//     return this.views.graph.graph_change(payload)
//   }

//   async graph_search_browse(payload) {
//     return this.views.graph.search_browse(payload)
//   }
// }
