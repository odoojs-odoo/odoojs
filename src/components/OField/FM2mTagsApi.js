import { computed, watch, ref } from 'vue'
import api from '@/odoorpc'
import { tuples_to_ids } from '@/odoorpc/tools'

import { useField } from './FieldApi'

// function tuples_to_ids(tuples) {
//   // m2m
//   // [6,],[5,],[4,id],[3,id]
//   //

//   // console.log('tuples_to_ids 1', tuples)

//   const ids = tuples.reduce((acc, tup) => {
//     const op = tup[0]
//     if (op === 6) return [...tup[2]]
//     if (op === 5) return []

//     if ([4, 1].includes(op)) {
//       const rid = tup[1]
//       if (acc.includes(rid)) return [...acc]
//       else return [...acc, rid]
//     }

//     if ([3, 2].includes(op)) return acc.filter(item => item !== tup[1])

//     // 不应该走到这里
//     return acc
//   }, [])

//   // console.log('tuples_to_ids 2', ids)
//   return ids
// }

function get_recordMerged(formInfo) {
  const formview = api.env.formview(formInfo.viewInfo, {
    fields: formInfo.fields
  })

  return formview._get_values_for_modifiers(formInfo.record, formInfo.values)
}

async function _loadRelationData(ids, { fieldInfo }) {
  if (ids && !ids.length) {
    return []
  }

  const relation = api.env.relation(fieldInfo)
  return relation.name_get(ids)
}

export function useFM2mTags(props, ctx) {
  async function loadRelationData(ids) {
    return _loadRelationData(ids, { fieldInfo: props.fieldInfo })
  }

  async function loadSelectOptions(kw = {}) {
    // const recordMerged = { ...props.formInfo.record, ...props.formInfo.values }
    const recordMerged = get_recordMerged(props.formInfo)
    const relation = api.env.relation(props.fieldInfo)
    return relation.load_select_options({ record: recordMerged, ...kw })
  }

  const { readonly } = useField(props, ctx)

  const records = ref([])
  const optionsRaw = ref([])

  function toDict(fromList) {
    return fromList.reduce((acc, cur) => {
      acc[cur[0]] = cur
      return acc
    }, {})
  }

  const idsForEdit = computed(() => {
    const old_ids = props.formInfo.record[props.fieldName] || []
    const old_tuples = [[6, false, old_ids]]
    const new_tuples = props.formInfo.values[props.fieldName] || []
    const tuples = [...old_tuples, ...new_tuples]
    return tuples_to_ids(tuples)
  })

  const dVal = computed(() => {
    const ids = props.formInfo.record[props.fieldName] || []
    return ids.map(item => toDict(records.value)[item]).filter(item => item)
  })

  const mVal = computed({
    get() {
      const ids = idsForEdit.value
      console.log(idsForEdit)
      const res = ids
        .map(item => toDict(records.value)[item])
        .filter(item => item)

      return res
    },

    // eslint-disable-next-line no-unused-vars
    set(value) {
      // console.log('set, mval, ', value)
    }
  })

  function removeDuplication(list) {
    return list.reduce((acc, cur) => {
      if (!acc.map(item => item[0]).includes(cur[0])) {
        acc.push([...cur])
      }
      return acc
    }, [])
  }

  const options = computed(() => {
    return removeDuplication([...mVal.value, ...optionsRaw.value])
  })

  // 更新 records
  async function loadData() {
    const ids = idsForEdit.value

    const ids_todo = ids.filter(
      item => !records.value.map(one => one[0]).includes(item)
    )

    const res_new = await loadRelationData(ids_todo)
    records.value = [...records.value, ...res_new]
  }

  // 只读, loadRelationData
  watch(
    () => props.formInfo.record[props.fieldName],
    async newVal => {
      if (newVal && newVal.length) {
        records.value = await loadRelationData(newVal)
      } else {
        records.value = []
      }
    },
    { immediate: true }
  )

  // 编辑, loadData,
  watch(
    () => readonly.value,
    async newVal => {
      // console.log(newVal)
      if (!newVal) {
        await loadData()
      }
    },
    { immediate: true }
  )

  async function handleSearch(val) {
    // console.log('handleSearch:', val)

    const limit = idsForEdit.value.length + 8
    const ops = await loadSelectOptions({ name: val, limit })
    // console.log('handleSearch', ops)
    optionsRaw.value = ops
  }

  async function dropdownVisibleChange(open) {
    if (open) {
      // console.log('dropdownVisibleChange:')
      const limit = idsForEdit.value.length + 8
      const ops = await loadSelectOptions({ limit })
      optionsRaw.value = ops
    }
  }

  async function onSelectChange(value) {
    const value2 = value.map(item => item.value)
    records.value = value.map(item => [item.value, item.label])
    ctx.emit('change', [[6, false, value2]])
  }

  function onMoreSelect(value) {
    // console.log('onMoreSelect ', value, records.value)
    const res = removeDuplication([...records.value, value])
    records.value = res
    const value2 = records.value.map(item => item[0])
    ctx.emit('change', [[6, false, value2]])
  }

  return {
    dVal,
    readonly,
    mVal,
    options,
    handleSearch,
    dropdownVisibleChange,
    onSelectChange,
    onMoreSelect
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
