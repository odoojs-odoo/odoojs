import { computed, watch, reactive, toRaw } from 'vue'
import { useField } from './FieldApi'
import { useLang } from '@/components/useApi/useLang'
import api from '@/odoorpc'
import { tuples_to_ids } from '@/odoorpc/tools'

export function useFM2m(props, ctx) {
  const { lang } = useLang()

  const { readonly, onChange } = useField(props, ctx)

  const localState = {
    relation: null
  }

  const state = reactive({
    relationReady: false,
    relationFieldReady: false,

    lang_changed: 1,

    dataStore: {},
    valueStore: [],
    treeOptionRecords: []
  })

  function check_lang() {
    return state.lang_changed
  }

  function relation_get() {
    check_lang()
    return state.relationFieldReady ? localState.relation : undefined
  }

  const relationInfo = computed(() => {
    const rel = relation_get()
    if (!rel) return

    return rel.field_info
  })

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

  async function langChange(lg) {
    const rel = relation_get()
    if (!rel) return

    await rel.set_lang(lg)
    state.lang_changed += 1
    const res_ids = valueReadonly.value
    loadRelationData(res_ids)
  }

  // watch lang
  watch(
    () => props.formInfo.lang_changed,
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      // console.log(newVal, oldVal, state.relationFieldReady)
      langChange(lang.value)
    },
    { immediate: true }
  )

  async function loadRelationInfo() {
    const relation = api.env.relation(props.fieldInfo)
    localState.relation = relation
    state.relationReady = true

    await relation.load_views()

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
    if (!ids.length) {
      return
    }

    const rel = relation_get()
    if (!rel) {
      // state.records = []
      return
    }

    const relation = rel
    const parentInfo = toRaw(props.formInfo)
    const treeview = relation.tree
    const records = await treeview.read(ids, { parentInfo })
    const res = records.reduce((acc, cur) => {
      acc[cur.id] = cur
      return acc
    }, {})
    state.dataStore = { ...state.dataStore, ...res }
  }

  function check_equ_array(list1, list2) {
    const arr = [...list1, ...list2]
    const s1 = new Set(arr)
    return [...s1].length === list2.length
  }

  // load Relation Readonly data
  watch(
    [() => state.relationFieldReady, valueReadonly],
    // eslint-disable-next-line no-unused-vars
    (newVal, oldVal) => {
      // console.log(newVal, oldVal)
      // const [info, ids] = [...newVal]
      // if (ids && info) {
      //   loadRelationData(ids)
      // }
      const [relationFieldReady_old, newids] = [...newVal]
      const [relationFieldReady_new, oldids] = [...oldVal]

      if (!relationFieldReady_new) {
        return
      } else if (!relationFieldReady_old) {
        return loadRelationData(newids)
      } else {
        if (!check_equ_array(newids, oldids)) {
          return loadRelationData(newids)
        }
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
    const rel = relation_get()
    if (!rel) return

    const domain = ['!', ['id', 'in', valueDisplay.value]]

    // const relation = api.env.relation(info)

    // const treeview = relation.tree

    const treeview = rel.tree

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
