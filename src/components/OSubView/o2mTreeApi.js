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

  const { computedColumns } = useTreeColumns()
  const columns = computed(() => {
    function fields_filter(treeview, fields) {
      return Object.keys(fields).reduce((acc, fld) => {
        const meta = fields[fld]
        const inv = treeview.check_invisible(meta)

        if (!inv) {
          acc[fld] = meta
        }
        return acc
      }, {})
    }

    if (treeview.value) {
      const fields = treeview.value.fields || {}
      const fields2 = fields_filter(treeview.value, fields)
      // console.log(fields2)

      const context = treeview.value.context_get(props.parentFormInfo)
      return computedColumns(fields2, context)
    } else {
      return []
    }
  })

  return { columns }
}
