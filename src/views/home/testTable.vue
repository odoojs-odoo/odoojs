<template>
  <div>
    <div>Test Table</div>
    <!-- {{ dataSource }} -->
    <div>
      <a-button @click="onChange"> onChange </a-button>
    </div>

    <div>
      <a-button @click="onCreate"> New </a-button>
    </div>
    <div>
      <a-button @click="editable = !editable"> edit {{ editable }} </a-button>
    </div>

    <div>
      <a-button @click="rowEditable = !rowEditable">
        rowEditable {{ rowEditable }}
      </a-button>
    </div>

    <div>-----</div>
    <div></div>
    <OEditTable
      ref="refOEditTable"
      :columns="columns"
      :data-source="dataSource"
      rowKey="id"
      :editable="editable"
      :rowEditable="rowEditable"
      @on-row-change="handleSubRowChange"
      @on-row-rollback="handleSubRowRollback"
      @on-row-remove="handleSubRowRemove"
      @on-row-commit="handleSubRowCommit"
    >
      <template slot="colEdit" slot-scope="{ row, column, text }">
        <div>
          edit: {{ text }}
          {{ column.key }}
        </div>
      </template>

      <template slot="colRead" slot-scope="{ row, column, text }">
        <div>
          read: {{ text }}
          {{ column.key }}
        </div>
      </template>
    </OEditTable>
  </div>
</template>

<script>
import OEditTable from '../../components/OSubView/OEditTable.vue'

export default {
  name: 'TestTable',
  components: { OEditTable },
  mixins: [],

  data() {
    return {
      editable: true,
      rowEditable: true,

      records: [
        { id: 1, name: 'san1', email: '1@w' },
        { id: 2, name: 'san2', email: '2@w' }
      ],
      newRecord: undefined,
      currentRecord: undefined
    }
  },
  computed: {
    columns() {
      return [
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' }
      ]
    },

    dataSource() {
      const newRs = this.newRecord ? [this.newRecord] : []
      return [...this.records, ...newRs]
    }
  },
  async created() {},

  methods: {
    onChange() {
      this.$refs.refOEditTable.setChanged()
    },

    onCreate() {
      const newRow = { id: false, name: false, email: false }
      this.newRecord = newRow
      this.currentRecord = newRow
      this.$refs.refOEditTable.setCurrentRow(newRow)
      this.$refs.refOEditTable.setChanged()
    },

    handleSubRowChange(record) {
      console.log('handleSubRowChange', record)
      const currentRecord = this.currentRecord
      if (currentRecord && !currentRecord.id) {
        this.newRecord = undefined
      }

      this.currentRecord = record
    },

    async handleSubRowRollback(record) {
      // this.call_queue(['subRowRollback'])
      this.currentRecord = undefined
      if (record.id) {
        const one = this.records.find(item => item.id === record.id)
        one.name = one.name.slice(0, one.name.length - 1)
      } else {
        this.newRecord = undefined
      }
    },

    async handleSubRowRemove(record) {
      // this.call_queue(['subRowRemove', record])
      this.records = this.records.filter(item => item.id !== record.id)
    },

    async handleSubRowCommit(record) {
      // this.call_queue(['subColCommit'])
      if (record.id) {
        const one = this.records.find(item => item.id === record.id)
        one.name = one.name + one.id
      } else {
        // console.log('handleSubRowCommit', record)

        this.newRecord = undefined

        this.records.push({
          ...record,
          id: Math.floor(Math.random() * 1000 + 1)
        })
      }
    }
  }
}
</script>

<style type="text/css"></style>
