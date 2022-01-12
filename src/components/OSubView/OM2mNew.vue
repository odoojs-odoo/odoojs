<template>
  <div>
    <a-modal
      :title="node.attrs.string"
      :width="800"
      :visible="showModal"
      @cancel="() => (showModal = false)"
    >
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="records"
        rowKey="id"
        :pagination="pagination"
      >
      </a-table>

      <template slot="footer">
        <a-space>
          <a-button key="commit" @click="handleOnOk"> 选择 </a-button>

          <a-button key="back" @click="() => (showModal = false)">
            取消
          </a-button>
        </a-space>
      </template>
    </a-modal>
    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import api from '@/odooapi'

export default {
  name: 'OM2mNew',
  components: {},
  mixins: [],
  props: {
    visible: { type: Boolean, default: false },
    recordsOld: { type: Array, default: () => [] },
    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      pagination: {
        // position: 'top'
        total: 0,
        pageSize: 2
      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  computed: {
    showModal: {
      get() {
        return this.visible
      },

      set(value) {
        this.$emit('update:visible', value)
      }
    },

    records() {
      const { records = [] } = this.dataInfo
      return records
    },

    view() {
      const { views = {} } = this.viewInfo
      const { fields_views = {} } = views
      const view = fields_views.tree || {}
      return view
    },

    viewInfo2() {
      return { ...this.viewInfo, view: this.view }
    },

    node() {
      return api.Views.tree.view_node(this.viewInfo2)
    },

    view_columns() {
      const { fields } = this.view
      const node = this.node
      const columns = (node.children || [])
        .filter(item => item.tagName === 'field')
        .map(item => {
          const fname = item.attrs.name
          const meta = fields[fname] || {}
          const title = item.attrs.string || meta.string
          return { key: fname, title, node: item, meta }
        })

      return columns
    },

    columns() {
      const cols = this.view_columns
      // console.log('subtree', cols, this.viewInfo)
      // TBD GROUPBY
      const cols2 = cols.filter(
        item =>
          !item.node.attrs.invisible &&
          item.node.attrs.optional !== 'hide' &&
          item.node.tagName === 'field'
        // item.node.tagName !== 'templates_no_templates' &&
        // item.node.tagName !== 'groupbyb' &&
      )
      // console.log(JSON.parse(JSON.stringify(cols2)))
      return [...cols2].map(col => {
        return { ...col, dataIndex: col.key }
      })
    },

    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(selectedRowKeys, selectedRows)
          this.handleOnRowSelect(selectedRowKeys, selectedRows)
        }
      }
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    handleOnRowSelect(selectedRowKeys, selectedRows) {
      console.log('handleOnRowSelect', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      // this.$emit('on-row-select', selectedRowKeys)
    },

    handleOnOk() {
      // console.log('handleOnOk m2m new', this.selectedRowKeys)
      const recs = [...this.recordsOld, ...this.selectedRows]
      const ids = recs.map(item => item.id)
      const vals = [6, false, ids]

      this.$emit('on-event', 'on-commit', vals, recs)
      this.showModal = false

      this.selectedRowKeys = []
      this.selectedRows = []
    }
  }
}
</script>

<style type="text/css"></style>
