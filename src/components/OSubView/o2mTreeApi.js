import { computed } from 'vue'
import api from '@/odoorpc'

import { useTreeColumns } from '@/components/tools/treeColumns'

export function useO2mTree(props) {
  const treeview = computed(() => {
    if (props.relationInfo) {
      const rel = api.env.relation(props.relationInfo, {
        parent: props.parentViewInfo
      })

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
  const columns = computed(() => computedColumns(fields.value))

  return { columns }
}
