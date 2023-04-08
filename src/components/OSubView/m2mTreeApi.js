import { computed, toRaw } from 'vue'
import api from '@/odoorpc'

export function useM2mTree(props) {
  const treeview = computed(() => {
    if (props.relationInfo) {
      const rel = api.env.relation(props.relationInfo)
      return rel.tree
    }
    return null
  })

  const treeInfo = computed(() => {
    return {
      parentFormInfo: toRaw(props.parentFormInfo),
      relationInfo: toRaw(props.relationInfo),
      records: toRaw(props.records),
      // record: toRaw(props.record),
      // values: toRaw(state.values),
      editable: !props.readonly
    }
  })

  function fields2cols(fields) {
    const cols = Object.keys(fields).map(fld => {
      const meta = fields[fld] || {}
      return {
        dataIndex: fld,
        key: fld,
        title: meta.string,
        // ellipsis: 'ellipsis' in meta ? meta.ellipsis : true,
        // align: 'center',
        width: meta.web_col_width,
        _widget: meta.widget,
        _meta: meta
      }
    })

    return cols
  }

  const columns = computed(() => {
    if (treeview.value) {
      const flds = treeview.value.get_columns(toRaw(treeInfo.value))
      const cols = fields2cols(flds)
      const cols2 = cols.filter(item => item._widget !== 'handle')
      return cols2
    } else {
      return []
    }
  })

  return { columns }
}
