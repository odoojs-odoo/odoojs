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

  const fields = computed(() => {
    if (treeview.value) {
      return treeview.value.fields
    }
    return {}
  })

  const { computedColumns } = useTreeColumns()
  const columns = computed(() => {
    if (treeview.value) {
      const context = treeview.value.context_get(props.parentFormInfo)
      return computedColumns(fields.value, context)
    } else {
      return []
    }
  })

  return { columns }
}
