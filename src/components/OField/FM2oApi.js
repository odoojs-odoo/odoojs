import { onMounted, computed, watch, ref } from 'vue'

import { useField } from './FieldApi'
import api from '@/odoorpc'

function useFormApi() {
  function loadSelectOptions(formInfo, fieldInfo) {
    const recordMerged = { ...formInfo.record, ...formInfo.values }

    const relation = api.env.relation(fieldInfo)
    return relation.load_select_options({ record: recordMerged })
  }
  return { loadSelectOptions }
}
export function useFM2o(props, ctx) {
  const { dVal: valDisp, readonly, ...fieldData } = useField(props, ctx)

  const dVal = computed(() => (valDisp.value || [0, null])[1])
  const options = ref([])

  watch(
    () => readonly.value,
    async newVal => {
      if (!newVal) {
        const { loadSelectOptions } = useFormApi()
        const ops = await loadSelectOptions(props.formInfo, props.fieldInfo)

        const me = ops.filter(item => item[0] === (valDisp.value || [0, ''])[0])
        const ops2 = me.length
          ? ops
          : [...(valDisp.value ? [valDisp.value] : []), ...ops]

        options.value = ops2
      }
    },
    { immediate: true }
  )

  onMounted(async () => {
    // console.log(props.info.fieldInfo)
    // console.log(props.info.fieldInfo.name)
  })

  return { ...fieldData, readonly, dVal, options }
}
