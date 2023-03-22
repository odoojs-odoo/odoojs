import { computed, watch, ref, toRaw } from 'vue'

import { useField } from './FieldApi'
import api from '@/odoorpc'

function get_record_for_modifiers(formInfo) {
  if (formInfo.viewInfo) {
    const actionInfo = toRaw(formInfo.viewInfo.action)
    const fields = toRaw(formInfo.fields)
    const view = api.env.formview(actionInfo, { fields })
    return view.merge_to_modifiers(formInfo.record, formInfo.values)
  } else if (formInfo.relationInfo) {
    const info = formInfo.relationInfo
    const rel = api.env.relation(info.relation, { parent: info.parent })
    const view = rel.form

    // x2mform 需要额外的 parentData
    return view.merge_to_modifiers(
      formInfo.record,
      formInfo.values,
      formInfo.parentData
    )
  } else {
    return {}
  }
}

export function useFM2o(props, ctx) {
  const {
    dVal: valDisp,
    readonly,
    onChange,
    ...fieldData
  } = useField(props, ctx)

  function loadSelectOptions(kw = {}) {
    const record = get_record_for_modifiers(props.formInfo)
    const relation = api.env.relation(props.fieldInfo)
    return relation.load_select_options({ record, ...kw })
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
    const record = get_record_for_modifiers(props.formInfo)

    const relation = api.env.relation(props.fieldInfo)
    return relation.load_select_options({ record, ...kw })
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
