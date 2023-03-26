import { computed, toRaw } from 'vue'

import { useField } from './FieldApi'

import { useL10n } from '../tools/useL10n'

export function useFSelection(props, ctx) {
  const { dVal: valDisp, onChange, ...fieldData } = useField(props, ctx)
  const { tr } = useL10n()

  const dVal = computed(() => {
    const value = valDisp.value
    const selection = props.fieldInfo.selection || []

    const get_label = v => {
      const elm = selection.find(item => item[0] === v)
      return elm ? tr(elm[1]) : ''
    }

    return value ? get_label(value) : ''
  })

  const options = computed(() => {
    const info = toRaw(props.fieldInfo)
    const ops = info.selection || []

    return ops.map(item => {
      return {
        label: tr(item[1]),
        value: item[0]
      }
    })
  })

  return { ...fieldData, dVal, options, onChange }
}
