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

  get arch_sheet() {
    return this._formview.arch_sheet
  }

  view_sheet(formInfo) {
    // console.log('view_sheet', formInfo)
    // tree view 也需要 类似的处理, 因为 tree col 除了字段外, 还有 button 等

    // sheet 规范
    // 1. 字母开头的都是 字段
    // 2. 字段内的属性 常规定义.
    // 3. _label_xxx 标签 专用于 单行显示 标签
    // 3. 其内部结构 为 _label_xxx: {_attr: {for: xx, string: xx}}
    // 4. _group_xxx 标签 专用于 控制布局
    // 2. _group 可以嵌套两层用于 布局控制
    // 3. 外层 _group 占格 col=24
    // 4. 内层 _group 占格 col=12
    // 5. _group 内的元素 竖排显示
    // 8. 其他 如 _div_xxx 等, 是 通用的 html 标签
    // 9. 已经实现: div, h1, p, ...
    // 10. 标签的属性 一律定义在 _attr 之内
    // 11. 标签的属性 包括: string, invisible, text 等
    //

    const format_string = fieldInfo => {
      if (!fieldInfo.string) return undefined
      if (typeof fieldInfo.string !== 'function') return fieldInfo.string
      return this.get_string(fieldInfo, formInfo)
    }

    const required_get = fieldInfo => {
      if (!formInfo.editable) return undefined
      if (!fieldInfo.required) return undefined
      if (typeof fieldInfo.required !== 'function') return fieldInfo.required
      return this.check_required(fieldInfo, formInfo)
    }

    const meta_get = (fld, meta = {}) => {
      const fieldInfo = { ...this.fields[fld], ...meta, name: fld }
      const string = format_string(fieldInfo)
      const required = required_get(fieldInfo)
      return { ...fieldInfo, string, required }
    }

    const for_label_tag = node => {
      const attr = node._attr || {}
      const meta = meta_get(attr.for)

      if (attr.string) {
        return {
          for: attr.for,
          fieldInfo: meta,
          string: this.get_string({ ...attr }, formInfo)
        }
      }

      return { for: attr.for, fieldInfo: meta, string: meta.string }
    }

    function is_attr(str) {
      return str === '_attr'
    }

    function tag_get(str) {
      if (!str[0] === '_') return false
      const tag = str.split('_')[1]
      if (tag === 'attr') return false
      return tag
    }

    function is_field(str) {
      return str[0] !== '_'
    }

    const node_get = (node, for_title) => {
      const res = Object.keys(node).reduce((acc, cur) => {
        if (is_attr(cur)) {
          acc = { ...acc, ...node[cur] }
        } else {
          if (!acc.children) acc.children = {}

          if (is_field(cur)) {
            // const invisible = node[cur].invisible
            const invisible2 = this.check_invisible(node[cur], formInfo)
            if (!invisible2) {
              const { editable } = formInfo
              const meta2 = {
                ...(for_title && !editable ? { nolabel: 1 } : {}),
                ...node[cur]
              }
              const meta = meta_get(cur, meta2)

              acc.children[cur] = { ...meta }
            }
          } else {
            const tag = tag_get(cur)
            if (tag) {
              if (typeof node[cur] !== 'object') {
                acc.children[cur] = { tag, name: cur, text: node[cur] }
              } else {
                // const invisible = (node[cur]._attr || {}).invisible
                const invisible2 = this.check_invisible(
                  node[cur]._attr || {},
                  formInfo
                )
                if (!invisible2) {
                  if (tag === 'label') {
                    const label = for_label_tag(node[cur])
                    acc.children[cur] = {
                      tag,
                      name: cur,
                      ...label
                    }
                  } else {
                    const for_title2 = cur === '_div_title'
                    const next = node_get(node[cur], for_title || for_title2)
                    acc.children[cur] = { tag, name: cur, ...next }
                  }

                  if (tag === 'field') {
                    const find_label_from_field2 = fnode => {
                      const labels = Object.keys(fnode.children).filter(
                        item => fnode.children[item].tag === 'label'
                      )
                      if (labels.length) {
                        return fnode.children[labels[0]]
                      } else {
                        return { for: '', string: '', fieldInfo: {} }
                      }
                    }

                    const find_item_from_field2 = fnode => {
                      const labels = Object.keys(fnode.children).filter(
                        item => fnode.children[item].tag !== 'label'
                      )

                      return labels.reduce((accok, item) => {
                        accok[item] = fnode.children[item]
                        return accok
                      }, {})

                      // if (labels.length) {

                      //   return
                      //   // const nextnode = fnode.children[labels[0]]
                      //   // return nextnode.children
                      //   // if (nextnode.tag) {
                      //   //   return nextnode.children
                      //   // } else {
                      //   //   return { [labels[0]]: nextnode }
                      //   // }
                      // } else {
                      //   return {}
                      // }
                    }

                    const fnode = acc.children[cur]
                    console.log({ ...fnode })
                    const lnode = find_label_from_field2(fnode)
                    const fitem = find_item_from_field2(fnode)

                    acc.children[cur] = {
                      ...fnode,
                      label: lnode,
                      children: fitem
                    }
                  }
                }
              }
            }
          }
        }

        return acc
      }, {})

      return res
    }

    const children_get = sheet => {
      // const children0 = Object.keys(sheet).reduce((acc, item) => {
      //   acc[item] = sheet[item]
      //   return acc
      // }, {})

      const children = node_get(sheet)

      return children.children
    }

    const sheet = this.arch_sheet
    // console.log(sheet)
    // const title = title_get(sheet)
    const children = children_get(sheet)

    // console.log('sheet', sheet)
    // console.log('children', children)

    return { children }
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
    // return 0
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
    // // readonly2 用于前端自定义 readonly
    // // 需要检查 merge_for_write
    // if ('readonly2' in fieldInfo) {
    //   return this._check_modifiers('readonly2', fieldInfo, kw)
    // }

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
    if (typeof domain === 'string') {
      alert(`todo, domain is string, ${fieldInfo.name}, ${domain}`)
      console.log(fieldInfo.name, domain)
      return []
    } else {
      return domain || []
    }
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

    // return true

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
    // todo . fields_get .readonly and viewxml readonly
    //

    if (meta.force_save) {
      return false
    }

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
          // console.log('o2m', fld, val)
          const rel = this.env.relation(meta)
          if (!rel) {
            acc[fld] = val
          } else {
            // 转 格式
            // [5,0,0] => []
            // [4,id,{}]  =>  [4,id]
            // [1,id,{}]  =>  [1,id,{}] 递归处理
            // [0,id,{}]  =>  [0,id,{}] 递归处理
            const val2 = rel.tree.format_to_write(val, {
              record,
              values,
              viewInfo: this.view_info,
              fields: this.fields
            })

            acc[fld] = val2
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
