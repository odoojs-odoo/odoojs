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
