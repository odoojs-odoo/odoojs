import { computed, watch, reactive, ref, toRaw } from 'vue'
import { useField } from './FieldApi'

import api from '@/odoorpc'

export function useFO2m(props, ctx) {
  const { readonly } = useField(props, ctx)

  const localState = {
    relation: null
  }

  const state = reactive({
    relationReady: false,
    relationFieldReady: false,
    records: [],
    values: []
  })

  const relationInfo = ref(null)

  const valueReadonly = computed(
    () => props.formInfo.record[props.fieldName] || []
  )

  // 编辑过的数据 也 放在一起
  const treeRecords = computed(() => {
    if (!state.relationReady) return []
    else {
      // console.log('o2m treeRecords', treeRecords)
      return localState.relation.tree.format_to_display(toRaw(state.records))
    }
  })

  async function loadRelationInfo() {
    const relation = api.env.relation(props.fieldInfo)

    localState.relation = relation
    state.relationReady = true

    await relation.load_views()

    relationInfo.value = relation.field_info
    state.relationFieldReady = true

    ctx.emit('load-relation', props.fieldName, relation.field_info)
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
    if (!ids.length) {
      return
    } else {
      const relation = api.env.relation(info)
      const parentInfo = toRaw(props.formInfo)
      const treeview = relation.tree
      const records = await treeview.read(ids, { parentInfo })
      state.records = treeview.format_to_tuples(records)
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
    //   //     const records = await view.read_for_new_m2m(m2m_value)
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

  // 退出编辑时, 复位 被编辑的值
  watch(
    readonly,
    // eslint-disable-next-line no-unused-vars
    (newVal, oldVal) => {
      // console.log(newVal, oldVal)
      if (newVal) {
        treeCancle()
      }
    },
    { immediate: true }
  )

  function treeCancle() {
    if (!state.relationFieldReady) {
      // raise error
      return
    }
    const treeview = localState.relation.tree
    const records = treeview.tree_cancle(toRaw(state.records))
    state.records = records
  }

  function rowPick(row = {}) {
    if (!state.relationFieldReady) {
      // raise error
      return { record: {}, values: {} }
    }
    const treeview = localState.relation.tree
    const one = treeview.pick_one(toRaw(state.records), row.id)
    return one
  }

  async function rowNew() {
    if (!state.relationFieldReady) {
      // raise error
      return { record: {}, values: {} }
    }
    // 在 o2mForm 中 触发 onchange new
    return { record: {}, values: {} }
  }

  function rowRemove(row) {
    // console.log('rowRemove,record', row, row.id)
    if (!state.relationFieldReady) {
      // raise error
      return
    }
    const treeview = localState.relation.tree

    const records = treeview.remove_one(toRaw(state.records), row.id)

    state.records = records
    return records
  }

  function rowCommit(row, value) {
    // console.log('onRowCommit', record, value)
    if (!state.relationFieldReady) {
      // raise error
      return
    }

    const treeview = localState.relation.tree
    const records = treeview.upinsert_one(toRaw(state.records), row.id, value)
    state.records = records
    return records
  }

  return {
    readonly,
    relationInfo,
    treeRecords,
    rowPick,
    rowNew,
    rowCommit,
    rowRemove
  }
}
