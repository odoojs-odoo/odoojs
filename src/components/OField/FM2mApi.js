import { computed, watch, reactive, ref } from 'vue'
import { useField } from './FieldApi'

import api from '@/odoorpc'

// async function _loadRelationData(ids, { fieldInfo }) {
//   if (ids && !ids.length) {
//     return []
//   }

//   const relation = api.env.relation(fieldInfo)
//   return relation.name_get(ids)
// }

export function useFM2m(props, ctx) {
  //   async function loadRelationData(ids) {
  //     return _loadRelationData(ids, { fieldInfo: props.fieldInfo })
  //   }

  //

  const { readonly } = useField(props, ctx)

  const localState = {
    relation: null
  }

  const state = reactive({
    relationReady: false,
    relationFieldReady: false,
    relationInfo: null,

    records: [],
    values: [],
    modalVisible: false,
    currentRow: {}
    // currentRecord: {}
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

  // 编辑过的数据 也 放在一起
  const currentRow = computed(() => state.currentRow)

  // loadRelation
  watch(
    () => props.fieldInfo.type,
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      if (newVal && newVal === 'many2many') {
        // console.log(newVal, oldVal)
        const relation = api.env.relation(props.fieldInfo, {
          parent: props.formInfo.viewInfo
        })
        localState.relation = relation
        state.relationReady = true

        await relation.load_views()

        state.relationInfo = relation.field_info
        state.relationFieldReady = true
      }
    },
    { immediate: true }
  )

  //   const sheet = computed(() => {
  //     if (state.formviewReady) {
  //       const relationInfo = toRaw(props.relationInfo)
  //       const parentViewInfo = toRaw(props.parentFormInfo.viewInfo)

  //       const rel = api.env.relation(relationInfo, {
  //         parent: parentViewInfo
  //       })

  //       const sheet0 = rel.form.view_sheet()
  //
  //       return sheet0
  //     } else {
  //       return { children: {} }
  //     }
  //   })

  watch(
    [() => state.relationInfo, () => props.formInfo.record[props.fieldName]],
    async newVal => {
      //   console.log(newVal)
      const [relationInfo, ids] = [...newVal]
      // console.log(relationInfo, ids)

      if (ids && relationInfo) {
        const relation = api.env.relation(relationInfo, {
          parent: props.formInfo.viewInfo
        })

        const treeview = relation.tree
        const records = await treeview.read(ids)
        state.records = records
      }
    }
  )

  function setCurrentRow(row) {
    state.currentRow = { ...row }
  }

  function onRowClick(record) {
    console.log('click row ', record)
    setCurrentRow(record)
    state.modalVisible = true
  }

  async function onRowCreate() {
    console.log('onRowCreate ')
    // if (!state.relationReady) return

    // setCurrentRow({})

    // state.modalVisible = true
  }

  return {
    readonly,
    relationInfo,
    recordsDisplay,
    onRowClick,
    onRowCreate,
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

// M2m tree

// async handleCreate() {
//   // console.log('createO2m')
//   this.$refs.subNew.handleCreate(this.values_display)
// },

// async handleOnRowClick(record) {
//   // console.log('handleOnRowClick')
//   this.$refs.subForm.handleShowForm(record, this.values_display)
// },

// async handleOnCommit(value) {
//   // console.log('handleOnCommit from subform', value)
//   this.values = [value]
//   const value2 = [...value]
//   value2[1] = false
//   this.$emit('change', [value2])
// }

// M2mForm
// async handleShowForm(record, recordsOld) {
//     const row = { ...record }
//     if (!row.id) delete row.id

//     this.record = { ...record }
//     this.recordsOld = recordsOld

//     this.showModal = true
//   },

//   async handleOnRemove() {
//     // console.log('handleOnRemove', this.record, this.recordsOld)
//     const recs = this.recordsOld.filter(item => item.id !== this.record.id)
//     const ids = recs.map(item => item.id)
//     const vals = [6, recs, ids]
//     this.$emit('on-commit', vals)
//     this.showModal = false
//   }

// M2mNew
// handleOnRowSelect(selectedRowKeys, selectedRows) {
//     // console.log('handleOnRowSelect', selectedRowKeys)
//     this.selectedRowKeys = selectedRowKeys
//     this.selectedRows = selectedRows
//     // this.$emit('on-row-select', selectedRowKeys)
//   },

//   async handleCreate(recordsOld) {
//     this.recordsOld = recordsOld
//     this.showModal = true
//     const res = await this.relation.tree.search_read_for_m2m_new(recordsOld)
//     this.records_for_selection = res
//   },

//   handleOnOk() {
//     // console.log('handleOnOk m2m new', this.selectedRowKeys)
//     const recs = [...this.recordsOld, ...this.selectedRows]
//     const ids = recs.map(item => item.id)
//     const vals = [6, recs, ids]
//     this.$emit('on-commit', vals)
//     this.showModal = false
//     this.selectedRowKeys = []
//     this.selectedRows = []
//   }
