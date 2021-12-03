// const cp = item => JSON.parse(JSON.stringify(item))

export default {
  title_slots(kwargs) {
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

    const cols = this.columns3(kwargs)
    const slots2 = _get_slots(cols)

    return [...slots2]
  },

  columns3(kwargs) {
    const { coltree } = kwargs

    if (!coltree) return []

    const children_length = childs => {
      const len = childs.length
      return len === 1 ? children_length(childs[0].children) : len
    }

    const cols_list = () => {
      const { info: info0, children } = coltree
      const { key, seq, search } = info0
      const info = { key, seq, search }
      const len = children_length(children)
      const total = len < 2 ? [] : [{ children: [], info }]
      return [coltree, ...total]
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
      const { key, search, seq } = info
      if (!deep) return []

      const children = get_total(deep - 1, info)
      return [{ deep: deep - 1, info: { key, search, seq }, children }]
    }

    const patch_total = (cols, deep) => {
      return cols.map(item => {
        const children =
          item.children.length && deep
            ? patch_total(item.children, deep - 1)
            : get_total(deep, item.info)

        return { deep, ...item, children }
      })
    }

    const cols = cols_list()
    const deep_max = get_deep(cols)
    const cols2 = patch_total(cols, deep_max)

    return cols2
  },

  columns(kwargs) {
    const { measures } = kwargs

    // console.log(cp(kwargs))

    const _get_measures = key => {
      return measures
        .filter(item => item.checked)
        .map(item => {
          const dataIndex = [...(key ? [key] : []), item.name].join('-')
          const title = item.string
          return { dataIndex, key: dataIndex, measure: item.name, title }
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

    const _set_slot = childs => {
      return childs.map(item => {
        const item2 = { ...item }
        const { info } = item
        if (info.label) item2.slots = { title: info.key }
        return { ...item2, children: _set_slot(item.children) }
      })
    }

    const cols1 = this.columns3(kwargs)
    const cols2 = _set_slot(cols1)
    const cols3 = _set_measure(cols2)

    const rowFix = {
      dataIndex: '__rowkey',
      key: '_row_key',
      scopedSlots: { customRender: 'row-header' }
    }

    return [rowFix, ...cols3]
  },

  table_data(kwargs) {
    const { rowtree, datadict } = kwargs

    if (!rowtree) return []

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

    const rowtree2 = set_row_deep(rowtree)
    const rowkeys = get_keys(rowtree2)

    const arr = rowkeys.map(row => {
      const rd = datadict[row.key]
      const rd2 = Object.keys(rd).reduce((acc, ck) => {
        const celldata = rd[ck]
        const celldata2 = Object.keys(celldata).reduce((acc2, fld) => {
          return { ...acc2, [`${ck}-${fld}`]: celldata[fld] }
        }, {})

        return { ...acc, ...celldata2 }
      }, {})
      return { __rowkey: row.key, __rowinfo: { ...row }, ...rd2 }
    })

    return arr
  }
}
