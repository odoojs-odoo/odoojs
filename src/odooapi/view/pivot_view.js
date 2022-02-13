import { ViewBase } from './base_view'
import { Search } from './search_view'

import py_utils from '../py_utils'
// 1.  pivot 节点 的 invisible , 需要 context

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

const sort_by_string = dict => {
  return Object.keys(dict)
    .map(item => {
      return { field: item, string: dict[item].string }
    })
    .sort((a, b) => a.string.localeCompare(b.string, 'en-US'))
    .reduce((acc, cur) => {
      return { ...acc, [cur.field]: dict[cur.field] }
    }, {})
}

const _field_check_is_pivot = (name, meta) => {
  const { store } = meta
  return name !== 'id' && store === true
}

const _field_check_is_groupby = (name, meta) => {
  const { type } = meta

  const is_pivot = _field_check_is_pivot(name, meta)
  if (!is_pivot) return is_pivot

  const GROUPABLE_TYPES = [
    'boolean',
    'char',
    'date',
    'datetime',
    'integer',
    'many2one',
    'selection'
  ]

  return GROUPABLE_TYPES.includes(type)
}

const _field_check_is_measure = (name, meta, additionalMeasures = []) => {
  const { type } = meta
  const is_pivot = _field_check_is_pivot(name, meta)
  if (!is_pivot) return is_pivot
  return (
    ['integer', 'float', 'monetary'].includes(type) ||
    additionalMeasures.includes(name)
  )
}

const is_equ_obj = (dct1, dct2) => {
  const sort_dict = obj => {
    return Object.keys(obj)
      .sort()
      .reduce((acc, cur) => {
        return { ...acc, [cur]: obj[cur] }
      }, {})
  }

  const objA = sort_dict(dct1)
  const objB = sort_dict(dct2)
  return Object.entries(objA).toString() === Object.entries(objB).toString()
}

const is_equ_obj_part = (dct1, dct2) => {
  return is_equ_obj(
    dct1,
    Object.keys(dct1).reduce((acc, cur) => {
      acc[cur] = dct2[cur]
      return acc
    }, {})
  )
}

const _pivot_merge_records = (dest, src) => {
  const old = dest.filter(one => {
    const in_new = src.find(item => is_equ_obj(one.dims, item.dims))
    return !in_new
  })

  return [...old, ...src]
}

export class Olap extends ViewBase {
  constructor() {
    super()
  }

  static pivot_measures_all(info) {
    const fields = this._fields_all(info)

    const fs = Object.keys(fields).reduce((acc, name) => {
      const field = fields[name]
      if (_field_check_is_measure(name, field)) acc[name] = field
      return acc
    }, {})

    const ms = sort_by_string(fs)

    return ms
  }

  static pivot_groupbys(info) {
    const fields = this._fields_all(info)
    const fs = Object.keys(fields).reduce((acc, name) => {
      const field = fields[name]
      if (_field_check_is_groupby(name, field)) acc[name] = field
      return acc
    }, {})

    const grpbys = sort_by_string(fs)

    return grpbys
  }

  static default_pivot_data(info) {
    // console.log(info, kwargs)
    const { node } = info
    const fields = this._fields_all(info)
    const globals_dict = {}
    // 是否显示 依赖于权限不同, 因此 判断  invisible 需要数据
    const fs = (node.children || [])
      .filter(fld => {
        const invisible = fld.attrs.invisible
          ? py_utils.eval(fld.attrs.invisible, globals_dict)
          : false
        return !invisible
      })
      .map(item => {
        const { name, type: type_in, interval = 'month' } = item.attrs || {}
        // eslint-disable-next-line no-unused-vars
        const { widget } = item.attrs || {}

        const GROUPABLE_TYPES = [
          'boolean',
          'char',
          'date',
          'datetime',
          'integer',
          'many2one',
          'selection'
        ]

        const type_get = () => {
          const meta = fields[name]
          if (['integer', 'float', 'monetary'].includes(meta.type))
            return 'measure'
          else if (GROUPABLE_TYPES.includes(meta.type)) {
            return 'row'
          } else {
            return undefined
          }
        }

        const type = type_in || type_get()

        // console.log(name, type, interval, widget, fields[name].type)
        // type in [ 'row', 'col', 'measure'] 或 undefind
        // interval in [ 'year', 'month', 'day']
        // widget in ['timesheet_uom', 'float_time'], 暂时不 处理 该属性
        // type="measure" widget="float_time"
        // type="measure" widget="timesheet_uom"
        // type="measure"

        const _name2_get = () => {
          if (['date', 'datetime'].includes(fields[name].type)) {
            return `${name}:${interval}`
          } else if (type === 'measure') {
            return name
            // if (!widget) {
            //   const group_operator = fields[name].group_operator || 'sum'
            //   return `${name}:${group_operator}`
            // } else {
            //   // to check widget
            //   // 'timesheet_uom', 'float_time'
            //   return `${name}:sum`
            // }
          } else {
            return name
          }
        }

        const name2 = _name2_get()

        return { name: name2, type }
      })

    const { row, col, measure } = fs.reduce(
      (acc, item) => {
        const { name, type = 'row' } = item
        if (!acc[type].length) acc[type].push(name)
        return acc
      },
      { row: [], col: [], measure: [] }
    )

    const row2 = row
    const col2 = col
    const measure2 = measure.length ? measure : ['__count']

    // // for debug
    // // const row2 = ['date_order:month', 'date_order:day']
    // const row2 = ['date_order:year', 'date_order:month']
    // const col2 = ['partner_id', 'company_id']

    return { rows: row2, cols: col2, measures: [...measure2] }
  }
}

export class Pivot extends Olap {
  constructor() {
    super()
  }

  static view_node({ action, views }) {
    return super.view_node({ action, views }, 'pivot')
  }

  static async _read_group(info, { domain, groupby, measures }) {
    const fields_all = this._fields_all(info)

    const fields = measures.map(item => {
      if (item === '__count') return item
      else {
        const meta = fields_all[item]
        const group_operator = meta.group_operator
        return group_operator ? `${item}:${group_operator}` : item
      }
    })

    // console.log(cp(fields_all), measures)
    const Model = this.Model(info)
    // const fields = measures
    const lazy = false
    const res = await Model.read_group({ domain, groupby, fields, lazy })
    return res
  }

  static async pivot_read_group_total(info, { search, measures }) {
    const domain1 = this._default_domain(info)
    // info TODO
    const domain2 = Search.to_domain(info, search)
    const domain = [...domain1, ...domain2]

    const groupby = []
    const res = await this._read_group(info, { domain, groupby, measures })
    const record = res[0]
    return { domain, record }
  }

  static _pivot_val_format(info, one, dim) {
    const fields_meta = this._fields_all(info)
    const fname = dim.split(':')[0]
    const meta = fields_meta[fname]
    const val = one[dim]
    if (!val) return [false, '未定义的']
    else if (meta.type === 'many2one') return val
    else if (meta.type === 'selection')
      return meta.find(item => item[0] === val) || [val, val]
    else return [val, val]
  }

  static async _pivot_read_group(info, payload = {}) {
    const { domain, measures, groupby } = payload

    const res = await this._read_group(info, { domain, groupby, measures })

    const ret = res.map(one => {
      const record = measures.reduce((acc, mea) => {
        return { ...acc, [mea]: one[mea] }
      }, {})
      const dims = groupby.reduce((acc, grp) => {
        return { ...acc, [grp]: this._pivot_val_format(info, one, grp) }
      }, {})
      return { dims, record, domain: one.__domain }
    })

    return ret
  }

  static async pivot_read_group_cross(info, payload = {}) {
    const { domain, measures, rows, cols } = payload
    const groupby_get = arr => {
      return arr.reduce(
        (acc, cur) => {
          acc[0].push(cur)
          acc[1].push([...acc[0]])
          return acc
        },
        [[], []]
      )[1]
    }

    const cols_groupbys = groupby_get(cols)
    const rows_groupbys1 = groupby_get(rows)

    const rows_groupbys = rows_groupbys1.reduce((acc, cur) => {
      acc = [...acc, cur, ...cols_groupbys.map(item => [...cur, ...item])]
      return acc
    }, [])

    const groupbys = [...cols_groupbys, ...rows_groupbys]

    let records = []

    for (const groupby of groupbys) {
      const kw = { domain, measures, groupby }
      const res = await this._pivot_read_group(info, kw)
      const res2 = res.map(one => {
        return { ...one, groupby }
      })
      records = [...records, ...res2]

      // console.log('read_group1', groupby, res)
      // if (callback) {
      //   callback({ records: records2 })
      // }
    }

    // console.log('read_group ok', groupbys)
    return records
  }

  static async pivot_read_group_slice(info, kwargs) {
    const { measures, domain, dim, another, is_row, parent_info } = kwargs

    const groupby_get = arr => {
      return arr.reduce(
        (acc, cur) => {
          acc[0].push(cur)
          acc[1].push([...acc[0]])
          return acc
        },
        [[], []]
      )[1]
    }

    const groupbys = [[], ...groupby_get(another)]

    let records = []

    for (const grp of groupbys) {
      const groupby = is_row ? [dim, ...grp] : [...grp, dim]

      const kw = { domain, measures, groupby }
      const res = await this._pivot_read_group(info, kw)
      const res2 = res.map(one => {
        return {
          ...one,
          groupby: is_row
            ? [...parent_info.groupby, dim, ...grp]
            : [...grp, ...parent_info.groupby, dim],

          dims: { ...one.dims, ...parent_info.dims }
        }
      })
      records = [...records, ...res2]

      // console.log('slice', cp(parent_info), res2)

      // if (callback) {
      //   callback({ records: records2 })
      // }
    }

    // console.log('read_group ok', groupbys)
    // console.log('slice', is_row, dim, groupbys)

    return records
  }

  static pivot_remove({ records, parent_info }) {
    const { dims } = parent_info
    const records2 = records.filter(one => {
      return !is_equ_obj_part(dims, one.dims) || is_equ_obj(dims, one.dims)
    })
    // console.log('pivot_remove', cp(dims), cp(records2), cp(records))
    return records2
  }

  static pivot_remove_has_other({ records, dim }) {
    const has = records.find(one => one.groupby.includes(dim)) ? true : false
    // console.log('pivot_remove_has_other', has)
    return has
  }

  static pivot_remove_row(info, kwargs) {
    // console.log('pivot_remove_row', info, kwargs)
    const { records, parent_info, dim, rows } = kwargs
    const records2 = this.pivot_remove({ records, parent_info })
    const has_other = this.pivot_remove_has_other({ records: records2, dim })
    const rows2 = has_other ? rows : rows.filter(item => item !== dim)
    return { rows: rows2, records: records2 }
  }

  static pivot_remove_col(info, kwargs) {
    // console.log('pivot_remove_col', info, kwargs)
    const { records, parent_info, dim, cols } = kwargs
    const records2 = this.pivot_remove({ records, parent_info })
    const has_other = this.pivot_remove_has_other({ records: records2, dim })
    const cols2 = has_other ? cols : cols.filter(item => item !== dim)
    return { cols: cols2, records: records2 }
  }

  static async load_data_row(info, kwargs) {
    // console.log('load_data_row', info, kwargs)
    const { callback, records, parent_info } = kwargs
    const { dim, rows, cols, measures, domain } = kwargs
    const kw2 = { measures, domain, dim, another: cols, is_row: true }
    const kw = { ...kw2, parent_info }
    const records_all = await this.pivot_read_group_slice(info, kw)
    const records2 = _pivot_merge_records(records, records_all)
    const rows2 = rows.includes(dim) ? rows : [...rows, dim]

    if (callback) {
      callback({ rows: rows2, records: records2 })
    }

    return { rows: rows2, records: records2 }
  }

  static async load_data_col(info, kwargs) {
    // console.log('load_data_col', info, kwargs)
    const { callback, records, parent_info } = kwargs
    const { dim, rows, cols, measures, domain } = kwargs
    const kw2 = { measures, domain, dim, another: rows, is_row: false }
    const kw = { ...kw2, parent_info }
    const records_all = await this.pivot_read_group_slice(info, kw)
    const records2 = _pivot_merge_records(records, records_all)
    const cols2 = cols.includes(dim) ? cols : [...cols, dim]

    if (callback) {
      callback({ cols: cols2, records: records2 })
    }

    return { cols: cols2, records: records2 }
  }

  static async load_data(info, kwargs) {
    // console.log(info, kwargs)
    const { callback, rows, cols, measures, search } = kwargs
    const total2 = await this.pivot_read_group_total(info, { search, measures })
    const { domain, record: total } = total2
    const total_records = [
      { groupby: [], dims: {}, domain: domain, record: total }
    ]

    const kw = { domain, measures, cols, rows }
    const non_total_records = await this.pivot_read_group_cross(info, kw)
    const records_all = [...total_records, ...non_total_records]
    const records2 = records_all
    if (callback) {
      callback({ records: records2 })
    }

    return { records: records2 }
  }
}

export class Graph extends Olap {
  constructor() {
    super()
  }

  static view_node({ action, views }) {
    return super.view_node({ action, views }, 'graph')
  }

  static default_pivot_data(info) {
    // <graph string="Account Statistics" type="bar" sample="1">
    // <field name="date"/>
    // <field name="balance_start" operator="+"/>
    // <field name="balance_end" operator="+"/>
    // </graph>

    return super.default_pivot_data(info)
  }

  static async load_data(info, kwargs) {
    // console.log('graph loaddata', info, kwargs)
    const { rows, cols, measures, search } = kwargs

    const domain1 = this._default_domain(info)
    // info TODO
    const domain2 = Search.to_domain(info, search)
    const domain = [...domain1, ...domain2]

    const groupby = [...rows, ...cols]
    const fields = [...rows, ...cols, ...measures].map(
      item => item.split(':')[0]
    )

    const Model = this.Model(info).with_context({ fill_temporal: true })
    const lazy = false
    const records = await Model.read_group({ domain, groupby, fields, lazy })

    // console.log('graph loaddata2', records)

    return { records }
  }
}
