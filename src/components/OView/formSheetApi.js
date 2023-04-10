import { computed } from 'vue'
import api from '@/odoorpc'

export function useFormSheet(props) {
  function formview_get() {
    const formInfo = props.formInfo
    if (formInfo.viewInfo) {
      const { fields, viewInfo } = formInfo
      const { action } = viewInfo
      if (!action) return undefined
      return api.env.formview(action, { fields })
    } else if (formInfo.relationInfo) {
      const info = formInfo.relationInfo
      const rel = api.env.relation(info)
      return rel.form
    } else {
      return undefined
    }
  }

  const sheet = computed(() => {
    const formview = formview_get()
    if (!formview) return { title: {}, children: {} }

    return formview.view_sheet(props.formInfo)
  })

  return { sheet }
}
