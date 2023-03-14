import { computed, watch, reactive } from 'vue'
import { useField } from './FieldApi'

import api from '@/odoorpc'

export function useFM2m(props, ctx) {
  const { readonly } = useField(props, ctx)

  const localState = {
    relation: null
  }

  const state = reactive({
    relationReady: false,
    relationFieldReady: false,
    relationInfo: null,

    records: [],
    values: []
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

  // load Relation info
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

  // load Relation data
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

  function removeRow(row) {
    console.log('removeRow ', row)
  }

  return { readonly, relationInfo, recordsDisplay, removeRow }
}

// M2m tree

// async handleOnCommit(value) {
//   // console.log('handleOnCommit from subform', value)
//   this.values = [value]
//   const value2 = [...value]
//   value2[1] = false
//   this.$emit('change', [value2])
// }

// M2mForm

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
