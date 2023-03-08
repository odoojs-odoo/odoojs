import { computed } from 'vue'

import { useField } from './FieldApi'

export function useFNumber(props, ctx) {
  const { dVal: valDisp, ...fieldData } = useField(props, ctx)

  const dVal = computed(() => {
    if (props.fieldInfo.widget === 'monetary') {
      const value2 = valDisp.value || 0.0
      const value3 = value2.toFixed(2)
      return value3
    } else {
      return valDisp
    }
  })

  return { ...fieldData, dVal }
}
