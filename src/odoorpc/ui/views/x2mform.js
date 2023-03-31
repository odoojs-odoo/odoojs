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

  view_sheet() {
    const sheet_get = () => {
      const view = this.field_info.views.form

      const { arch = {} } = view

      if (arch.sheet) {
        return arch.sheet
      }

      const fields = this.fields

      const fs = Object.keys(fields)
        .filter(item => !fields[item].invisible && !fields[item].is_title)
        .reduce((acc, fld) => {
          const tname = `_group_${fld}`
          const meta = {
            [fld]: fields[fld]
          }
          if (fields[fld].span) {
            meta._span = fields[fld].span
          }

          acc[tname] = meta

          return acc
        }, {})

      return fs
    }

    const sheet = sheet_get()

    // console.log(sheet, this.fields)

    const meta_get = (fld, meta = {}) => {
      return { ...this.fields[fld], ...meta, name: fld }
    }

    function item_get(node) {
      return Object.keys(node).reduce((acc, item) => {
        if (item[0] === '_') {
          const attr = item.substring(1)
          acc[attr] = node[item]
        } else {
          if (!acc.children) {
            acc.children = {}
          }
          acc.children[item] = meta_get(item, node[item])
        }

        return acc
      }, {})
    }

    const sheet_items = Object.keys(sheet).reduce(
      (acc, item) => {
        const node = item_get(sheet[item])

        if (node.span) {
          if (acc.y) {
            const tname = `group_${acc.x}_1`
            acc.data[tname] = {
              name: tname,
              x: acc.x,
              y: acc.y,
              children: {}
            }
            acc.y = 0
            acc.x = acc.x + 1
          }
        }

        acc.data[item] = { name: item, x: acc.x, y: acc.y, ...node }

        if (node.span) {
          acc.y = 1
        }

        acc.y = 1 - acc.y
        if (!acc.y) {
          acc.x = acc.x + 1
        }

        return acc
      },
      { data: {}, x: 0, y: 0 }
    )

    const total_len = Object.keys(sheet_items.data).length

    if (total_len) {
      const last_fld = Object.keys(sheet_items.data)[total_len - 1]
      const last = sheet_items.data[last_fld]
      if (!last.y && !last.span) {
        const tname = `group_${last.x}_1`
        sheet_items.data[tname] = {
          name: tname,
          x: last.x,
          y: 1,
          children: {}
        }
      }
    }

    return { children: sheet_items.data }
  }

  //
  // check modifiers
  //

  viewhelp_get() {
    return new ViewHelp(this)
  }

  check_invisible(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.check_invisible(fieldInfo, { ...kw, for_o2m: true })
  }

  check_required(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.check_required(fieldInfo, { ...kw, for_o2m: true })
  }

  get_string(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.get_string(fieldInfo, { ...kw, for_o2m: true })
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

  format_to_onchange(record) {
    // call by treeview.format_to_onchange
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
