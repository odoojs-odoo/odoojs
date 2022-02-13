import xml2json from '../xml2json'
import py_utils from '../py_utils'
// 1. search view 的 group_by 节点 的 context . 这个不需要 globals_dict
// 2. 搜索条件转 domain时
// 2.1. filter 的 domain str 需要 context
// 2.2. field 的 filter_domain str 需要 self = 搜索条件中的数据

import { Action } from '../action'
import { ViewBase } from './base_view'

import { Eval_Context, Domain_Str2Arr, Domain_Patch_And } from './tools'

import rpc from '@/odoorpc'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

export class Search extends ViewBase {
  constructor() {
    super()
  }

  static async default_value({ context, action, views }) {
    const { fields = {} } = views
    const context2 = Action._context({ context, action })

    const search_defaults = {}

    for (const item in context2) {
      if (item.slice(0, 14) === 'search_default') {
        // console.log('search', item, context2)
        const field = item.slice(15)
        const meta = fields[field] || {}
        if (['many2one', 'selection'].includes(meta.type)) {
          // console.log('search default is m2o', item)
          // throw 'search default is m2o'
          const key = `${field}-id_${context2[item]}`
          const val = context2[item]
          // console.log(val, typeof val)
          const val2 = Array.isArray(val) ? val : [val]
          const val_id = val2[0]
          search_defaults[key] =
            meta.type === 'many2one'
              ? (await this.Relation(meta.relation).name_get(val2)).find(
                  elm => elm[0] === val_id
                )
              : meta.selection.find(elm => elm[0] === val)
        } else {
          search_defaults[field] = 1
        }
      }
    }

    // console.log('search_ default value', search_defaults)

    return search_defaults
  }

  static _search_items({ views }) {
    const { fields = {}, fields_views = {} } = views
    const { search = {} } = fields_views

    const { arch } = search
    const search_node = xml2json.toJSON(arch)
    // console.log('search', search_node)

    const get_node_list = (nodes, filter_index) => {
      const res = (nodes.children || []).reduce(
        (acc, node, index) => {
          if (node.tagName === 'separator') {
            acc.items.push({ type: 'separator', name: `separator_${index}` })
            acc.filter_index = acc.filter_index + 1
          } else if (node.tagName === 'field') {
            const meta = fields[node.attrs.name]
            const str = meta.string
            acc.items.push({ type: 'field', string: str, ...node.attrs })
          } else if (node.tagName === 'filter') {
            const context = node.attrs.context
            const group_by = context && py_utils.eval(context, {}).group_by

            // console.log(context, group_by, fields)

            const type = group_by ? 'group_by' : 'filter'

            const append_date_for_groupby = () => {
              if (!group_by) return {}
              const group_by_field = group_by.split(':')[0]
              if (!['date', 'datetime'].includes(fields[group_by_field].type))
                return {}
              else return { date: group_by_field }
            }
            const date_for_groupby = append_date_for_groupby()
            acc.items.push({
              type,
              ...date_for_groupby,
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

      return res
    }

    const res = get_node_list(search_node, 0)

    return res.items
  }

  static _search_info_group_by(group_bys, search_values) {
    const group_by_checkeds = group_bys.filter(item =>
      Object.keys(search_values)
        .map(item => item.split('-')[0])
        .includes(item.name)
    )

    const group_by_checkeds2 = Object.keys(search_values).reduce(
      (acc, item) => {
        const gby_name = item.split('-')[0]
        const node = group_by_checkeds.find(it => it.name === gby_name)
        if (node && !acc.find(it => it.name === gby_name)) acc.push(node)
        return acc
      },
      []
    )

    const _group_by_get_date = name => {
      const dims = {
        year: '年',
        quarter: '季',
        month: '月',
        week: '周',
        day: '天'
      }

      const dims2 = Object.keys(dims).map(item => {
        const myname = `${name}-${item}`
        return { name: myname, type: item, string: dims[item] }
      })

      return dims2
    }

    const group_by_values = Object.values(
      group_by_checkeds2.reduce((acc, cur) => {
        if (!acc[cur.filter_group]) acc[cur.filter_group] = []

        const item = !cur.date
          ? cur
          : {
              ...cur,
              children: _group_by_get_date(cur.name).filter(
                item => search_values[item.name]
              )
            }

        acc[cur.filter_group].push(item)

        return acc
      }, {})
    )

    return group_by_values
  }

  static _search_info_field(fields, search_values) {
    const fs = fields
      .filter(item =>
        Object.keys(search_values)
          .map(item => item.split('-')[0])
          .includes(item.name)
      )
      .map(item => {
        const vals = Object.values(
          Object.keys(search_values).reduce((acc, cur) => {
            if (
              cur.split('-')[0] === item.name

              // cur.includes(item.name)
            ) {
              const value = search_values[cur]
              const str = Array.isArray(value) ? value[1] : value
              acc[cur] = { name: cur, string: str, value }
            }
            return acc
          }, {})
        )
        return [{ ...item, children: vals }]
      })

    return fs
  }

  static _search_info_filter(filters, search_values) {
    const checkeds = filters.filter(item =>
      Object.keys(search_values)
        .map(item => item.split('-')[0])
        .includes(item.name)
    )

    const _get_today = name => {
      const today = new Date()
      const today_year = today.getUTCFullYear()
      return [today_year - 2, today_year - 1, today_year]
        .reduce((acc, year) => {
          const year_node = {
            name: `${year}-all`,
            string: `${year}年`,
            type: 'year',
            year
          }
          const qts = Array.from(new Array(4).keys()).map(item => {
            return {
              name: `${year}-Q${item + 1}`,
              string: `${year}年Q${item + 1}`,
              type: 'quarter',
              year,
              quarter: item + 1
            }
          })
          const months = Array.from(new Array(12).keys()).map(item => {
            return {
              name: `${year}-${item + 1}`,
              string: `${year}年${item + 1}月`,
              type: 'month',
              year,
              month: item + 1
            }
          })
          acc = [...acc, year_node, ...qts, ...months]
          return acc
        }, [])
        .map(item => {
          return { ...item, name: `${name}-${item.name}` }
        })
    }

    const values = Object.values(
      checkeds.reduce((acc, cur) => {
        if (!acc[cur.filter_group]) acc[cur.filter_group] = []

        const item = !cur.date
          ? cur
          : {
              ...cur,
              children: _get_today(cur.name).filter(
                item => search_values[item.name]
              )
            }

        acc[cur.filter_group].push(item)

        return acc
      }, {})
    )

    return values
  }

  static _search_info_ir_filter(ir_filters, search_values) {
    const res = ir_filters.map(item => {
      const { domain, context, name: string, id: res_id } = item
      const name = `ir.filters,${res_id}`
      return { domain, context, string, name, type: 'ir.filters' }
    })

    const res2 = res
      .filter(item => {
        return Object.keys(search_values)
          .map(sv => sv.split('-')[0])
          .includes(item.name)
      })
      .map(item => [item])

    // console.log('_search_info_ir_filter,', ir_filters, res, res2, search_values)

    return res2
  }

  static _search_info({ views }, value) {
    const search_items = this._search_items({ views })

    const filters = search_items.filter(item => item.type === 'filter')
    const group_bys = search_items.filter(item => item.type === 'group_by')
    const fields = search_items.filter(item => item.type === 'field')
    const { filters: ir_filters = [] } = views

    const search_values = value

    const group_by_values = this._search_info_group_by(group_bys, search_values)
    const fs = this._search_info_field(fields, search_values)
    const values = this._search_info_filter(filters, search_values)
    const ir_filters_values = this._search_info_ir_filter(
      ir_filters,
      search_values
    )

    // const values2 = [...values, ...fs, ...group_by_values]

    // return { values: values2 }
    return {
      filters: values,
      fields: fs,
      groupbys: group_by_values,
      ir_filters: ir_filters_values
    }
  }

  static display_value({ views }, value) {
    const search_info = this._search_info({ views }, value)
    // console.log('display_value,', search_info, value)
    // const { values = [] } = search_info
    const values = [
      ...search_info.ir_filters,
      ...search_info.filters,
      ...search_info.fields,
      ...search_info.groupbys
    ]
    // console.log('display_value', values)

    const vals = values.reduce((acc, cur) => {
      const res = cur.reduce((acc2, cur2, index) => {
        // console.log(cur2)
        const char1 = index ? '或' : ''

        if (cur2.type === 'group_by') {
          // console.log(cur2)
          // const char11 = index ? '' : ''
          if (!cur2.date) {
            acc2.push({
              type: cur2.type,
              key: cur2.name,
              label: `≡${cur2.string || cur2.help}`,
              icon: 'ordered-list'
              // label: `${char11}${cur2.string || cur2.help}`
            })
          } else {
            const char2 = `${cur2.string || cur2.help}`
            const res2 = cur2.children.map((item, index2) => {
              return {
                type: cur2.type,
                key: item.name,
                // label: `${char2}:${item.string}`
                label: index2 ? `>${item.string}` : `≡${char2}:${item.string}`
                // `${index2 ? '' : char2}${item.string}`
                // label: `${index2 ? '' : char2}${item.string}`
              }
            })
            acc2 = [...acc2, ...res2]
          }
          return [...acc2]
        } else if (cur2.type === 'field' || cur2.date) {
          const char2 = `${cur2.string || cur2.help}`
          const res2 = cur2.children.map((item, index2) => {
            return {
              type: cur2.type,
              key: item.name,
              label: `${index || index2 ? '或' : ''} ${index2 ? '' : char2}${
                item.string
              }`
            }
          })
          return [...acc2, ...res2]
        } else if (cur2.type === 'filter') {
          acc2.push({
            type: cur2.type,
            key: cur2.name,
            label: `${char1}${cur2.string || cur2.help}`
          })
          return acc2
        } else if (cur2.type === 'ir.filters') {
          acc2.push({
            type: cur2.type,
            key: cur2.name,
            label: `★${cur2.string}`,
            icon: 'star'
            // label: `${char1}${cur2.string}`
          })
          return acc2
        } else {
          return acc2
        }
      }, [])

      return [...acc, ...res]
    }, [])

    return vals
  }

  static _search_options_values(values) {
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

    return values2
  }

  static _search_options_filter_by_type(items, type) {
    const ops1 = items.filter(
      node => [type, 'separator'].includes(node.type) && !node.invisible
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

    return ops3
  }

  static filter_options({ views }, value) {
    const search_info = this._search_info({ views }, value)
    // const { values = [] } = search_info
    const values = [
      ...search_info.filters,
      ...search_info.fields,
      ...search_info.groupbys
    ]

    const values2 = this._search_options_values(values)

    const items = this._search_items({ views })

    const ops3 = this._search_options_filter_by_type(items, 'filter')

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

    return ops4
  }

  static groupby_options({ views }, value) {
    const search_info = this._search_info({ views }, value)
    // const { values = [] } = search_info
    const values = [
      ...search_info.filters,
      ...search_info.fields,
      ...search_info.groupbys
    ]

    const values2 = this._search_options_values(values)
    const items = this._search_items({ views })

    const ops3 = this._search_options_filter_by_type(items, 'group_by')

    const _get_today = (name, fname) => {
      const dims = {
        year: '年',
        quarter: '季',
        month: '月',
        week: '周',
        day: '天'
      }

      const dims2 = Object.keys(dims).map(item => {
        const myname = `${name}-${item}`
        return {
          name: myname,
          checked: values2[myname] ? true : false,
          context: `{'group_by': '${fname}:${item}'}`,
          type: 'group_by',
          string: dims[item]
        }
      })

      return dims2
    }

    const ops4 = ops3.map(item => {
      const children = item.date
        ? { children: _get_today(item.name, item.date) }
        : {}

      return {
        ...item,
        checked: values2[item.name] ? true : false,
        ...children
      }
    })
    // console.log('groupby_options999', ops4)

    return ops4
  }

  static search_options({ views }) {
    const { fields = {} } = views

    const items = this._search_items({ views })

    const fs = items
      .filter(
        item =>
          item.type === 'field' &&
          !item.invisible &&
          fields[item.name].type !== 'boolean'
      )
      .map(item => {
        const meta = fields[item.name]
        const ism2o = ['many2one', 'selection'].includes(meta.type)
        return { ...item, arrow: ism2o }
      })

    // console.log('search_options', cp(items), cp(fs))

    return fs
  }

  static filters_options({ views }, value) {
    const { filters = [] } = views
    // console.log('filters_options', cp(filters), cp(value))
    return filters.map(item => {
      const name = `ir.filters,${item.id}`
      return { ...item, checked: value[name] ? true : false }
    })
  }

  static async unlink_filter({ views }, res_id, search_values) {
    await rpc.web.dataset.call_kw({
      model: 'ir.filters',
      method: 'unlink',
      args: [res_id],
      kwargs: {}
    })

    views.filters = views.filters.filter(item => item.id !== res_id)
    const name = `ir.filters,${res_id}`
    delete search_values[name]

    return true
  }

  static async submit_filter({ action, views }, filters_values, search_values) {
    const { name, is_default, is_public } = filters_values || {}

    const action_id = action.id
    const model_id = action.res_model
    // ir.filters

    const user_id = is_public ? false : rpc.env.uid
    const user_name = is_public ? false : rpc.env.name

    const group_by = this.to_groupby({ views }, search_values)
    const group_by2 = group_by.map(item => `'${item}'`)
    const group_by3 = group_by2.join(',')
    const context = `{'group_by':[${group_by3}]}`

    const domain = this.to_domain2({ views }, search_values)
    const vals = {
      action_id,
      model_id,
      context,
      domain,
      name,
      sort: '[]',
      is_default,
      user_id
    }
    console.log('submit_filter', vals)

    const res_id = await rpc.web.dataset.call_kw({
      model: 'ir.filters',
      method: 'create_or_replace',
      args: [vals],
      kwargs: {}
    })

    const vals_read = {
      ...vals,
      id: res_id,
      user_id: user_id ? [user_id, user_name] : user_id
    }
    if (!views.filters.find(item => item.id === res_id))
      views.filters.push(vals_read)

    return true
  }

  static onchange({ views }, search_values, payload) {
    const search_items = this._search_items({ views })

    const filters = search_items.filter(item => item.type === 'filter')
    const group_bys = search_items.filter(item => item.type === 'group_by')
    const fields = search_items.filter(item => item.type === 'field')
    const { filters: ir_filters = [] } = views

    const { name: name2, value } = payload
    const names = Array.isArray(name2) ? name2 : [name2]

    const values = { ...search_values }
    names.forEach(name => {
      if (!value) delete values[name]
      else if (filters.filter(item => item.name === name.split('-')[0]).length)
        values[name] = 1
      else if (fields.filter(item => item.name === name.split('-')[0]).length)
        values[name] = value
      else if (
        group_bys.filter(item => item.name === name.split('-')[0]).length
      )
        values[name] = value
      else {
        const n2s = name.split(',')
        if (n2s[0] === 'ir.filters') {
          if (ir_filters.filter(item => item.id === Number(n2s[1]))) {
            values[name] = value
          }
        }
      }
    })

    // console.log(action, search_values, payload, values)

    return values
  }

  static async get_selection({ views }, { field, name }) {
    const fields = views.fields_views.search.fields
    const meta = fields[field]
    const { relation } = meta

    const res = await this.Relation(relation).name_search({ name })

    return res
  }

  static to_groupby({ views }, search_values) {
    const search_info = this._search_info({ views }, search_values)

    // console.log('to_groupby111,search_info:', search_info)
    const arr_get = sin => {
      return sin.reduce((acc, item) => {
        const res2 = item.reduce((acc2, item2) => {
          const ctx = py_utils.eval(item2.context, {})

          const childs = item2.date
            ? item2.children.map(item3 => `${ctx.group_by}:${item3.type}`)
            : [ctx.group_by]

          return [...acc2, ...childs]
        }, [])

        return [...acc, ...res2]
      }, [])
    }

    const arr_get2 = sin => {
      return sin.reduce((acc, item) => {
        const res2 = item.reduce((acc2, item2) => {
          const ctx = py_utils.eval(item2.context, {})
          return [...acc2, ...ctx.group_by]
        }, [])

        return [...acc, ...res2]
      }, [])
    }

    const values = [...search_info.groupbys]
    const grpbys1 = arr_get(values)
    const values2 = [...search_info.ir_filters]
    const grpbys2 = arr_get2(values2)
    return [...grpbys2, ...grpbys1]
  }

  static to_domain2({ views }, search_values) {
    // console.log('to_domain2aaa  1,', search_values)
    const _shift_or = dms => {
      if (!dms.length) return dms
      else if (dms.length === 1) return dms
      else return [...new Array(dms.length - 1).fill('"|"'), ...dms]
    }

    const _to_domain_date_str = (field, { type, year, quarter, month }) => {
      const date2str = date => {
        const year = (date.getFullYear() + 0).toString().padStart(4, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = (date.getDate() + 0).toString().padStart(2, '0')
        return `${year}-${month}-${day}`
      }
      const ret_fn = (first, last) => {
        const str1 = date2str(first)
        const str2 = date2str(new Date(last - 24 * 60 * 60 * 1000))
        return `'&',('${field}','>=','${str1}'),('${field}','<=','${str2}')`
      }
      if (type === 'year')
        return ret_fn(new Date(year, 0, 1), new Date(year + 1, 0, 1))
      else if (type === 'quarter') {
        const fst = new Date(year, (quarter - 1) * 3, 1)
        const lst2 = new Date(fst - -100 * 24 * 60 * 60 * 1000)
        const lst = new Date(lst2.getFullYear(), lst2.getMonth(), 1)
        return ret_fn(fst, lst)
      } else if (type === 'month') {
        const fst = new Date(year, month - 1, 1)
        const lst2 = new Date(fst - -40 * 24 * 60 * 60 * 1000)
        const lst = new Date(lst2.getFullYear(), lst2.getMonth(), 1)
        return ret_fn(fst, lst)
      } else {
        return ''
      }
    }

    const to_domain = node => {
      const _field_to_domain = (node, value) => {
        const field = node.name
        const operator = !Array.isArray(value) ? 'ilike' : node.operator || '='
        const value2 = Array.isArray(value) ? value[0] : value
        const value3 = typeof value2 === 'string' ? `'${value2}'` : value2
        return `('${field}','${operator}',${value3})`
        // [[field, operator, value2]]
      }

      const _patch_and = str => {
        const res = Domain_Str2Arr(str)
        const res1 = Domain_Patch_And(res)
        const res2 = res1.join(', ')
        return `[${res2}]`
      }

      const arr2str = arr => {
        const val2str = val => {
          if (typeof val === 'string') return `'${val}'`
          else if (Array.isArray(val)) {
            const val2 = val.map(item => {
              if (typeof item === 'string') return `'${item}'`
              else return item
            })
            return `[${val2.join(',')}]`
          } else {
            return val
          }
        }

        const res = arr.reduce((acc, tup) => {
          if (Array.isArray(tup)) {
            const [fld, op, val] = tup
            const val2 = val2str(val)
            acc.push(`('${fld}','${op}', ${val2} )`)
          } else {
            acc.push(`'${tup}'`)
          }
          return acc
        }, [])

        return res.join(', ')

        // const ch_str = JSON.stringify(arr).trim()
        // const ch_str2 = ch_str.slice(1, ch_str.length - 1)
      }

      if (node.type === 'filter') {
        if (node.domain) {
          return _patch_and(node.domain)
        } else if (node.date) {
          const res = _shift_or(
            node.children.map(item => {
              const child_str = _to_domain_date_str(node.date, item)
              return child_str
            })
          )

          const res2 = res.join(', ')
          return `[${res2}]`
        }
      } else if (node.type === 'field') {
        if (node.filter_domain) {
          const str = _patch_and(node.filter_domain)
          // console.log(node)
          const res = _shift_or(
            node.children.reduce((acc, item) => {
              const ch_domain = py_utils.eval(str, {
                self: item.value
              })

              const ch_str2 = arr2str(ch_domain)
              return [...acc, ch_str2]
            }, [])
          )

          const res2 = res.join(', ')
          return `[${res2}]`
        } else {
          const res = _shift_or(
            node.children.map(item => _field_to_domain(node, item.value))
          )
          const res2 = res.join(', ')
          return `[${res2}]`
        }
      } else if (node.type === 'ir.filters') {
        return node.domain
      }

      return '[]'
    }

    const search_info = this._search_info({ views }, search_values)

    const values = [
      ...search_info.filters,
      ...search_info.fields,
      ...search_info.ir_filters
      // ...search_info.groupbys,
    ]

    // console.log('to_domain2aaa  2,', values)

    const domain = values.reduce((acc, cur) => {
      const dms2 = cur.map(item => {
        const dm2 = to_domain(item)
        return dm2.slice(1, dm2.length - 1)
      })
      const dms = _shift_or(dms2)

      if (acc.length) acc = ["'&'", ...acc, ...dms]
      else acc = [...acc, ...dms]
      return acc
    }, [])

    const domain2 = `[${domain.join(',')}]`
    // console.log(domain2)
    return domain2
  }

  static to_domain({ context, views }, search_values) {
    // console.log('to_domain11  1,', search_values)
    const str = this.to_domain2({ views }, search_values)
    // console.log('to_domain11  9,', str)
    const dms1 = Eval_Context({ context }, { str, record: {} })
    // console.log(dms1)
    return dms1
  }
}
