import { computed, watch, reactive, ref } from 'vue'
import { useField } from './FieldApi'

import api from '@/odoorpc'
import { tuples_to_ids } from '@/odoorpc/tools'

export function useFM2m(props, ctx) {
  const { readonly, onChange } = useField(props, ctx)

  const localState = {
    relation: null
  }

  const state = reactive({
    relationReady: false,
    relationFieldReady: false,
    dataStore: {},
    valueStore: [],
    treeOptionRecords: []
  })

  const relationInfo = ref(null)

  const valueReadonly = computed(
    () => props.formInfo.record[props.fieldName] || []
  )

  const valueEdit = computed(() => state.valueStore)

  const valueDisplay = computed(() => {
    if (readonly.value) {
      return valueReadonly.value
    } else {
      const tuples = [[6, false, valueReadonly.value], ...valueEdit.value]
      return tuples_to_ids(tuples)
    }
  })

  const treeRecords = computed(() => {
    const res = valueDisplay.value
      .map(item => state.dataStore[item])
      .filter(item => item)
    return res
  })

  const treeOptionRecords = computed(() => {
    return state.treeOptionRecords
  })

  async function loadRelationInfo() {
    const relation = api.env.relation(props.fieldInfo, {
      parent: props.formInfo.viewInfo
    })
    localState.relation = relation
    state.relationReady = true

    await relation.load_views()

    relationInfo.value = relation.field_info
    state.relationFieldReady = true
  }

  // load Relation info
  watch(
    () => props.fieldInfo.type,
    // eslint-disable-next-line no-unused-vars
    (newVal, oldVal) => {
      if (newVal && newVal === 'many2many') {
        // console.log(newVal, oldVal)
        loadRelationInfo()
      }
    },
    { immediate: true }
  )

  async function loadRelationData(ids) {
    const info = relationInfo.value
    if (!info) {
      return
    }
    const relation = api.env.relation(info, { parent: props.formInfo.viewInfo })
    const treeview = relation.tree
    const records = await treeview.read(ids)
    const res = records.reduce((acc, cur) => {
      acc[cur.id] = cur
      return acc
    }, {})
    state.dataStore = { ...state.dataStore, ...res }
  }

  // load Relation Readonly data
  watch(
    [relationInfo, valueReadonly],
    // eslint-disable-next-line no-unused-vars
    (newVal, oldVal) => {
      // console.log(newVal, oldVal)
      const [info, ids] = [...newVal]
      if (ids && info) {
        loadRelationData(ids)
      }
    }
  )

  function removeRow(row) {
    // console.log('removeRow ', row)
    const ids = valueDisplay.value.filter(item => item !== row.id)
    const val = [[6, false, ids]]
    state.valueStore = val
    onChange(val)
  }

  async function openRowSelect() {
    // console.log('openRowSelect ')
    const info = relationInfo.value
    if (!info) {
      return
    }

    const domain = ['!', ['id', 'in', valueDisplay.value]]

    const relation = api.env.relation(info, { parent: props.formInfo.viewInfo })
    const treeview = relation.tree
    const records = await treeview.search_read(domain)
    state.treeOptionRecords = records
  }

  function selectRow(rows) {
    // console.log('selectRow ', rows)
    const idsNew = rows.map(item => item.id)
    const ids = [...valueDisplay.value, ...idsNew]
    const val = [[6, false, ids]]
    state.valueStore = val
    onChange(val)

    const res = rows.reduce((acc, cur) => {
      acc[cur.id] = cur
      return acc
    }, {})
    state.dataStore = { ...state.dataStore, ...res }
  }

  return {
    readonly,
    relationInfo,
    treeRecords,
    treeOptionRecords,
    removeRow,
    openRowSelect,
    selectRow
  }
}
