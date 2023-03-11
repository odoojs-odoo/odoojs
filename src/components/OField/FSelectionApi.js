import { computed } from 'vue'

import { useField } from './FieldApi'

import { useL10n } from '../tools/useL10n'

export function useFSelection(props, ctx) {
  const { dVal: valDisp, onChange, ...fieldData } = useField(props, ctx)

  const dVal = computed(() => {
    const value = valDisp.value
    const selection = props.fieldInfo.selection || []

    const { tr } = useL10n()

    const get_label = v => {
      const elm = selection.find(item => item[0] === v)
      return elm ? tr(elm[1]) : ''
    }

    return value ? get_label(value) : ''
  })

  return { ...fieldData, dVal, onChange }
}
