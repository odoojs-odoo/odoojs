import { computed, watch, ref } from 'vue'

import { useField } from './FieldApi'
import api from '@/odoorpc'

function get_recordMerged(formInfo) {
  const formview = api.env.formview(formInfo.viewInfo, {
    fields: formInfo.fields
  })

  return formview._get_values_for_modifiers(formInfo.record, formInfo.values)
}

export function useFM2o(props, ctx) {
  const {
    dVal: valDisp,
    readonly,
    onChange,
    ...fieldData
  } = useField(props, ctx)

  function loadSelectOptions(kw = {}) {
    // const recordMerged = { ...props.formInfo.record, ...props.formInfo.values }
    const recordMerged = get_recordMerged(props.formInfo)

    const relation = api.env.relation(props.fieldInfo)
    return relation.load_select_options({ record: recordMerged, ...kw })
  }

  const dVal = computed(() => (valDisp.value || [0, null])[1])

  const optionsFirst = ref([])
  const optionsRaw = ref([])

  const options = computed(() => {
    const ops = optionsRaw.value

    const me = ops.filter(item => item[0] === (valDisp.value || [0, ''])[0])
    const ops2 = me.length
      ? ops
      : [...(valDisp.value ? [valDisp.value] : []), ...ops]

    return ops2
  })

  // 编辑, loadSelectOptions
  watch(
    () => readonly.value,
    async newVal => {
      if (!newVal) {
        const domain = props.fieldInfo.domain
        if (!domain || typeof domain !== 'function') {
          const ops = await loadSelectOptions()
          optionsFirst.value = ops
        }
      }
    },
    { immediate: true }
  )

  async function handleSearch(val) {
    // console.log('handleSearch:', val)

    const ops = await loadSelectOptions({ name: val })
    // console.log('handleSearch', ops)
    optionsRaw.value = ops
  }

  async function dropdownVisibleChange(open) {
    if (open) {
      const domain = props.fieldInfo.domain
      if (typeof domain === 'function') {
        const ops = await loadSelectOptions()
        optionsRaw.value = ops
      } else {
        optionsRaw.value = optionsFirst.value
      }
    }
  }

  return {
    ...fieldData,
    readonly,
    dVal,
    options,
    handleSearch,
    dropdownVisibleChange,
    onChange
  }
}

export function useMoreSearch(props, ctx) {
  function loadSelectOptions(kw = {}) {
    // const recordMerged = { ...props.formInfo.record, ...props.formInfo.values }

    const recordMerged = get_recordMerged(props.formInfo)

    const relation = api.env.relation(props.fieldInfo)
    return relation.load_select_options({ record: recordMerged, ...kw })
  }

  const records = ref([])
  const columns = ref([
    {
      dataIndex: 'display_name',
      key: 'display_name',
      title: '名称'
      // align: 'center'
    }
  ])

  async function loadData() {
    // console.log('searchMore')
    const ops = await loadSelectOptions({ limit: 0 })
    // // console.log('searchMore', ops)

    records.value = ops.map(item => {
      return { id: item[0], display_name: item[1] }
    })
  }

  const current = ref({})

  function tableCustomRow(record) {
    return {
      // eslint-disable-next-line no-unused-vars
      onClick: event => {
        // console.log('click row ', record)
        current.value = record
      }
    }
  }

  const onSubmit = () => {
    const record = current.value
    ctx.onMorePick(record.id ? [record.id, record.display_name] : null)
    current.value = {}
  }

  return { records, current, columns, loadData, tableCustomRow, onSubmit }
}
