import { computed, toRaw } from 'vue'

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

  const options = computed(() => {
    const info = toRaw(props.fieldInfo)
    const ops = info.selection || []

    return ops.map(item => {
      return {
        label: item[1],
        value: item[0]
      }
    })
  })

  return { ...fieldData, dVal, options, onChange }
}
