export default {
  _field_check_is_pivot(name, meta) {
    const { store } = meta
    return name !== 'id' && store === true
  },

  _field_check_is_measure(name, meta, additionalMeasures = []) {
    const { type } = meta
    const is_pivot = this._field_check_is_pivot(name, meta)
    if (!is_pivot) return is_pivot
    return (
      ['integer', 'float', 'monetary'].includes(type) ||
      additionalMeasures.includes(name)
    )
  },

  _field_check_is_groupby(name, meta) {
    const { type } = meta

    const is_pivot = this._field_check_is_pivot(name, meta)
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
  },

  _fields_for_groupby(fields) {
    return Object.keys(fields).reduce((acc, name) => {
      const field = fields[name]
      if (this._field_check_is_groupby(name, field)) acc[name] = field
      return acc
    }, {})
  },

  _fields_for_measure(fields) {
    const additionalMeasures = []
    return Object.keys(fields).reduce((acc, name) => {
      const field = fields[name]
      if (this._field_check_is_measure(name, field, additionalMeasures))
        acc[name] = field
      return acc
    }, {})
  },

  fields_for_measure(fields) {
    return this.sort_by_string(this._fields_for_measure(fields))
  },

  fields_for_groupby(fields) {
    return this.sort_by_string(this._fields_for_groupby(fields))
  },

  measures({ fields, measures }) {
    const fs = this._fields_for_measure(fields)
    const ms = Object.keys(fs)
      .map(fld => {
        const meta = fs[fld]
        return {
          name: fld,
          string: meta.string,
          type: meta.type,
          checked: measures.includes(fld)
        }
      })
      .sort((a, b) => a.string.localeCompare(b.string, 'en-US'))
    return [
      ...ms,
      { divider: 1 },
      {
        name: '__count',
        string: '个数',
        checked: measures.includes('__count')
      }
    ]
  },

  groupbys({ fields, rows, columns }) {
    const groupbys = this._fields_for_groupby(fields)
    const to_filter = [...rows, ...columns]
    const groupbys2 = Object.keys(groupbys)
      .map(fld => {
        const meta = groupbys[fld]

        const get_children = () => {
          if (!['date', 'datetime'].includes(meta.type)) return {}

          const dd = `${fld}:day`
          const wk = `${fld}:week`
          const mm = `${fld}:month`
          const qt = `${fld}:quarter`
          const yy = `${fld}:year`

          return {
            children: [
              { name: dd, string: '天', disabled: to_filter.includes(dd) },
              { name: wk, string: '周', disabled: to_filter.includes(wk) },
              { name: mm, string: '月', disabled: to_filter.includes(mm) },
              { name: qt, string: '季', disabled: to_filter.includes(qt) },
              { name: yy, string: '年', disabled: to_filter.includes(yy) }
            ]
          }
        }

        const res = {
          type: meta.type,
          string: meta.string,
          name: fld,
          disabled: to_filter.includes(fld),
          ...get_children()
        }

        return res
      })
      .sort((a, b) => a.string.localeCompare(b.string, 'en-US'))

    return groupbys2
  },

  _value_string({ fields, field, record }) {
    const f2 = field.split(':')[0]
    const meta = fields[f2]
    const str = ['many2one', 'selection'].includes(meta.type)
      ? record[`${field}__name`]
      : record[field]

    return str || '未定义的'
  },

  datadict(kwargs) {
    const { datalist, measures } = kwargs

    const get_keys = tree => {
      const { info, children } = tree
      const childs = children.reduce((acc, cur) => {
        return [...acc, ...get_keys(cur)]
      }, [])
      return [info, ...childs]
    }

    const rtree = this.rowtree(kwargs)
    const ctree = this.coltree(kwargs)
    const rowkeys = get_keys(rtree)
    const colkeys = get_keys(ctree)

    return rowkeys.reduce((acc, row) => {
      const { key: rowkey, search: rowsaerch } = row
      const { filter: rowflt } = rowsaerch

      acc[rowkey] = colkeys.reduce((acc2, col) => {
        const { key: colkey, search: colsearch } = col
        const { filter: colflt } = colsearch
        const filter = { ...rowflt, ...colflt }
        const one = this.search_one({ datalist, filter })
        const one2 = Object.keys(one).reduce((acc3, fld) => {
          const one3 = measures.includes(fld) ? { [fld]: one[fld] } : {}
          return { ...acc3, ...one3 }
        }, {})
        return { ...acc2, [colkey]: one2 }
      }, {})

      return acc
    }, {})
  },

  _axis_tree(kwargs) {
    const { fields, datalist, dimensions } = kwargs

    const get_children = (payload = {}) => {
      const { index = 0, parent = {} } = payload
      if (index >= dimensions.length) return { next: null, children: [] }
      const field = dimensions[index]

      const groupby2 = [...(parent.groupby || []), field]
      const kw2 = { datalist, filter: parent.filter || {}, groupby: groupby2 }
      const records = this.search(kw2)

      if (!records.length) return { next: field, children: [] }
      const meta = fields[field.split(':')[0]]

      const children = records.map((item, data_index) => {
        const pkey = parent.key
        const key_list = [...(pkey ? [pkey] : []), `${field},${item[field]}`]
        const key = key_list.join('-')
        const filter = { ...(parent.filter || {}), [field]: item[field] }

        const { next, children: my_children } = get_children({
          index: index + 1,
          parent: { key, filter, groupby: groupby2 }
        })

        const info = {
          label: this._value_string({ field, record: item, fields }),
          label2: meta.string,
          seq: data_index,
          search: { filter, groupby: groupby2, domain: item.__domain }
        }
        return { info: { ...info, key, field, next }, children: my_children }
      })

      return { next: field, children }
    }

    const get_total = () => {
      const { next, children } = get_children()
      const domain =
        datalist && datalist.length ? datalist[0].records[0].__domain : []
      const search = { filter: {}, groupby: [], domain }
      const info = { key: '__total', label: '合计', field: '', seq: 0 }
      return {
        info: { ...info, next, search },
        children
      }
    }

    const total = get_total()
    return total
  },

  rowtree(kwargs) {
    const { fields, datalist, rows } = kwargs
    return this._axis_tree({ fields, datalist, dimensions: rows })
  },

  coltree(kwargs) {
    const { fields, datalist, columns } = kwargs
    return this._axis_tree({ fields, datalist, dimensions: columns })
  },

  sort_by_string(dict) {
    return Object.keys(dict)
      .map(item => {
        return { field: item, string: dict[item].string }
      })
      .sort((a, b) => a.string.localeCompare(b.string, 'en-US'))
      .reduce((acc, cur) => {
        return { ...acc, [cur.field]: dict[cur.field] }
      }, {})
  },

  check_object_equ(objA, objB) {
    // 暂时 因为  key 的顺序 一致, 因此可以直接比较
    // 完整 比较, 需要 先排序 TBD
    // console.log('xxxx, check_object_equ:', objA, objB)

    return Object.entries(objA).toString() === Object.entries(objB).toString()
  },

  check_array_equ(listA, listB) {
    let result =
      listA.length === listB.length &&
      listA.every(a => listB.some(b => a === b)) &&
      listB.every(_b => listA.some(_a => _a === _b))

    return result
  },

  search_one(kwargs) {
    const { datalist, filter } = kwargs
    const groupby = Object.keys(filter)
    const records = this.search({ datalist, filter, groupby })
    return records.length ? records[0] : {}
  },

  search(kwargs) {
    const { datalist = [], filter = {}, groupby = [] } = kwargs
    const one = datalist.find(item =>
      this.check_array_equ(item.groupby, groupby)
    )

    if (!one) return []

    const _get_bool = (flt, item) =>
      Object.keys(flt).reduce((acc, cur) => {
        return acc && flt[cur] === item[cur]
      }, true)

    const _get_bool2 = (flt, item) =>
      Object.keys(flt).reduce((acc, cur) => {
        return acc && flt[cur].includes(item[cur])
      }, true)

    return one.records.filter(item => {
      const res = _get_bool(filter, item)
      const res2 = _get_bool2(one.filter || {}, item)
      return res && res2
    })
  }
}
