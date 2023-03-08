import { computed, watch, reactive } from 'vue'
import api from '@/odoorpc'
import { useField } from './FieldApi'

function useFormApi() {
  function tuples_to_ids(tuples) {
    // m2m
    // [6,],[5,],[4,id],[3,id]
    //

    // console.log('tuples_to_ids 1', tuples)

    const ids = tuples.reduce((acc, tup) => {
      const op = tup[0]
      if (op === 6) return [...tup[2]]
      if (op === 5) return []

      if ([4, 1].includes(op)) {
        const rid = tup[1]
        if (acc.includes(rid)) return [...acc]
        else return [...acc, rid]
      }

      if ([3, 2].includes(op)) return acc.filter(item => item !== tup[1])

      // 不应该走到这里
      return acc
    }, [])

    // console.log('tuples_to_ids 2', ids)
    return ids
  }

  async function loadSelectOptions(formInfo, fieldInfo) {
    const relation = api.env.relation(fieldInfo)
    const recordMerged = { ...formInfo.record, ...formInfo.values }
    // console.log('in m2m tags')

    return relation.load_select_options({ record: recordMerged })
  }

  async function loadRelationData(fieldInfo, ids) {
    if (ids && !ids.length) {
      return []
    }

    const relation = api.env.relation(fieldInfo)
    return relation.name_get(ids)
  }

  return { tuples_to_ids, loadSelectOptions, loadRelationData }
}

export function useFM2mTags(props, ctx) {
  const { readonly } = useField(props, ctx)
  const { tuples_to_ids, loadSelectOptions, loadRelationData } = useFormApi()

  const state = reactive({ records: [], options: [] })

  const dVal = computed(() => {
    // todo. 编辑过的数据
    return state.records
  })
  const options = computed(() => state.options)

  watch(
    () => readonly.value,
    async newVal => {
      console.log(newVal)
      if (!newVal) {
        state.options = await loadSelectOptions(props.formInfo, props.fieldInfo)
      }
    },
    { immediate: true }
  )

  watch(
    () => props.formInfo.record[props.fieldName],
    async newVal => {
      state.records = await loadRelationData(props.fieldInfo, newVal)
    },
    { immediate: true }
  )

  const mVal = computed({
    get() {
      function getTuples() {
        if (props.fieldName in props.formInfo.values) {
          return props.formInfo.values[props.fieldName]
        } else {
          const val = props.formInfo.record[props.fieldName]
          if (val && val.length) return [[6, false, val]]
          else return []
        }
      }

      const tuples = getTuples()
      const ids = tuples_to_ids(tuples)

      return ids.map(item => {
        return { key: item, value: item }
      })
    },
    // eslint-disable-next-line no-unused-vars
    set(value) {
      // console.log('set, mval, ', value)
      // const value2 = value.map(item => item.value)
      // ctx.emit('update:modelValue', value)
    }
  })

  return { mVal, dVal, readonly, options }
}
