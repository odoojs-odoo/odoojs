import { computed, toRaw } from 'vue'
import api from '@/odoorpc'

import { useTreeColumns } from '@/components/tools/treeColumns'

export function useO2mTree(props) {
  const treeview = computed(() => {
    if (props.relationInfo) {
      const rel = api.env.relation(props.relationInfo)

      return rel.tree
    }
    return null
  })

  // const fields = computed(() => {
  //   if (treeview.value) {
  //     return treeview.value.fields
  //   }
  //   return {}
  // })
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
  const { computedColumns } = useTreeColumns()
  const columns = computed(() => {
    function fields_filter(treeview, fields) {
      return Object.keys(fields).reduce((acc, fld) => {
        const meta = toRaw(fields[fld])
        const inv = treeview.check_invisible(meta, treeInfo.value)

        if (!inv) {
          acc[fld] = meta
        }
        return acc
      }, {})
    }

    if (treeview.value) {
      const fields = toRaw(treeview.value.fields) || {}
      const fields2 = fields_filter(treeview.value, fields)
      const context = treeview.value.context_get(props.parentFormInfo)
      const cols = computedColumns(fields2, context)
      const cols2 = cols.filter(item => item._widget !== 'handle')
      return cols2
    } else {
      return []
    }
  })

  return { columns }
}
