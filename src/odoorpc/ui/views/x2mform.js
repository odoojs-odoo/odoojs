import { X2mBase } from './x2mbase'

import { EditX2m } from './editmodel'

import { tuples_to_ids } from '@/odoorpc/tools'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

function _date_format(date) {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const hh = date.getHours().toString().padStart(2, '0')
  const mm = date.getMinutes().toString().padStart(2, '0')
  const ss = date.getSeconds().toString().padStart(2, '0')

  const today_str = `${year}-${month}-${day} ${hh}:${mm}:${ss}`
  return today_str
}

function date_format(date) {
  if (date && typeof date === 'object') {
    return _date_format(date)
  } else {
    return date
  }
}

export class X2mForm extends X2mBase {
  constructor(field_info, payload) {
    super(field_info, { ...payload, type: 'form' })
    this.edit_model = undefined
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

  async onchange_new(parentFormInfo) {
    // console.log('onchange_new', parentFormInfo)
    return this.edit_model.onchange_new(parentFormInfo)
  }

  set_editable(record, values) {
    this.edit_model = new EditX2m(this)
    return this.edit_model.set_editable(record, values)
  }

  async onchange(fname, value, parentFormInfo) {
    return this.edit_model.onchange(fname, value, parentFormInfo)
  }

  async commit(kwargs = {}) {
    return this.edit_model.commit(kwargs)
  }

  _check_modifiers(modifiers_type, fieldInfo, kw) {
    const { record, values, parentFormInfo, editable } = kw

    if (!fieldInfo[modifiers_type]) return undefined
    if (typeof fieldInfo[modifiers_type] !== 'function') {
      return fieldInfo[modifiers_type]
    }
    const context = this.context_get(parentFormInfo)
    const record2 = this.merge_to_modifiers(record, values, parentFormInfo)
    return fieldInfo[modifiers_type]({ record: record2, context, editable })
  }

  check_invisible(fieldInfo, kw) {
    return this._check_modifiers('invisible', fieldInfo, kw)
  }

  check_required(fieldInfo, kw) {
    return this._check_modifiers('required', fieldInfo, kw)
  }

  get_string(fieldInfo, kw) {
    return this._check_modifiers('string', fieldInfo, kw)
  }

  //
  // for record and values
  //
  //
  //
  merge_data(record, values) {
    const all_keys = Object.keys({ ...record, ...values })

    const medata = all_keys.reduce((acc, fld) => {
      const meta = this.fields[fld] || {}
      if (meta.type === 'many2many') {
        const val =
          fld in values ? values[fld] : [[6, false, record[fld] || []]]
        acc[fld] = val
      } else if (meta.type === 'one2many') {
        const val =
          fld in values
            ? values[fld]
            : (record[fld] || []).map(item => [4, item, { id: item }])

        acc[fld] = val
      } else {
        const val = fld in values ? values[fld] : record[fld]
        if (meta.type === 'datetime') {
          const val2 = val ? date_format(val) : val
          acc[fld] = val2
        } else {
          acc[fld] = val
        }
      }

      return acc
    }, {})

    return medata
  }

  merge_to_modifiers(record, values, parentInfo) {
    const record2 = this.merge_data(record, values)
    const record3 = this.format_to_modifiers(record2)

    if (!parentInfo.viewInfo) {
      return record3
    }

    const prt = this.parent_get(parentInfo)
    const { record: prec, values: pval } = parentInfo
    const pdata = prt.merge_to_modifiers(prec, pval)

    const record4 = { ...record3, parent: pdata }
    return record4
  }

  merge_to_onchange(record, values) {
    const record2 = this.merge_data(record, values)
    const record3 = this.format_to_onchange(record2)
    return record3
  }

  // 被主表调用时的 参数格式?
  merge_to_write(record, values, parentInfo) {
    const record3 = this.merge_to_modifiers(record, values, parentInfo)
    return this.format_to_write(values, record3)
  }

  _format_to_write_get_readonly(meta, record) {
    const meta_readonly_get = record2 => {
      if (typeof meta.readonly === 'function') {
        return meta.readonly({ record: record2 })
      } else {
        return meta.readonly
      }
    }

    const state = record.state

    if (meta.states === undefined) {
      return meta_readonly_get(record)
    }

    if (state && meta.states && meta.states[state]) {
      const readonly3 = meta.states[state].reduce((acc, cur) => {
        acc[cur[0]] = cur[1]
        return acc
      }, {})

      if (readonly3.readonly !== undefined) {
        return readonly3.readonly
      }
    }

    return meta_readonly_get(record)
  }

  format_to_write(values, record) {
    // console.log('x2mform, format_to_write', values, record)
    const values2 = Object.keys({ ...values }).reduce((acc, fld) => {
      const meta = this.fields[fld] || {}

      if (this._format_to_write_get_readonly(meta, record)) {
        return acc
      }

      const val = values[fld]
      if (meta.type === 'one2many') {
        if (!val.length) {
          acc[fld] = val
        } else {
          acc[fld] = val
          // todo 递归处理
          // const rel = this.relations[fld]
          // if (rel) {
          //   console.log('format_to_write in o2m', fld, val)
          //   const val2 = rel.tree.format_to_write(val, { record, values })
          //   console.log('format_to_write in o2m ok ', fld, val2)
          //   // 1. merge, 2 转 格式
          //   // [4,id,{}]  =>  [4,id]
          //   // [1,id,{}]  =>  [1,id,{}] 递归处理
          //   // [0,id,{}]  =>  [0,id,{}] 递归处理
          //   //

          //   acc[fld] = val2
          // } else {
          //   acc[fld] = val
          // }
        }
      } else if (meta.type === 'many2one') {
        acc[fld] = val ? val[0] : val
      } else {
        acc[fld] = val
      }

      return acc
    }, {})

    return values2
  }

  format_to_onchange(record) {
    return Object.keys(record).reduce((acc, fld) => {
      const meta = this.fields[fld] || {}
      const val = record[fld]

      if (meta.type === 'one2many') {
        if (!val.length) {
          acc[fld] = val
        } else {
          acc[fld] = val

          // todo 递归处理
          // const rel = this.relations[fld]
          // if (rel) {
          //   // console.log('format_to_onchange', fld, val, rel)
          //   const val2 = rel.tree.format_to_onchange(val)
          //   // console.log('format_to_onchange', fld, val2)
          //   // todo.
          //   // 1. merge, 2 转 格式
          //   // [4,id,{}]  =>  [4,id]
          //   // [1,id,{}]  =>  [1,id,{}] 递归处理
          //   // [0,id,{}]  =>  [0,id,{}] 递归处理
          //   //

          //   acc[fld] = val2
          // } else {
          //   acc[fld] = val
          // }
        }
      } else if (meta.type === 'many2one') {
        acc[fld] = val ? val[0] : val
      } else {
        acc[fld] = val
      }

      return acc
    }, {})
  }

  format_to_modifiers(record) {
    return Object.keys(record).reduce((acc, fld) => {
      const meta = this.fields[fld] || {}

      const val = record[fld]
      if (meta.type === 'many2many' || meta.type === 'one2many') {
        acc[fld] = tuples_to_ids(val)
      } else if (meta.type === 'many2one') {
        acc[fld] = val ? val[0] : val
      } else {
        acc[fld] = val
      }
      return acc
    }, {})
  }
}
