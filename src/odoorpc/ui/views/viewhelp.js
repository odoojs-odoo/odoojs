import { tuples_to_ids } from '@/odoorpc/tools'

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

export class ViewHelp {
  constructor(formview) {
    this._formview = formview
  }

  get formview() {
    return this._formview
  }

  get env() {
    return this._formview.env
  }

  get fields() {
    return this._formview.fields
  }

  get view_info() {
    return this._formview.view_info
  }

  check_invisible_for_tree(fieldInfo, kw = {}) {
    if (typeof fieldInfo === 'string') return false
    if (!this._check_groups(fieldInfo)) return true
    if (fieldInfo.optional === 'hide') return true
    const { records = [], ...kw2 } = kw
    if (!records.length) {
      return this._check_modifiers('invisible', fieldInfo, {
        ...kw2,
        record: {},
        values: {}
      })
    }

    return records.reduce((acc, record) => {
      const one = this._check_modifiers('invisible', fieldInfo, {
        ...kw2,
        record,
        values: {}
      })
      acc = acc && one
      return acc
    }, true)
  }

  check_invisible(fieldInfo, kw) {
    if (typeof fieldInfo === 'string') {
      return false
    }
    if (!this._check_groups(fieldInfo)) return true
    return this._check_modifiers('invisible', fieldInfo, kw)
  }

  check_required(fieldInfo, kw) {
    return this._check_modifiers('required', fieldInfo, kw)
  }

  check_readonly(fieldInfo, kw) {
    if ('readonly2' in fieldInfo) {
      return this._check_modifiers('readonly2', fieldInfo, kw)
    }

    if (!('states' in fieldInfo)) {
      return this._check_modifiers('readonly', fieldInfo, kw)
    }

    if (fieldInfo.readonly === 'function ') {
      return this._check_modifiers('readonly', fieldInfo, kw)
    }

    const state_get = () => {
      const { record = {}, values = {} } = kw || {}
      const record2 = { ...record, ...values }
      return record2.state
    }

    const state = state_get()
    const state_in_meta = fieldInfo.states[state]

    if (state && state_in_meta) {
      const states_dict = state_in_meta.reduce((acc, cur) => {
        acc[cur[0]] = cur[1]
        return acc
      }, {})

      if ('readonly' in states_dict) {
        return states_dict.readonly
      } else {
        return fieldInfo.readonly
      }
    } else {
      return fieldInfo.readonly
    }
  }

  get_string(fieldInfo, kw) {
    return this._check_modifiers('string', fieldInfo, kw)
  }

  get_domain(fieldInfo, kw) {
    // const viewhelp = this.viewhelp_get()
    // return viewhelp.get_domain(fieldInfo, kw)

    const domain = this._check_modifiers('domain', fieldInfo, kw)

    return domain || []
  }

  // _check_states(fieldInfo) {
  //   if (!fieldInfo.states) return true
  //   // return this.env.has_group(fieldInfo.groups)

  //   return true
  // }

  _check_groups(fieldInfo) {
    // sale.order.order_date 的 groups 依赖于 state
    // 因此, 在 sale.order.order_date 中 使用 invisible 实现
    // 以确保 groups 仅仅是 字符串
    if (!fieldInfo.groups) return true
    return this.env.has_group(fieldInfo.groups)
  }

  _check_modifiers(modifiers_type, fieldInfo, kw = {}) {
    const { record, values, editable, ...kw2 } = kw
    const { parentFormInfo } = kw

    if (!fieldInfo[modifiers_type]) return undefined
    if (typeof fieldInfo[modifiers_type] !== 'function') {
      return fieldInfo[modifiers_type]
    }

    // todo. context 放在参数中 或者 自行解决?
    const context = this.formview.context_get(parentFormInfo)
    const record2 = this.merge_to_modifiers(record, values, kw2)
    const kwargs = { record: record2, context, editable, env: this.env }
    return fieldInfo[modifiers_type]({ ...kwargs })
  }

  //
  // merge
  //
  _merge_data(record = {}, values = {}) {
    const all_keys = Object.keys({ ...record, ...values })

    return all_keys.reduce((acc, fld) => {
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
  }

  _merge_to_modifiers(record, values) {
    const record2 = this._merge_data(record, values)

    const val_get = meta => {
      return ['many2many', 'one2many'].includes(meta.type) ? [] : null
    }

    const records_default = Object.keys(this.fields).reduce((acc, fld) => {
      acc[fld] = val_get(this.fields[fld])
      return acc
    }, {})

    return { ...records_default, ...record2 }
  }

  merge_to_modifiers(record, values, kw = {}) {
    const { parentFormInfo, for_o2m } = kw
    const record2 = this._merge_to_modifiers(record, values)
    const record3 = this._format_to_modifiers(record2, for_o2m)
    if (!parentFormInfo) {
      return record3
    }
    if (!for_o2m) {
      return record3
    }
    if (!parentFormInfo.viewInfo) {
      return record3
    }

    // o2mform 调用. 需要拼接 父 formview 的情况
    const prt = this.formview.parent_get(parentFormInfo)
    const { record: prec, values: pval } = parentFormInfo
    // 这里 可以调用 自己的函数
    // help = new ViewHelp(prt)
    // const pdata2 = help._merge_to_modifiers(prec, pval)
    // const pdata = help._format_to_modifiers(pdata2)

    const pdata = prt.merge_to_modifiers(prec, pval)

    const record4 = { ...record3, parent: pdata }
    return record4
  }

  merge_to_onchange(record, values, kw = {}) {
    const { for_o2m } = kw
    const record2 = this._merge_data(record, values)
    return this._format_to_onchange(record2, for_o2m)
  }

  merge_to_write(record, values, kw = {}) {
    const { for_o2m } = kw
    const record3 = this.merge_to_modifiers(record, values, kw)
    const values1 = this._merge_data({}, values)
    return this._format_to_write(values1, record3, for_o2m)
  }

  _format_to_modifiers(record, for_o2m) {
    return Object.keys(record).reduce((acc, fld) => {
      const meta = this.fields[fld] || {}
      const val = record[fld]
      if (meta.type === 'many2many') {
        acc[fld] = tuples_to_ids(val)
      } else if (meta.type === 'one2many') {
        if (for_o2m) {
          // o2m 不需要嵌套处理
          acc[fld] = tuples_to_ids(val)
        } else if (!val.length) {
          acc[fld] = val
        } else {
          const rel = this.env.relation(meta)
          if (!rel) {
            acc[fld] = val
          } else {
            acc[fld] = rel.tree.format_to_onchange(val)
          }
        }
      } else if (meta.type === 'many2one') {
        acc[fld] = val ? val[0] : val
      } else {
        acc[fld] = val
      }
      return acc
    }, {})
  }

  _format_to_onchange(record, for_o2m) {
    return Object.keys(record).reduce((acc, fld) => {
      const meta = this.fields[fld] || {}
      const val = record[fld]
      if (meta.type === 'one2many') {
        if (for_o2m) {
          // todo o2m 递归处理
          acc[fld] = val
        } else if (!val.length) {
          acc[fld] = val
        } else {
          const rel = this.env.relation(meta)
          if (!rel) {
            acc[fld] = val
          } else {
            // 转 格式
            // [4,id,{}]  =>  [4,id]
            // [1,id,{}]  =>  [1,id,{}] 递归处理
            // [0,id,{}]  =>  [0,id,{}] 递归处理
            acc[fld] = rel.tree.format_to_onchange(val)
          }
        }
      } else if (meta.type === 'many2one') {
        acc[fld] = val ? val[0] : val
      } else {
        acc[fld] = val
      }

      return acc
    }, {})
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

  _format_to_write(values, record, for_o2m) {
    const values2 = Object.keys({ ...values }).reduce((acc, fld) => {
      const meta = this.fields[fld] || {}
      if (this._format_to_write_get_readonly(meta, record)) {
        return acc
      }

      const val = values[fld]
      if (meta.type === 'one2many') {
        if (for_o2m) {
          // todo o2m 递归处理
          acc[fld] = val
        } else if (!val.length) {
          acc[fld] = val
        } else {
          const rel = this.env.relation(meta)
          if (!rel) {
            acc[fld] = val
          } else {
            // 转 格式
            // [4,id,{}]  =>  [4,id]
            // [1,id,{}]  =>  [1,id,{}] 递归处理
            // [0,id,{}]  =>  [0,id,{}] 递归处理

            acc[fld] = rel.tree.format_to_write(val, {
              record,
              values,
              viewInfo: this.view_info,
              fields: this.fields
            })
          }
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
}
