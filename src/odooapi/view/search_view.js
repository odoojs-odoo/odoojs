import xml2json from '../xml2json'
import py_utils from '../py_utils'
// 1. search view 的 group_by 节点 的 context . 这个不需要 globals_dict
// 2. 搜索条件转 domain时
// 2.1. filter 的 domain str 需要 context
// 2.2. field 的 filter_domain str 需要 self = 搜索条件中的数据

import { Action } from '../action'
import { ViewBase } from './base_view'

export class Search extends ViewBase {
  constructor() {
    super()
  }

  static async default_value({ session, context, action, views }) {
    const { fields = {} } = views
    const context2 = Action._context({ context, action })
    // console.log('search_ default value', session, context2)
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
          search_defaults[key] =
            meta.type === 'many2one'
              ? (
                  await this.Relation({ session }, meta.relation).name_get([
                    val
                  ])
                ).find(elm => elm[0] === val)
              : meta.selection.find(elm => elm[0] === val)
        } else {
          search_defaults[field] = 1
        }
      }
    }

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

  static _search_info({ action, views }, value) {
    const search_items = this._search_items({ action, views })

    const filters = search_items.filter(item => item.type === 'filter')
    const group_bys = search_items.filter(item => item.type === 'group_by')
    const fields = search_items.filter(item => item.type === 'field')

    const search_values = value

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

    // const values2 = [...values, ...fs, ...group_by_values]

    // return { values: values2 }
    return {
      filters: values,
      fields: fs,
      groupbys: group_by_values
    }
  }

  static display_value({ action, views }, value) {
    const search_info = this._search_info({ action, views }, value)
    // const { values = [] } = search_info
    const values = [
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
              label: `G${cur2.string || cur2.help}`
              // label: `${char11}${cur2.string || cur2.help}`
            })
          } else {
            const char2 = `${cur2.string || cur2.help}`
            const res2 = cur2.children.map((item, index2) => {
              return {
                type: cur2.type,
                key: item.name,
                // label: `${char2}:${item.string}`
                label: index2 ? `>${item.string}` : `G${char2}:${item.string}`

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
              label: `${index || index2 ? '或' : ''}${index2 ? '' : char2}${
                item.string
              }`
            }
          })
          return [...acc2, ...res2]
        } else {
          acc2.push({
            type: cur2.type,
            key: cur2.name,
            label: `${char1}${cur2.string || cur2.help}`
          })
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

  static filter_options({ action, views }, value) {
    const search_info = this._search_info({ action, views }, value)
    // const { values = [] } = search_info
    const values = [
      ...search_info.filters,
      ...search_info.fields,
      ...search_info.groupbys
    ]

    const values2 = this._search_options_values(values)

    const items = this._search_items({ action, views })

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

  static groupby_options({ action, views }, value) {
    const search_info = this._search_info({ action, views }, value)
    // const { values = [] } = search_info
    const values = [
      ...search_info.filters,
      ...search_info.fields,
      ...search_info.groupbys
    ]

    const values2 = this._search_options_values(values)
    const items = this._search_items({ action, views })
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
    // console.log('groupby_options', ops4)

    return ops4
  }

  static search_options({ action, views }) {
    const { fields = {} } = views

    const items = this._search_items({ action, views })

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

  static onchange({ action, views }, search_values, payload) {
    const search_items = this._search_items({ action, views })

    const filters = search_items.filter(item => item.type === 'filter')
    const group_bys = search_items.filter(item => item.type === 'group_by')
    const fields = search_items.filter(item => item.type === 'field')

    const { name: names, value } = payload

    const values = { ...search_values }
    names.split(',').forEach(name => {
      if (!value) delete values[name]
      else if (filters.filter(item => item.name === name.split('-')[0]).length)
        values[name] = 1
      else if (fields.filter(item => item.name === name.split('-')[0]).length)
        values[name] = value
      else if (
        group_bys.filter(item => item.name === name.split('-')[0]).length
      )
        values[name] = value
    })

    // console.log(action, search_values, payload, values)

    return values
  }

  static async get_selection(info, { field, name }) {
    const fields = this._fields(info)
    const meta = fields[field]
    const { relation } = meta

    const res = await this.Relation(relation).name_search({ name })

    return res
  }

  static to_groupby({ action, views }, search_values) {
    const search_info = this._search_info({ action, views }, search_values)
    const values = [...search_info.groupbys]
    return values.reduce((acc, item) => {
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

  static to_domain({ context, action, views }, search_values) {
    const _patch_and_one = dms => {
      // console.log('_patch_and_one', dms)
      const return_error = () => {
        console.log('parse domain error:', dms)
        return [0, undefined, dms]
      }

      // console.log('domain:', dms)
      let todo = [...dms]

      if (!todo.length) return [null, todo]
      const item = todo.shift()

      if (Array.isArray(item)) return [1, item, todo]

      if (item === '!') {
        const [noerror, one, next] = _patch_and_one(todo)
        if (!noerror) return return_error()
        const one_ones = noerror === 1 ? [one] : [...one]
        return [2, [item, ...one_ones], next]
      }

      if (!['&', '|'].includes(item)) return return_error()

      const [noerror1, one1, next1] = _patch_and_one(todo)
      if (!noerror1) return return_error()

      const [noerror2, one2, next2] = _patch_and_one(next1)
      if (!noerror2) return return_error()
      const one11 = noerror1 === 1 ? [one1] : [...one1]
      const one21 = noerror2 === 1 ? [one2] : [...one2]
      return [2, [item, ...one11, ...one21], next2]
    }

    const _patch_and = dms => {
      // console.log('_patch_and:', dms)

      const dm = [...dms]
      if (!dm.length) return []

      const [noerror1, one1, next1] = _patch_and_one(dm)
      if (!noerror1) {
        // error
        console.log('parse domain error:', dm)
        return []
      }

      let result = noerror1 === 1 ? [one1] : [...one1]
      let next_todo = [...next1]

      while (next_todo.length) {
        const [noerror, one, next] = _patch_and_one(next_todo)
        if (!noerror) {
          // error
          console.log('parse domain error:', next_todo)
          return []
        }

        const one_ones = noerror === 1 ? [one] : [...one]
        result = ['&', ...result, ...one_ones]
        next_todo = [...next]
      }

      // console.log('_patch_and 9:', result)

      return result
    }

    const to_domain_insert_and = (str, globals_dict = {}) => {
      const dms1 = py_utils.eval(str, globals_dict)
      // console.log(dms1)
      const dms = _patch_and(dms1) // 检查 数组, 补充 and
      // console.log('domain:', dms)
      return dms
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
        return `['&', ('${field}', '>=', '${str1}'), ('${field}', '<=', '${str2}')]`
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

    const _shift_or = dms => {
      if (!dms.length) return dms
      const dms2 = dms.reduce((acc, cur) => [...acc, ...cur], [])
      return [...new Array(dms.length - 1).fill('|'), ...dms2]
    }

    const to_domain = node => {
      // console.log('to_domain', context)
      // uid
      const globals_dict = { ...context }

      const _field_to_domain = (node, value) => {
        const field = node.name
        const operator = !Array.isArray(value) ? 'ilike' : node.operator || '='
        const value2 = Array.isArray(value) ? value[0] : value
        return [[field, operator, value2]]
      }

      if (node.type === 'filter') {
        if (node.domain) return to_domain_insert_and(node.domain, globals_dict)
        else if (node.date) {
          return _shift_or(
            node.children.reduce((acc, item) => {
              const child_str = _to_domain_date_str(node.date, item)
              const child_domain = to_domain_insert_and(child_str, globals_dict)
              return [...acc, child_domain]
            }, [])
          )
        }
      } else if (node.type === 'field') {
        if (node.filter_domain) {
          const dms = _shift_or(
            node.children.reduce((acc, item) => {
              const ch_domain = to_domain_insert_and(node.filter_domain, {
                self: item.value
              })
              return [...acc, ch_domain]
            }, [])
          )

          // console.log('field,1', node, node.filter_domain, dms)

          return dms
        } else {
          const dms = _shift_or(
            node.children.reduce((acc, item) => {
              const ch_domain = _field_to_domain(node, item.value)
              return [...acc, ch_domain]
            }, [])
          )

          // console.log('field,2', node, dms)
          return dms
        }
      }
      return []
    }

    const search_info = this._search_info({ action, views }, search_values)

    const values = [
      ...search_info.filters,
      ...search_info.fields
      // ...search_info.groupbys,
    ]

    // console.log('todomain', values)

    const domain = values.reduce((acc, cur) => {
      const dms2 = cur.map(item => to_domain(item))
      const dms = _shift_or(dms2) // dms 补充 or
      // console.log('or', dms)

      if (acc.length) acc = ['&', ...acc, ...dms]
      else acc = [...acc, ...dms]
      return acc
    }, [])

    return domain
  }
}
