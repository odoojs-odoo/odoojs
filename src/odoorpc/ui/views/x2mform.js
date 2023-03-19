import { X2mBase } from './x2mbase'

import { EditX2m } from './editmodel'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export class X2mForm extends X2mBase {
  constructor(field_info, payload) {
    super(field_info, { ...payload, type: 'form' })
    this.parentData = { record: {}, values: {} }
    this.edit_model = undefined
  }

  _edit_model_get(record = {}, values = {}, parentData = {}) {
    return new EditX2m({ viewmodel: this, record, values, parentData })
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

  context_get(parentData) {
    const context_fn = this.field_info.context

    const prt = this.parent
    const context = prt.context

    if (typeof context_fn !== 'function') {
      return { ...context, ...(context_fn || {}) }
    }

    const { record, values } = parentData
    const recprd_merged = prt.merge_to_one(record, values)
    const parent_record = prt.format_for_modifiers(recprd_merged)

    const env = this.env
    const ctx = context_fn({ env, record: { ...parent_record, context } })

    return { ...context, ...ctx }
  }

  async onchange_new(parentData) {
    this.edit_model = this._edit_model_get()
    return this.edit_model.onchange_new(parentData)
  }

  set_editable(record, parentData) {
    this.edit_model = this._edit_model_get()
    return this.edit_model.set_editable(record, parentData)
  }

  async onchange(fname, value, kwargs) {
    return this.edit_model.onchange(fname, value, kwargs)
  }

  async commit_for_o2m(kwargs = {}) {
    return this.edit_model.commit_for_o2m(kwargs)
  }

  //
  // for record and values
  //

  merge_to_one(record, values, parentData) {
    // call by require, readonly, domain of feild
    const par = this.parent
    const { record: prec, values: pval } = parentData
    const pdata = par.merge_to_one(prec, pval)
    const medata = this.Model.merge_to_one(record, values)
    const medata2 = { ...medata, parent: pdata }
    return medata2
  }

  format_for_modifiers(record_merged) {
    // call by require, readonly, domain of feild
    return this.Model.get_values_for_modifiers(record_merged)
  }

  // // todo. del
  // // 使用 commit_for_o2m
  async commit(kwargs = {}) {
    return this.edit_model.commit(kwargs)
  }
}
