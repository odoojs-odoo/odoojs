// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

const is_equ_array = (listA, listB) => {
  let result =
    listA.length === listB.length &&
    listA.every(a => listB.some(b => a === b)) &&
    listB.every(_b => listA.some(_a => _a === _b))

  return result
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

export default {
  _axis_tree({ fields, records, dimensions }) {
    const get_children = (payload = {}) => {
      const { index = 0, parent = {} } = payload
      if (index >= dimensions.length) return { next: null, children: [] }
      const dim = dimensions[index]

      // console.log('get_children', cp(parent), dim)

      const childs = Object.values(records).filter(
        item =>
          is_equ_array(item.groupby, [...(parent.groupby || []), dim]) &&
          is_equ_obj_part(parent.dims || {}, item.dims)
      )

      if (!childs.length) return { next: dim, children: [] }

      const meta = fields[dim.split(':')[0]]
      const children = childs.map((chd, data_index) => {
        const { dims, groupby, domain } = chd

        const key_list = Object.keys(dims).map(it => {
          return `${it},${dims[it][0]}`
        })
        const key = key_list.join('-')

        const info2 = { key, dim, dims, groupby, domain }
        const info = {
          ...info2,
          seq: data_index,
          label: dims[dim][1],
          label2: meta.string
        }

        const { next, children: my_children } = get_children({
          index: index + 1,
          parent: { groupby, dims }
        })
        return { info: { ...info, next }, children: my_children }
      })
      return { next: dim, children }
    }

    const get_total = () => {
      const { next, children } = get_children()
      const total_record = records.find(item => !item.groupby.length) || {}
      const { dims = {}, groupby = [], domain = [] } = total_record
      const info2 = { key: '__total', dim: '', dims, groupby, domain }
      const info = { ...info2, seq: 0, label: '合计' }
      return { info: { ...info, next }, children }
    }

    const total = get_total()
    // console.log('tree,', cp(total))

    return total
  },

  rowstree({ fields, rows, records }) {
    return this._axis_tree({ fields, records, dimensions: rows })
  },

  colstree({ fields, cols, records }) {
    return this._axis_tree({ fields, records, dimensions: cols })
  },

  _columns3(tree) {
    const children_length = childs => {
      const len = childs.length
      return len === 1 ? children_length(childs[0].children) : len
    }

    const cols_list = () => {
      const { info: info0, children } = tree
      const { key, seq, domain, dim, dims, groupby } = info0
      const info = { key, seq, domain, dim, dims, groupby }
      const len = children_length(children)
      const total = len < 2 ? [] : [{ info, children: [] }]
      return [tree, ...total]
    }

    const get_deep = (list, deep = -1) => {
      if (!list.length) return deep
      let deep_max = deep
      list.forEach(item => {
        const child_deep = get_deep(item.children, deep + 1)
        if (child_deep > deep_max) deep_max = child_deep
      })
      return deep_max
    }

    const get_total = (deep, info = {}) => {
      const { key, domain, seq, dim, dims, groupby } = info
      if (!deep) return []

      const children = get_total(deep - 1, info)
      const info2 = { key, domain, seq, dim, dims, groupby }
      return [{ deep: deep - 1, info: info2, children }]
    }

    const patch_total = (columns, deep) => {
      return columns.map(item => {
        const children =
          item.children.length && deep
            ? patch_total(item.children, deep - 1)
            : get_total(deep, item.info)

        return { deep, ...item, children }
      })
    }

    const columns = cols_list()
    const deep_max = get_deep(columns)
    const columns2 = patch_total(columns, deep_max)
    return columns2
  },

  _columns({ columns, fields, measures }) {
    const _set_slot = childs => {
      return childs.map(item => {
        const item2 = { ...item }
        const { info } = item
        if (info.label) item2.slots = { title: info.key }
        return { ...item2, children: _set_slot(item.children) }
      })
    }

    const _get_measures = key => {
      return measures.map(item => {
        const meta =
          item === '__count' ? { string: '个数' } : fields[item] || {}

        const dataIndex = [...(key ? [key] : []), item].join('-')
        const title = meta.string
        return { dataIndex, key: dataIndex, measure: item, title }
      })
    }

    const _set_measure = childs => {
      return childs.map(item => {
        const item2 = { ...item }
        const { deep, children, info } = item

        const children2 =
          !deep && !children.length
            ? _get_measures(info.key)
            : _set_measure(children)

        return { ...item2, children: children2 }
      })
    }

    const cols2 = _set_slot(columns)
    const cols3 = _set_measure(cols2)
    const rowFix = {
      dataIndex: '__rowkey',
      key: '_row_key',
      scopedSlots: { customRender: 'row-header' }
    }
    return [rowFix, ...cols3]
  },

  columnsKeys({ fields, cols, records }) {
    const tree = this.colstree({ fields, cols, records })
    const columns = this._columns3(tree)

    // console.log('columnsKeys  ', tree, columns)

    const get_keys = columns => {
      return columns.reduce((acc, col) => {
        if (col.deep === 0) {
          acc.push(col.info)
        } else {
          acc = [...acc, ...get_keys(col.children || [])]
        }
        return acc
      }, [])
    }

    const infos = get_keys(columns)
    // console.log('cols:', tree, columns, infos)
    return infos
  },

  _rows({ fields, rows, cols, measures, records }) {
    const tree = this.rowstree({ fields, rows, records })

    // console.log('_rows', rows, cp(tree), records)

    const set_row_deep = (tree, deep = 0) => {
      const children = tree.children.map(ch => set_row_deep(ch, deep + 1))
      return { deep, ...tree, children }
    }

    const get_keys = tree => {
      const { deep, info, children } = tree
      const childs = children.reduce((acc, cur) => {
        return [...acc, ...get_keys(cur)]
      }, [])
      const icon = childs.length ? 'minus' : 'plus'
      const open = childs.length

      return [{ deep, icon, open, ...info }, ...childs]
    }

    const tree2 = set_row_deep(tree)
    const rowkeys = get_keys(tree2)
    const colkeys = this.columnsKeys({ fields, cols, records })

    // console.log('rows tree', rows, tree2, rowkeys, colkeys)

    const arr = rowkeys.map(row => {
      // const rk = row.key
      // console.log('rows data row:', cp(row.dims))

      const rowdata = colkeys.reduce((acc, col) => {
        const ck = col.key
        // console.log('rows data col:', cp(col.dims))
        const one_get = () => {
          return (
            records.find(item => {
              return is_equ_obj({ ...row.dims, ...col.dims }, item.dims)
            }) || {}
          )
        }

        const one = one_get()
        // console.log('rows data col:', rk, ck, cp(one), cp(records))

        const ms = measures.reduce((acc2, meas) => {
          // console.log('rows data meas:', meas)
          return { ...acc2, [`${ck}-${meas}`]: (one.record || {})[meas] }
        }, {})

        return { ...acc, ...ms }
      }, {})

      return { __rowkey: row.key, __rowinfo: { ...row }, ...rowdata }
    })

    // console.log('rows tree', rows, tree2, rowkeys, arr)
    return arr
  },

  _title_slots({ fields, cols, records }) {
    const tree = this.colstree({ fields, cols, records })
    const columns = this._columns3(tree)

    const _get_slots = cols => {
      return cols.reduce((acc, cur) => {
        const title = cur.info.label
        if (title) {
          const has_child = cur.children.reduce((acc2, cur2) => {
            return acc2 + (cur2.info.label ? 1 : 0)
          }, 0)

          const icon = has_child ? 'minus' : 'plus'
          const info = { ...cur.info, title, icon, open: has_child }
          acc = [...acc, info, ..._get_slots(cur.children)]
        }

        return acc
      }, [])
    }

    const slots2 = _get_slots(columns)
    return slots2
  },

  tableSlots({ fields, cols, records }) {
    return this._title_slots({ fields, cols, records })
  },

  tableColumns({ fields, cols, measures, records }) {
    const tree = this.colstree({ fields, cols, records })
    const columns = this._columns3(tree)
    const columns2 = this._columns({ columns, fields, measures })
    // console.log('cols:', cp(tree), cp(columns), cp(columns2))
    // console.log('cols2:', cols, cp(records))
    return columns2
  },

  tableData({ fields, rows, cols, measures, records }) {
    const tree = this._rows({ fields, rows, cols, measures, records })
    return tree
  }
}

// old 代码 暂存。 应该没有用了
// datadict(kwargs) {
//   const { datalist, measures } = kwargs

//   const get_keys = tree => {
//     const { info, children } = tree
//     const childs = children.reduce((acc, cur) => {
//       return [...acc, ...get_keys(cur)]
//     }, [])
//     return [info, ...childs]
//   }

//   const rtree = this.rowtree(kwargs)
//   const ctree = this.coltree(kwargs)
//   const rowkeys = get_keys(rtree)
//   const colkeys = get_keys(ctree)

//   return rowkeys.reduce((acc, row) => {
//     const { key: rowkey, search: rowsaerch } = row
//     const { filter: rowflt } = rowsaerch

//     acc[rowkey] = colkeys.reduce((acc2, col) => {
//       const { key: colkey, search: colsearch } = col
//       const { filter: colflt } = colsearch
//       const filter = { ...rowflt, ...colflt }
//       const one = this.search_one({ datalist, filter })
//       const one2 = Object.keys(one).reduce((acc3, fld) => {
//         const one3 = measures.includes(fld) ? { [fld]: one[fld] } : {}
//         return { ...acc3, ...one3 }
//       }, {})
//       return { ...acc2, [colkey]: one2 }
//     }, {})

//     return acc
//   }, {})
// }
