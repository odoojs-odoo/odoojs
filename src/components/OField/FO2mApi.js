import { computed, watch, reactive } from 'vue'
import api from '@/odoorpc'

import { useField } from './FieldApi'

export function useFO2m(props, ctx) {
  const { readonly } = useField(props, ctx)

  const localState = {
    relation: null
  }
  const state = reactive({
    relationReady: false,
    relationInfo: null,
    records: [],
    values: [],
    modalVisible: false,
    currentRow: {},
    currentRecord: {}
  })

  const relationInfo = computed(() => state.relationInfo)
  // 编辑过的数据 也 放在一起
  const recordsDisplay = computed(() => {
    if (!state.relationReady) return []
    else {
      return localState.relation.tree.values_display(
        state.records,
        readonly ? state.values : []
      )
    }
  })

  watch(
    readonly,
    // eslint-disable-next-line no-unused-vars
    (newVal, oldVal) => {
      // console.log(newVal, oldVal)
      if (newVal) {
        state.values = []
      }
    },
    { immediate: true }
  )

  // 编辑过的数据 也 放在一起
  const currentRow = computed(() => state.currentRow)

  watch(
    () => props.fieldInfo.type,
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      if (newVal && newVal === 'one2many') {
        const relation = api.env.relation(props.fieldInfo, {
          parent: props.formInfo.viewInfo
        })

        await relation.load_views()
        state.relationInfo = relation.field_info
        localState.relation = relation
        state.relationReady = true
      }
    },
    { immediate: true }
  )

  watch(
    [() => state.relationInfo, () => props.formInfo.record[props.fieldName]],
    async newVal => {
      // console.log(newVal)

      const [relationInfo, ids] = [...newVal]
      // console.log(relationInfo, ids)
      if (ids && relationInfo) {
        // console.log(relationInfo, ids)
        const relation = api.env.relation(relationInfo, {
          parent: props.formInfo.viewInfo
        })

        const treeview = relation.tree
        const records = await treeview.read(ids)
        state.records = records
      }

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
    },
    { immediate: true }
  )

  function setCurrentRow(row) {
    state.currentRow = { ...row }
  }

  function onRowClick(record) {
    // console.log('click row ', record)
    setCurrentRow(record)
    state.modalVisible = true
  }

  async function onRowCreate() {
    // console.log('onRowCreate ')
    if (!state.relationReady) return

    setCurrentRow({})

    state.modalVisible = true
  }

  async function onRowCommit(value) {
    // console.log('onRowCommit', state.records, state.values, value)
    if (!state.relationReady) return
    const treeview = localState.relation.tree
    const ret_commit = treeview.commit(state.records, state.values, value)
    // console.log('onRowCommit', value, ret_commit)
    const { values, values_onchange } = ret_commit
    state.values = values
    ctx.emit('change', values_onchange)
  }

  return {
    readonly,
    relationInfo,
    recordsDisplay,
    onRowClick,
    onRowCreate,
    onRowCommit,
    modalVisible: computed({
      get() {
        return state.modalVisible
      },
      set(val) {
        state.modalVisible = val
      }
    }),
    currentRow
  }
}
