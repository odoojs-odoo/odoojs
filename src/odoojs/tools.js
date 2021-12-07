import { parseTime } from './utils'
import { is_node } from './utils'
import py_utils from './py_utils'

const check_is_rename = ftype => {
  return ['many2one', 'selection'].includes(ftype)
}

export default {
  debug: 10,
  baseURL: '',
  // _fields(view_info = {}) {
  //   const fields = view_info.fields || {}
  //   return fields
  // },

  // _node(view_info = {}) {
  //   const node = view_info.node || { children: [] }
  //   return node
  // },

  _views(view_info) {
    return view_info.views || {}
  },

  _search_view_info(search = {}) {
    const search_node = search.node || {}
    // console.log(search)
    const get_node_list = (nodes, filter_index) => {
      const info = (nodes.children || []).reduce(
        (acc, node, index) => {
          if (node.tagName === 'separator') {
            acc.items.push({ type: 'separator', name: `separator_${index}` })
            acc.filter_index = acc.filter_index + 1
          } else if (node.tagName === 'field') {
            acc.items.push({ type: 'field', ...node.attrs })
          } else if (node.tagName === 'filter') {
            const context = node.attrs.context

            const type =
              context && py_utils.eval(context, {}).group_by
                ? 'group_by'
                : 'filter'

            acc.items.push({
              type,
              filter_group: `filter_group_${acc.filter_index}`,
              ...node.attrs
            })
          } else if (node.tagName === 'group') {
            const child_info = get_node_list(node, acc.filter_index + 3)
            acc.filter_index = child_info.filter_index + 2
            acc.items = [...acc.items, ...child_info.items]
          }

          return acc
        },
        { filter_index, items: [] }
      )

      return info
    }

    const info = get_node_list(search_node, 0)

    return { items: info.items, fields: search.fields || {} }
  },

  search_btn_options({ search_info = {}, view_info = {} }) {
    const { values = [] } = search_info

    const values2 = values.reduce((acc, cur) => {
      return {
        ...acc,
        ...cur.reduce((acc2, cur2) => {
          if (cur2.date) {
            return {
              ...acc2,
              ...cur2.children.reduce((acc3, cur3) => {
                return { ...acc3, [cur3.name]: cur3 }
              }, {})
            }
          } else {
            return { ...acc2, [cur2.name]: cur2 }
          }
        }, {})
      }
    }, {})

    // const values2 =

    // console.log('vals xxxxx', values2)

    const views = this._views(view_info)
    const search = views.search || {}
    const info = this._search_view_info(search)

    const items = info.items || []
    const ops1 = items.filter(
      node => ['filter', 'separator'].includes(node.type) && !node.invisible
    )
    let ops2 = []
    while (ops1.length) {
      const one = ops1.shift()
      if (one.type !== 'separator') {
        ops2 = [one, ...ops1]
        break
      }
    }

    let ops3 = []
    while (ops2.length) {
      const one = ops2.pop()
      if (one.type !== 'separator') {
        ops3 = [...ops2, one]
        break
      }
    }

    const _get_today = name => {
      // const today = new Date('2021-08-01')
      const today = new Date()
      // console.log(today)
      const today_year = today.getUTCFullYear()
      const today_month = today.getUTCMonth() + 1
      const today_quarter = Math.floor((today_month - 1) / 3) + 1

      const years = [today_year, today_year - 1, today_year - 2]
      const quarters = Array.from(new Array(4).keys())
        .map(item => item + 1)
        .reverse()
      const months = Array.from(new Array(12).keys())
        .map(item => item + 1)
        .reverse()

      const year_items = years.map(yy => {
        const myname = `${name}-${yy}-all`
        return {
          name: myname,
          checked: values2[myname] ? true : false,
          type: 'filter',
          value: yy,
          string: `${yy}年`
        }
      })

      const year_items2 = year_items.map(year => {
        const qt_items = quarters
          .filter(
            qt =>
              year.value < today_year ||
              (year.value === today_year && qt <= today_quarter)
          )
          .map(qt => {
            const myname = `${name}-${year.value}-Q${qt}`
            return {
              type: 'filter',
              name: myname,
              checked: values2[myname] ? true : false,
              value: qt,
              string: `${year.value}年Q${qt}`
            }
          })

        const month_items = months
          .filter(month => year.value < today_year || month <= today_month)
          .map(month => {
            const myname = `${name}-${year.value}-${month}`
            return {
              value: month,
              type: 'filter',
              name: myname,
              checked: values2[myname] ? true : false,
              string: `${year.value}年${month}月`
            }
          })

        return {
          string: year.string,
          type: 'filter',
          name: `${name}-${year.value}-next`,
          children: [
            ...qt_items,
            { name: 'separator', type: 'separator' },
            ...month_items
          ]
        }
      })

      // console.log([...year_items, ...year_items2])

      return [
        ...year_items,
        { name: 'separator', type: 'separator' },
        ...year_items2
      ]
    }

    const ops4 = ops3.map(item => {
      const children = item.date ? { children: _get_today(item.name) } : {}

      return {
        ...item,
        checked: values2[item.name] ? true : false,
        // string: `^${item.string}`,
        ...children
      }
    })

    // console.log('search_btn_options', ops4)

    return ops4
  },

  // eslint-disable-next-line no-unused-vars
  search_fields({ search_info = {}, view_info = {} }) {
    // const { values = [] } = search_info
    // console.log(JSON.parse(JSON.stringify(view_info)))

    const views = this._views(view_info)
    const search = views.search || {}
    const info = this._search_view_info(search)

    const fs = info.items
      .filter(
        item =>
          item.type === 'field' &&
          !item.invisible &&
          info.fields[item.name].type !== 'boolean'
      )
      .map(item => {
        return {
          ...item,
          arrow: ['many2one', 'selection'].includes(info.fields[item.name].type)
        }
      })
    // console.log(JSON.parse(JSON.stringify(info)))
    // console.log('sss', JSON.parse(JSON.stringify(fs)))

    return fs
  },

  search_values({ search_info = {} }) {
    const { values = [] } = search_info
    // console.log('search_values', JSON.parse(JSON.stringify(values)))

    const vals = values.reduce((acc, cur) => {
      const res = cur.reduce((acc2, cur2, index) => {
        const char1 = index ? '或' : ''
        if (cur2.type === 'field' || cur2.date) {
          const char2 = `${cur2.string || cur2.help}`
          const res2 = cur2.children.map((item, index2) => {
            return {
              key: item.name,
              label: `${index || index2 ? '或' : ''}${index2 ? '' : char2}${
                item.string
              }`
            }
          })
          return [...acc2, ...res2]
        } else {
          acc2.push({
            key: cur2.name,
            label: `${char1}${cur2.string || cur2.help}`
          })
          return acc2
        }
      }, [])

      return [...acc, ...res]
    }, [])

    // console.log('search_values9', JSON.parse(JSON.stringify(vals)))

    return vals
  },

  view_columns({ view_info = {}, field }) {
    if (!field) return this._view_columns(view_info)

    const meta = (view_info.fields || {})[field]
    return meta ? this._view_columns(meta) : []
  },

  _view_columns(view_info) {
    const views = this._views(view_info)
    const tree = views.list || views.tree || {}
    const fields = tree.fields || {}
    const node = tree.node || { children: [] }

    const columns = (node.children || []).map(item => {
      const fname = item.attrs.name
      const title = item.attrs.string
      return { key: fname, title, node: item }
    })

    const cols = columns.map(item => {
      const fname = item.key
      const title = item.title
      const meta = fields[fname] || {}
      // const key = check_is_rename(meta.type) ? `${fname}__name` : fname
      const key = fname
      const nitem = { ...item, key, title, meta }

      if (meta.type === 'boolean') {
        nitem.render = (h, { row, column }) => {
          const true_label = column.true_label || '是'
          const false_label = column.false_label || '否'
          const val = row[column.key] ? true_label : false_label
          return h('span', {}, val)
        }
      }

      return nitem
    })

    const cols2 = cols.map(item => {
      const meta = item.meta
      const fname = item.key
      const key = check_is_rename(meta.type) ? `${fname}__name` : fname

      return { ...item, key }
    })

    return cols2
  },

  form_info({ view_info = {} }) {
    const views = this._views(view_info)
    const form = views.form || {}

    // console.log('form_info ', view_info, views, form)
    return {
      model: view_info.model,
      node: form.node,
      fields: form.fields || {}
    }
  },

  kanban_info({ view_info = {}, field }) {
    if (!field) return this._kanban_info(view_info)

    const meta = (view_info.fields || {})[field]
    return meta ? this._kanban_info(meta) : []
  },

  _kanban_info(view_info) {
    const views = this._views(view_info)
    const kanban = views.kanban || {}

    const node = kanban.node || { children: [] }

    const templates = node.children.find(item => item.tagName === 'templates')
    return {
      templates,
      title: (templates || { children: [] }).children.find(
        item => item.attrs.name === 'title'
      ),

      content: (templates || { children: [] }).children.find(
        item => item.attrs.name === 'content'
      )
    }
  },

  kanban_image_url(node, payload = {}) {
    return this._image_url(node, payload)
  },

  avatar_url(node, payload = {}) {
    return this._image_url(node, payload)
  },

  _image_url(node, { data_info = {}, view_info = {} }) {
    const { dataDict = {} } = data_info
    const res_id = dataDict.id
    if (!res_id) return undefined

    const baseURL = this.baseURL
    const node_attrs = (node || {}).attrs || {}

    if (node_attrs.widget === 'image_url') {
      const image_url = dataDict.image_url
      const url = `${baseURL}${image_url}`
      return url
    }

    const fname = node_attrs.name
    if (!fname) return undefined
    const imgUrl = '/web/image'
    const model = view_info.model
    const field = fname
    const now = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
    const url = `${baseURL}${imgUrl}?model=${model}&id=${res_id}&field=${field}&unique=${now}`
    // console.log(url)

    return url
  },

  _node_modifiers(node, attr, { data_info = {} /*, view_info = {} */ }) {
    if (!node.attrs.modifiers) return null

    const modifiers = JSON.parse(node.attrs.modifiers)

    const values = data_info.values_modifiers || {}

    if (modifiers[attr] !== undefined)
      return compute_domain(modifiers[attr], values)
    else return null
  },

  node_readonly(node, payload = {}) {
    if (!is_node(node)) return true

    return this._node_modifiers(node, 'readonly', payload)
  },

  node_required(node, payload = {}) {
    if (!is_node(node)) return false
    return this._node_modifiers(node, 'required', payload)
  },

  // for sub tree
  // get_required(row_id, node /*, payload = {} */) {
  //   if (!is_node(node)) {
  //     return false
  //   }

  //   // TBD 暂时 这样处理, o2m 的 required, 该如何计算, 需要再找例子
  //   const required = this._get_modifiers(node, 'required', {})
  //   return required
  // }

  node_invisible(node, payload = {}) {
    if (!is_node(node)) return false

    if (node.attrs.invisible) {
      const { data_info = {} } = payload
      const context = data_info.context || {}
      return py_utils.eval(node.attrs.invisible, { context })
    }

    const invisible = this._node_modifiers(node, 'invisible', payload)

    if (invisible) return invisible

    if ((node.children || []).length === 0) return invisible

    return (node.children || []).reduce(
      (acc, cur) => acc && this.node_invisible(cur, payload),
      true
    )
  }
}

const compute_domain = (domain_in, record, debug) => {
  // console.log(domain_in, record)
  // if (domain_in.length === 6) {
  //   console.log(domain_in, record)
  // }
  if (!Array.isArray(domain_in)) return domain_in

  const domain = [...domain_in]

  const AND = (v1, v2) => {
    // console.log('AND', v1, v2)
    if (debug) {
      return v1 * v2
    } else {
      const val1 = compute_condition(v1)
      const val2 = compute_condition(v2)

      return val1 && val2
    }
  }
  const OR = (v1, v2) => {
    // console.log('OR', v1, v2)
    if (debug) {
      return v1 + v2
    } else {
      const val1 = compute_condition(v1)
      const val2 = compute_condition(v2)
      return val1 || val2
    }
  }
  const NOT = v1 => {
    // console.log('NOT', v1)
    if (debug) {
      return -v1
    } else {
      return !v1
    }
  }

  const OPTIONS = { '&': AND, '|': OR, '!': NOT }

  // let index = 0

  const EQU = (val1, val2) => {
    // console.log('EQU', val1, ',', val2)

    if (!Array.isArray(val1)) {
      return val1 === val2
    }

    if (val1.length === 0 && val2.length === 0) {
      return true
    } else if (val1.length !== val2.length) {
      return false
    }
    //
    throw 'TBD: EQU, array'
  }

  const IN = (val1, val2) => {
    // console.log('IN', val1, ',', val2)
    const ret = val2.includes(val1)
    // console.log('IN', ret)
    return ret
  }

  const compute_condition = condition => {
    if (!Array.isArray(condition)) {
      return condition
    }
    //
    const [field, op, val] = condition
    // console.log('xxxx', field, record[field], op, val)
    const val1 = record[field]
    switch (op) {
      case '=':
      case '==':
        return EQU(val1, val)
      case '!=':
      case '<>':
        // if(field===''){
        //   //
        // }

        return !EQU(val1, val)
      case '<':
        return val1 < val
      case '>':
        return val1 > val
      case '<=':
        return val1 <= val
      case '>=':
        return val1 >= val
      case 'in':
        return IN(val1, val)
      case 'not in':
        return !IN(val1, val)
      // case 'like':
      // // return (fieldValue.toLowerCase().indexOf(this._data[2].toLowerCase()) >= 0);
      // case '=like':
      // // var regExp = new RegExp(this._data[2].toLowerCase().replace(/([.\[\]\{\}\+\*])/g, '\\\$1').replace(/%/g, '.*'));
      // // return regExp.test(fieldValue.toLowerCase());
      // case 'ilike':
      // // return (fieldValue.indexOf(this._data[2]) >= 0);
      // case '=ilike':
      // return new RegExp(this._data[2].replace(/%/g, '.*'), 'i').test(fieldValue);
      default:
        throw 'error'
      // throw new Error(_.str.sprintf(
      //     "Domain %s uses an unsupported operator",
      //     this._data
      // ));
      //
    }
  }

  const fn = (domain, op) => {
    // console.log('1st:index:', index, domain, op)
    // if (domain_in.length === 6) {
    //   console.log('1st:index:', domain, op)
    // }

    // index = index + 1
    if (!domain.length) {
      // if (domain_in.length === 6) {
      //   console.log('2st:index:', domain, op)
      // }

      // 补丁, odoo 出现了 多一个 '|' 的情况
      if (op.length === 0) {
        return [null]
      } else {
        const comp = op[op.length - 1]
        if (comp === '!') {
          op.pop()
          return fn([...domain], op)
        } else if (comp === '&' || comp === '|') {
          op.pop()
          return fn(domain, op)
        } else {
          const v1 = op.pop()
          const c0 = op.pop()
          const ret = OPTIONS[c0](v1, v1)
          return fn([ret, ...domain], op)
        }
      }
    } else if (op.length === 0 && domain.length === 1) {
      const val = domain[0]
      const val2 = compute_condition(val)
      return [val2]
    }

    const one = domain.shift()

    if (['&', '|', '!'].includes(one)) {
      // console.log('2.1, &|!:', domain, op, one)
      op.push(one)
      const ret = fn(domain, op)
      // console.log('2.1,&|!,1:', domain, op)
      // console.log('2.1,&|!,ok:', ret)
      return ret
    } else {
      // console.log('2.2:', domain, op, one)
      if (op.length === 0) {
        // op not(!&|)  and domain >1
        // console.log('4 default &', domain, op, one)
        op.push('&')
        op.push(one)
        // console.log('4 default & 1', domain, op)
        const dm2 = fn(domain, op)
        // console.log('4 default & ok', dm2, op)
        return dm2
        // return fn(dm2, op)
      } else {
        // console.log('3 comp:', domain, op, one)
        const comp = op[op.length - 1]
        if (comp === '!') {
          // console.log('3.1 !,:', domain, op, one)
          op.pop()
          const ret = NOT(one)
          // console.log('3.1 !,ok:', [ret, ...domain], op)
          return fn([ret, ...domain], op)
        } else if (comp === '&' || comp === '|') {
          op.push(one)
          return fn(domain, op)
        } else {
          // console.log('3.2 &|,:', domain, op, one)
          const v1 = op.pop()
          const c0 = op.pop()
          const ret = OPTIONS[c0](v1, one)
          // console.log('3.2 &|,ok:', [ret, ...domain], op)
          return fn([ret, ...domain], op)
        }
      }
    }
  }

  const ret = fn(domain, [])

  const ret2 = ret[0]

  // if (domain_in.length === 6) {
  //   console.log('all,ok', ret2)
  // }

  return ret2
}

//   // form sub tree. TBD
//   get view_columns2() {
//     const cols = super.view_columns

//     const cols2 = cols.map(item => {
//       const meta = item.meta
//       const fname = item.key

//       const get_tag = () => {
//         const type = meta.type
//         if (['monetary', 'float'].includes(type)) {
//           return { tag: 'input', type: 'number' }
//         } else if (['many2one'].includes(type)) {
//           return { tag: 'select' }
//         } else if (['many2many'].includes(type)) {
//           return { tag: 'many2many' }
//         }
//         return { tag: 'input', type: 'text' }
//       }

//       const render_info = get_tag()

//       const key__name = check_is_rename(meta.type)
//         ? `${fname}__name`
//         : undefined

//       return { ...item, key__name, render_info }
//     })

//     return cols2
//   }
