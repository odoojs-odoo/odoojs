export function tuples_to_ids(tuples) {
  // m2m
  // [6,],[5,],[4,id],[3,id]
  //

  // console.log('tuples_to_ids 1', tuples)

  const ids = tuples.reduce((acc, tup) => {
    const op = tup[0]
    if (op === 6) return [...tup[2]]
    if (op === 5) return []

    if ([4, 1].includes(op)) {
      const rid = tup[1]
      if (acc.includes(rid)) return [...acc]
      else return [...acc, rid]
    }

    if ([3, 2].includes(op)) return acc.filter(item => item !== tup[1])

    // 不应该走到这里
    return acc
  }, [])

  // console.log('tuples_to_ids 2', ids)
  return ids
}

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

  get view() {
    return this._formview
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
    return this.view.arch_sheet
  }

  //
  //

  get_fields_from_sheet(sheet) {
    // call by baseview
    // call by relation

    function get_node_name(str) {
      if (!str[0] === '_') return false
      const tag = str.split('_')[1]
      return tag
    }

    function is_tag(str) {
      const tag = get_node_name(str)
      if (tag === 'attr') return false
      if (tag === 'label') return false
      if (tag === 'col') return false
      return tag
    }

    function is_field(str) {
      return str[0] !== '_'
    }

    function is_col(str) {
      const tag = get_node_name(str)
      return tag === 'col'
    }

    function find_field(node) {
      if (typeof node !== 'object') {
        return {}
      }
      return Object.keys(node).reduce((acc, cur) => {
        if (is_field(cur)) {
          const meta = { ...node[cur] }
          // delete meta.invisible
          acc[cur] = meta
        } else if (is_col(cur)) {
          const meta = { ...node[cur] }
          delete meta.name
          // delete meta.invisible
          acc[node[cur].name] = meta
        } else if (is_tag(cur)) {
          const children = find_field(node[cur])
          acc = { ...acc, ...children }
        }

        return acc
      }, {})
    }

    return find_field(sheet)
  }

  view_sheet(formInfo) {
    // console.log('view_sheet', formInfo)

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

    // const for_label_tag = node => {
    //   const fname = node.for
    //   const meta = meta_get(fname)
    //   const str = this.get_string({ ...node }, formInfo) || meta.string
    //   return { ...node, string: str, fieldInfo: meta }
    // }

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

    function is_attr(str) {
      return str === '_attr'
    }

    function get_node_name(str) {
      if (!str[0] === '_') return false
      const tag = str.split('_')[1]
      return tag
    }

    function tag_get(str) {
      const tag = get_node_name(str)
      if (tag === 'attr') return false
      return tag
    }

    function is_field(str) {
      return str[0] !== '_'
    }

    function txf_field_node(oldnode) {
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

      const find_item_from_field2 = (fnode, fname) => {
        const labels = Object.keys(fnode.children).filter(
          item => fnode.children[item].tag !== 'label'
        )

        const items = labels.reduce((accok, item) => {
          accok[item] = fnode.children[item]
          return accok
        }, {})

        // 多个字段时. 只允许一个字段 是 ant-form-item
        // 其他字段只能放在 a-form-item-rest 里
        // 或者 改变 label 标签的使用方式.
        // 编辑时. 不考虑 label标签
        function set_label_for(fn) {
          return Object.keys(fn).reduce((acc, key) => {
            const meta = fn[key]
            if (meta.children) {
              acc[key] = {
                ...meta,
                children: set_label_for(meta.children)
              }
            } else {
              if (meta.name !== fname) {
                acc[key] = { ...meta, form_item_rest: 1 }
              } else {
                acc[key] = { ...meta }
              }
            }

            return acc
          }, {})
        }

        const items2 = set_label_for(items)
        return items2
      }

      const lnode = find_label_from_field2(oldnode)
      const fname = lnode.for

      const fitem = find_item_from_field2(oldnode, fname)

      return { ...oldnode, label: lnode, children: fitem }
    }

    function txf_button_box_child(oldnode) {
      console.log('txf_button_box_child', oldnode)

      const children = oldnode.children

      function stat_value_get(nodes) {
        const list = Object.keys(nodes || {}).filter(item => !nodes[item].tag)
        if (!list.length) {
          return {}
        }

        const text = list.length ? nodes[list[0]].string : undefined

        const child = list.reduce((acc, key) => {
          acc[key] = nodes[key]
          return acc
        }, {})

        return { text, stat_value: { children: child } }
      }

      function stat_text_get(nodes, text) {
        const list = Object.keys(nodes || {}).filter(item => nodes[item].tag)
        if (!list.length) {
          return { children: { _span: { tag: 'span', text } } }
        }

        const child = list.reduce((acc, key) => {
          acc[key] = nodes[key]
          return acc
        }, {})

        return { children: child }
      }

      const { text, stat_value } = stat_value_get(children)
      const stat_text = stat_text_get(children, text)

      // console.log('txf_button_box_child 2', stat_text, stat_value)

      const node = { ...oldnode }
      delete node.children
      if (stat_text) {
        node.stat_text = stat_text
      }
      if (stat_value) {
        node.stat_value = stat_value
      }

      return { ...node }
    }

    function txf_button_box_node(oldnode) {
      if (!oldnode.children) {
        return { ...oldnode }
      }

      const children = Object.keys(oldnode.children).reduce((acc, btn) => {
        acc[btn] = txf_button_box_child(oldnode.children[btn])
        return acc
      }, {})

      return { ...oldnode, children }
    }

    const invisible_get = (nodeinfo, for_tag, nodename, tag) => {
      function info_get() {
        if (!for_tag) {
          return nodeinfo
        } else if (tag === 'col') {
          return nodeinfo
        } else if (tag === 'label') {
          return nodeinfo
        } else {
          return nodeinfo._attr || {}
        }
      }

      const info = info_get()

      // console.log([nodename, tag], info, nodeinfo)

      return this.check_invisible(info, formInfo)
    }

    const node_get = (node, for_title) => {
      const get_field_node = nodename => {
        const { editable } = formInfo
        const meta2 = {
          ...(for_title && !editable ? { nolabel: 1 } : {}),
          ...node[nodename]
        }
        const meta = meta_get(nodename, meta2)
        return { ...meta }
      }

      const get_noobject_node = (nodename, tag) => {
        return { tag, nodename, text: node[nodename] }
      }

      const get_label_node = (nodename, tag) => {
        const nd = node[nodename]
        const fname = nd.for
        const meta = meta_get(fname)
        const str = this.get_string({ ...nd }, formInfo) || meta.string
        return { tag, nodename, ...nd, string: str, fieldInfo: { ...meta } }
      }

      const get_tag_node = (nodename, tag) => {
        const for_title2 = nodename === '_div_title'
        const nd = node[nodename]
        const next = node_get(nd, for_title || for_title2)
        return { tag, nodename, ...next }
      }

      const res = Object.keys(node).reduce((acc, cur) => {
        if (is_attr(cur)) {
          acc = { ...acc, ...node[cur] }
        } else {
          if (!acc.children) acc.children = {}

          if (is_field(cur)) {
            const meta = meta_get(cur, node[cur])
            const invisible2 = invisible_get(meta)
            if (!invisible2) {
              acc.children[cur] = get_field_node(cur)
            }
          } else {
            const tag = tag_get(cur)
            if (tag) {
              if (typeof node[cur] !== 'object') {
                acc.children[cur] = get_noobject_node(cur, tag)
              } else {
                const invisible2 = invisible_get(node[cur], true, cur, tag)
                if (!invisible2) {
                  if (tag === 'field') {
                    const next = get_tag_node(cur, tag)
                    const next2 = txf_field_node(next)
                    acc.children[cur] = next2
                  } else if (cur === '_div_button_box') {
                    const next = get_tag_node(cur, tag)
                    const next2 = txf_button_box_node(next)
                    acc.children[cur] = next2
                  } else if (tag === 'col') {
                    const meta2 = node[cur]
                    const meta = meta_get(meta2.name, meta2)
                    // console.log('col,', cur, tag, meta)
                    acc.children[cur] = { ...meta }
                  } else if (tag === 'label') {
                    acc.children[cur] = get_label_node(cur, tag)
                  } else {
                    acc.children[cur] = get_tag_node(cur, tag)
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
      const children = node_get(sheet)
      return children.children
    }

    const sheet = this.arch_sheet
    const children = children_get(sheet)

    // console.log('sheet', sheet)
    // console.log('children', children)

    return { children }
  }

  check_invisible(fieldInfo, kw) {
    const { for_tree } = kw
    if (for_tree) {
      return this.check_invisible_for_tree(fieldInfo, kw)
    } else {
      return this.check_invisible_for_form(fieldInfo, kw)
    }
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

  check_invisible_for_form(fieldInfo, kw) {
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
    // // 需要检查 merge_for_write

    if (!('states' in fieldInfo)) {
      return this._check_modifiers('readonly', fieldInfo, kw)
    }

    if (typeof fieldInfo.readonly === 'function') {
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
