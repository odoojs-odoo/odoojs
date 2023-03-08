import { computed } from 'vue'

import { useField } from './FieldApi'

export function useFSelection(props, ctx) {
  const { dVal: valDisp, onChange, ...fieldData } = useField(props, ctx)

  const dVal = computed(() => {
    const value = valDisp.value
    const selection = props.fieldInfo.selection || []

    const get_label = v => {
      const elm = selection.find(item => item[0] === v)
      return elm ? elm[1] : ''
    }

    return value ? get_label(value) : ''
  })

  return { ...fieldData, dVal, onChange }
}
