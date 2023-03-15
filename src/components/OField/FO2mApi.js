import { computed, watch, reactive, ref } from 'vue'
import { useField } from './FieldApi'

import api from '@/odoorpc'
import { tuples_to_ids } from '@/odoorpc/tools'

export function useFO2m(props, ctx) {
  const { readonly } = useField(props, ctx)

  const localState = {
    relation: null
  }

  const state = reactive({
    relationReady: false,
    relationFieldReady: false,
    dataStore: {},
    valueStore: []
  })

  async function onRowCommit(value) {
    console.log('onRowCommit', value)
    // console.log('onRowCommit', state.records, state.values, value)
    // if (!state.relationReady) return
    // const treeview = localState.relation.tree
    // const ret_commit = treeview.commit(state.records, state.values, value)
    // console.log('onRowCommit', value, ret_commit)
    // const { values, values_onchange } = ret_commit
    // // state.values = values
    // ctx.emit('change', values_onchange)
  }

  const relationInfo = ref(null)

  const valueReadonly = computed(
    () => props.formInfo.record[props.fieldName] || []
  )

  const valueEdit = computed(() => state.valueStore)

  const valueDisplay = computed(() => {
    if (readonly.value) {
      return valueReadonly.value
    } else {
      const tuples = [
        [5],
        ...valueReadonly.value.map(item => [4, item]),
        ...valueEdit.value
      ]
      return tuples_to_ids(tuples)
    }
  })

  const treeRecords = computed(() => {
    const res = valueDisplay.value
      .map(item => state.dataStore[item])
      .filter(item => item)
    return res
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
    async (newVal, oldVal) => {
      if (newVal && newVal === 'one2many') {
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

    // 主表 新增, 从表 o2m 字段有默认值时, 执行 以下代码. 待处理 todo 2023-2-13
    //   // if (for_new) {
    //   //   const m2m_value = this.values[this.fname]
    //   //   // console.log('load_relation_data: ', this.values, this.fname, m2m_value)
    //   //   const view = this.relation.tree
    //   //   // console.log('load_relation_data: ', this.fname, this.fieldInfo)
    //   //   if (this.fieldInfo.type === 'one2many') {
    //   //     // console.log('load_relation_data: ', this.fname, m2m_value)
    //   //     const res = await view.read_for_new_o2m(m2m_value)
    //   //     // console.log('load_relation_data2: ', this.fname, m2m_value, res)
    //   //     const { values } = res
    //   //     this.subRecords = values
    //   //   } else {
    //   //     const records = await view.read_for_new(m2m_value)
    //   //     // console.log('load_relation_data: ', this.fname, m2m_value, records)
    //   //     this.subRecords = records
    //   //   }
    //   // }
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
    },
    { immediate: true }
  )

  // // 编辑过的数据 也 放在一起
  // const recordsDisplay = computed(() => {
  //   if (!state.relationReady) return []
  //   else {
  //     return localState.relation.tree.values_display(
  //       state.records,
  //       readonly ? state.values : []
  //     )
  //   }
  // })

  // // 编辑过的数据 也 放在一起
  // const currentRow = computed(() => state.currentRow)

  // watch(
  //   readonly,
  //   // eslint-disable-next-line no-unused-vars
  //   (newVal, oldVal) => {
  //     // console.log(newVal, oldVal)
  //     if (newVal) {
  //       state.values = []
  //     }
  //   },
  //   { immediate: true }
  // )

  // function setCurrentRow(row) {
  //   state.currentRow = { ...row }
  // }

  // function onRowClick(record) {
  //   // console.log('click row ', record)
  //   setCurrentRow(record)
  //   state.modalVisible = true
  // }

  // async function onRowCreate() {
  //   // console.log('onRowCreate ')
  //   if (!state.relationReady) return

  //   setCurrentRow({})

  //   state.modalVisible = true
  // }

  return {
    readonly,
    relationInfo,
    treeRecords,
    onRowCommit

    // onRowClick,
    // onRowCreate,

    // modalVisible: computed({
    //   get() {
    //     return state.modalVisible
    //   },
    //   set(val) {
    //     state.modalVisible = val
    //   }
    // }),
    // currentRow
  }
}
