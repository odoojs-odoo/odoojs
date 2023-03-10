import { onMounted, computed, watch, ref } from 'vue'

import { useField } from './FieldApi'
import api from '@/odoorpc'

function useFormApi() {
  function loadSelectOptions(formInfo, fieldInfo, limit) {
    const recordMerged = { ...formInfo.record, ...formInfo.values }

    const relation = api.env.relation(fieldInfo)
    return relation.load_select_options({ record: recordMerged, limit })
  }
  return { loadSelectOptions }
}
export function useFM2o(props, ctx) {
  const {
    dVal: valDisp,
    readonly,
    onChange,
    ...fieldData
  } = useField(props, ctx)

  const dVal = computed(() => (valDisp.value || [0, null])[1])

  const optionsRaw = ref([])

  const { loadSelectOptions } = useFormApi()

  const options = computed(() => {
    const ops = optionsRaw.value

    const me = ops.filter(item => item[0] === (valDisp.value || [0, ''])[0])
    const ops2 = me.length
      ? ops
      : [...(valDisp.value ? [valDisp.value] : []), ...ops]

    return ops2
  })

  watch(
    () => readonly.value,
    async newVal => {
      if (!newVal) {
        // 需要 判断 是否异步加载.
        // console.log('load options first', props.fieldName, valDisp.value)
        // const ops = valDisp.value ? [[...valDisp.value]] : []
        // options.value = ops
        const ops = await loadSelectOptions(props.formInfo, props.fieldInfo, 8)
        optionsRaw.value = ops
      }
    },
    { immediate: true }
  )

  onMounted(async () => {
    // console.log(props.info.fieldInfo)
    // console.log(props.info.fieldInfo.name)
  })

  const moreRecords = ref([])
  const moreVisible = ref(false)

  async function searchMore() {
    const ops = await loadSelectOptions(props.formInfo, props.fieldInfo, 0)
    // console.log('searchMore', ops)
    moreRecords.value = ops.map(item => {
      return { id: item[0], display_name: item[1] }
    })
    moreVisible.value = true
  }

  const moreColumns = ref([
    {
      dataIndex: 'display_name',
      key: 'display_name',
      title: '名称',
      align: 'center'
    }
  ])

  function onMoreSelect(value) {
    // console.log('onMoreSelect ', value)
    onChange(value)
    moreVisible.value = false
  }

  return {
    ...fieldData,
    readonly,
    onChange,
    dVal,
    options,
    searchMore,
    moreVisible,
    moreRecords,
    moreColumns,
    onMoreSelect
  }
}
