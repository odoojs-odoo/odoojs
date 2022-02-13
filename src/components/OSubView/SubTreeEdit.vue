<template>
  <div class="o_list_view o_list_optional_columns">
    <OEditTable
      ref="refOEditTable"
      :columns="columns"
      :data-source="dataSource"
      rowKey="id"
      :editable="editable"
      :rowEditable="rowEditable"
      :changed.sync="rowEditchanged2"
      @on-row-change="handleSubRowChange"
      @on-row-rollback="handleSubRowRollback"
      @on-row-remove="handleSubRowRemove"
      @on-row-commit="handleSubRowCommit"
    >
      <template slot="colEdit" slot-scope="{ column }">
        <ONode
          :editable="true"
          :data-info="formData"
          :view-info="{ ...viewInfo2, viewType: 'tree', node: column.node }"
          @on-event="handleSubFormOnEvent"
        />
      </template>

      <template slot="colRead" slot-scope="{ row, column }">
        <ONode
          :editable="false"
          :data-info="{ record: row }"
          :view-info="{ ...viewInfo2, viewType: 'tree', node: column.node }"
        />
      </template>
    </OEditTable>

    <!-- <div class="table-responsive">
        <table
          class="o_list_table table table-sm table-hover table-striped o_list_table_ungrouped o_section_and_note_list_view"
          stype="table-layout: fixed"
        >
          tab
        </table>
      </div>
      <div class="o_optional_columns text-center dropdown">
        o_optional_columns
      </div> -->
  </div>
</template>

<script>
import api from '@/odooapi'
import { try_call } from '@/odooapi/tools'

import editMixin from '@/mixins/editMixin'

import OEditTable from './OEditTable.vue'
import ONode from '../ONode/ONode'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default {
  name: 'SubTreeEdit',
  components: { OEditTable, ONode },
  mixins: [editMixin],
  props: {
    columns: { type: Array, default: () => [] },
    dataSource: { type: Array, default: () => [] },
    rowEditable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },

    // 父组件 已经编辑过当前行
    rowEditchanged: { type: Boolean, default: false },

    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },

    formViewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },

    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    rowEditchanged2: {
      get() {
        return this.rowEditchanged
      },
      set(val) {
        this.$emit('update:rowEditchanged', val)
      }
    },

    viewInfo2() {
      return { ...this.viewInfo }
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    setCurrentRow(rec) {
      this.$refs.refOEditTable.setCurrentRow(rec)
    },

    async handleSubRowChange(record) {
      // console.log('handleSubRowChange', record)
      this.$emit('on-row-change', record)
    },

    handleSubFormOnEvent(event_name, ...args) {
      // console.log(' handleSubFormOnEvent', event_name, ...args)
      if (event_name === 'on-change') {
        this.queue_handleOnchange(...args)
      }
    },

    async handleOnchange(fname, value) {
      this.rowEditchanged2 = true

      const res = await try_call(async () => {
        console.log('handleOnchange', cp(this.formViewInfo))
        return await api.Node.relation_onchange(this.formViewInfo, {
          record: this.formData.record,
          values: { ...this.formData.values, [fname]: value },
          parentData: this.formData.parentData,
          fname
        })
      })
      const { error, result } = res
      console.log(error, result)

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.$emit('on-event', 'on-change-ok', { data: result })
      }
    },

    async handleSubRowRollback(...args) {
      // console.log('handleSubRowRollback')
      this.call_queue(['subRowRollback', ...args])
    },

    async handleSubRowRemove(...args) {
      // console.log('handleSubRowRemove')
      this.call_queue(['subRowRemove', ...args])
    },

    async handleSubRowCommit(...args) {
      // console.log('handleSubRowCommit')
      this.call_queue(['subRowCommit', ...args])
    },

    async subRowRollback({ done }) {
      // console.log('subRowRollback subform')
      this.$emit('on-event', 'on-rollback', { done })
    },

    async subRowRemove({ record, done }) {
      // console.log('handleOnRemove')
      const value = [2, record.id, false]
      this.$emit('on-event', 'on-commit', { value, done })
    },

    async subRowCommit({ done }) {
      const values = this.formData.values
      // console.log(' subRowCommit ', this.formData, values)
      if (!values) return

      const vals_get = () => {
        if (!this.formData.record.id) {
          return [0, false, values]
        } else {
          return [1, this.formData.record.id, values]
        }
      }
      const value = vals_get()

      this.$emit('on-event', 'on-commit', { value, done })
    }
  }
}
</script>

<style type="text/css"></style>
