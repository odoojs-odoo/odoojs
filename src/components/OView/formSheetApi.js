import { computed } from 'vue'
import api from '@/odoorpc'

import { useL10n } from '@/components/tools/useL10n'

export function useFormSheet(props) {
  const { tr } = useL10n()

  function html_get(item) {
    if (typeof item !== 'function') {
      if (typeof item === 'object') {
        return item.string
      } else {
        return item
      }
    } else {
      return item({
        record: { ...props.formInfo.record, ...props.formInfo.values }
      })
    }
  }

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
    if (!formview) return { children: {} }
    return formview.view_sheet()
  })

  function getInvisible(fieldInfo) {
    // if (!fieldInfo.invisible) return undefined
    // if (typeof fieldInfo.invisible !== 'function') return fieldInfo.invisible

    const formview = formview_get()
    if (!formview) return undefined
    return formview.check_invisible(fieldInfo, props.formInfo)
  }

  function getLabel(fieldInfo) {
    if (!fieldInfo.string) return undefined
    if (typeof fieldInfo.string !== 'function') return tr(fieldInfo.string)
    const formview = formview_get()
    if (!formview) return undefined
    const label = formview.get_string(fieldInfo, props.formInfo)

    return tr(label)
  }

  function getRules(fieldInfo) {
    // console.log([fieldInfo.name, fieldInfo.required], fieldInfo)
    function required_get() {
      if (!props.formInfo.editable) return undefined
      if (!fieldInfo.required) return undefined
      if (typeof fieldInfo.required !== 'function') return fieldInfo.required

      const formview = formview_get()
      if (!formview) return undefined
      const required = formview.check_required(fieldInfo, props.formInfo)
      return required
    }

    const required = required_get()
    if (!required) return undefined
    return [{ required: true, message: `请输入${tr(fieldInfo.string)}!` }]
  }

  return { sheet, html_get, getInvisible, getLabel, getRules }
}
