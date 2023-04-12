import { computed, watch, reactive, toRaw } from 'vue'
import { useField } from './FieldApi'
import { useLang } from '@/components/useApi/useLang'
import api from '@/odoorpc'

export function useFO2m(props, ctx) {
  const { lang } = useLang()

  const { readonly } = useField(props, ctx)

  const localState = {
    relation: null
  }

  const state = reactive({
    relationReady: false,
    relationFieldReady: false,

    lang_changed: 1,
    records: [],
    values: []
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

  const valueReadonly = computed(() => {
    return props.formInfo.record[props.fieldName] || []
  })

  // 编辑过的数据 也 放在一起
  const treeRecords = computed(() => {
    const rel = relation_get()
    if (!rel) return []
    else {
      // console.log('o2m treeRecords', treeRecords)
      return rel.tree.format_to_display(toRaw(state.records))
    }
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

  // todo. 在form 页面 点新增时 时. state.records 有缓存
  async function loadRelationData(ids) {
    if (!ids.length) {
      state.records = []
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
    state.records = treeview.format_to_tuples(records)

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

  function check_equ_array(list1, list2) {
    if (list1.length !== list2.length) {
      return false
    }
    const arr = [...list1, ...list2]
    const s1 = new Set(arr)
    return [...s1].length === list2.length
  }
  // load Relation Readonly data
  watch(
    [() => state.relationFieldReady, valueReadonly],
    // eslint-disable-next-line no-unused-vars
    (newVal, oldVal) => {
      const [relationFieldReady_new, newids] = [...newVal]
      const [relationFieldReady_old, oldids] = [...oldVal]
      if (!relationFieldReady_new) {
        return
      } else if (!relationFieldReady_old) {
        return loadRelationData(newids)
      } else {
        if (!check_equ_array(newids, oldids)) {
          return loadRelationData(newids)
        }
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
    const rel = relation_get()
    if (!rel) return

    // if (!state.relationFieldReady) {
    //   // raise error
    //   return
    // }

    const treeview = rel.tree
    const records = treeview.tree_cancle(toRaw(state.records))
    state.records = records
  }

  function rowPick(row = {}) {
    const rel = relation_get()
    if (!rel) return { record: {}, values: {} }

    // if (!state.relationFieldReady) {
    //   // raise error
    //   return { record: {}, values: {} }
    // }
    const treeview = rel.tree
    const one = treeview.pick_one(toRaw(state.records), row.id)
    // console.log(row, row.id, one, state.records)
    return one
  }

  async function rowNew() {
    const rel = relation_get()
    if (!rel) return { record: {}, values: {} }
    // if (!state.relationFieldReady) {
    //   // raise error
    //   return { record: {}, values: {} }
    // }
    // 在 o2mForm 中 触发 onchange new
    return { record: {}, values: {} }
  }

  function rowRemove(row) {
    // console.log('rowRemove,record', row, row.id)
    // if (!state.relationFieldReady) {
    //   // raise error
    //   return
    // }

    const rel = relation_get()
    if (!rel) return

    const treeview = rel.tree

    const records = treeview.remove_one(toRaw(state.records), row.id)

    state.records = records
    return records
  }

  function rowCommit(row, value) {
    // console.log('onRowCommit', row, value)
    // if (!state.relationFieldReady) {
    //   // raise error
    //   return
    // }

    const rel = relation_get()
    if (!rel) return

    const treeview = rel.tree
    const records = treeview.upinsert_one(toRaw(state.records), row.id, value)

    state.records = records
    return records
  }

  return {
    lang,
    readonly,
    relationInfo,
    treeRecords,
    rowPick,
    rowNew,
    rowCommit,
    rowRemove
  }
}
