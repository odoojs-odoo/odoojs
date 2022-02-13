import xml2json from '../xml2json'
import QWeb from '../qweb2'
import moment from 'moment'

import { Kanban_Image } from './tools'

import { Tree } from './list_view'
const insertStr = (soure, start, newStr) => {
  return soure.slice(0, start) + newStr + soure.slice(start)
}
const Render_XML = ({ xml, tname, fields, record }) => {
  // console.log('Render_XML ', xml, tname, fields, record)
  const get_val = fld => {
    const meta = fields[fld] || {}
    const val = record[fld]

    if (meta.type === 'many2one') {
      const val2 = val || [false, '']
      return { raw_value: val2[0], value: val2[1] }
    } else if (meta.type === 'selection') {
      const get_selection_str = () => {
        if (!val) return ''
        const op = meta.selection.find(item => item[0] === val)
        if (!op) return ''
        return op[1]
      }
      const val2 = get_selection_str()

      return { raw_value: val, value: val2 }
    } else if (meta.type === 'datetime') {
      //
      return {
        raw_value: record[fld] ? new Date(record[fld]) : new Date(),
        value: record[fld]
      }
    } else return { raw_value: record[fld], value: record[fld] }
  }

  const qweb_record = Object.keys(fields).reduce((acc, fld) => {
    const value = get_val(fld)

    acc[fld] = value
    return acc
  }, {})

  // console.log(fields, qweb_record)

  const KANBAN_RECORD_COLORS = [
    'No color',
    'Red',
    'Orange',
    'Yellow',
    'Light blue',
    'Dark purple',
    'Salmon pink',
    'Medium blue',
    'Dark blue',
    'Fushia',
    'Green',
    'Purple'
  ]

  const NB_KANBAN_RECORD_COLORS = KANBAN_RECORD_COLORS.length

  const kanban_color = variable => {
    var color = kanban_getcolor(variable)
    return 'o_kanban_record oe_kanban_color_' + color
  }

  const kanban_getcolor = variable => {
    if (typeof variable === 'number') {
      return Math.round(variable) % NB_KANBAN_RECORD_COLORS
    }
    if (typeof variable === 'string') {
      var index = 0
      for (var i = 0; i < variable.length; i++) {
        index += variable.charCodeAt(i)
      }
      return index % NB_KANBAN_RECORD_COLORS
    }
    return 0
  }

  // TODO
  const _ = {
    contains(list, item) {
      // _.contains(['cash','bank'],journal_type) ? 'line' : 'bar'
      return list.includes(item)
    }
  }

  // TODO
  const widget = {
    // o_kanban_project_tasks 里出现了
    editable: true,
    deletable: true
  }

  const kanban_image = (model, field, res_id) => {
    // console.log(' kanban_image,', model, field, res_id)
    if (typeof res_id === 'string') {
      const base64 = record[field]
      return `data:image/png;base64,${base64}`
    } else {
      return Kanban_Image(model, field, res_id)
    }
  }

  const qweb_kwargs = {
    moment,
    record: qweb_record,
    kanban_image,
    kanban_color,
    kanban_getcolor,
    JSON,
    _,
    _s: '',
    widget
  }

  const qweb = new QWeb.Engine()
  qweb.add_template(xml)

  const xml2 = qweb.render(tname, qweb_kwargs)
  const xml_node = xml2json.toJSON(xml2)

  return xml_node
}

const Render_kanban = ({ arch, fields, record }) => {
  const node = xml2json.toJSON(arch)
  // console.log(node, fields)
  // console.log(node)
  const templates =
    node.children.find(item => item.tagName === 'templates') || {}

  const xml = templates.xml

  const tname = 'kanban-box'
  const xml_node = Render_XML({ xml, tname, fields, record })
  // console.log('kn node,', cp(xml_node))

  return xml_node
}

export class Kanban extends Tree {
  constructor() {
    super()
  }

  static _fields_list({ views }) {
    const view = views.fields_views.kanban
    const { fields } = view
    return Object.keys(fields)
  }

  static view_node({ action, views }) {
    return super.view_node({ action, views }, 'kanban')
  }

  static async load_data(info, kwargs) {
    const view = info.views.fields_views.kanban
    return super.load_data({ ...info, view }, kwargs)
  }

  static async web_read_group(info, { search, groupby }) {
    const groupby2 = groupby.slice(0, 1)
    const res = await super.web_read_group(info, {
      pagination: { current: 1, pageSize: 0 },
      search,
      groupby: groupby2
    })

    const { records } = res
    for (const record of records) {
      const child = await this.web_read_group2(info, {
        groupby: groupby2,
        record
      })
      record.children = child.records
    }

    return { ...res, records }
  }

  static render_kanban(info, record) {
    const { view } = info
    const { arch, fields } = view

    const xml_node = Render_kanban({ arch, fields, record })
    // if(xml_node.attrs.class.split(' ').includes('oe_kanban_card') || xml_node.attrs.class.split(' ').includes('oe_kanban_global_click')){
    //   xml_node.attrs.class = insertStr(xml_node.attrs.class, 0, ' o_kanban_record ')
    // }
    return xml_node
  }
}
