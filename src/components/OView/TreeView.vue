<template>
  <div>
    <!-- tree
    {{ columns }} -->
    <a-table
      :row-selection="rowSelection"
      :columns="columns"
      :data-source="dataList"
      rowKey="id"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :customRow="tableCustomRow"
    >
    </a-table>
  </div>
</template>

<script>
import listViewMixin from '@/mixins/listViewMixin'

export default {
  name: 'TreeView',
  components: {},
  mixins: [listViewMixin],

  props: {},

  data() {
    return {
      selectedRows: []
    }
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.handleOnRowSelect(selectedRowKeys, selectedRows)
        }
      }
    }
  },
  watch: {},

  methods: {
    // eslint-disable-next-line no-unused-vars
    handleTableChange(pagination, filters, sorter) {
      // console.log(pagination, filters, sorter)
      const page = pagination.current

      this.handlePageChange(page)
    },

    tableCustomRow(record) {
      const that = this
      return {
        // props: {
        //   xxx... //属性
        // },
        on: {
          // 事件
          // eslint-disable-next-line no-unused-vars
          click: event => {
            // console.log(record, event)
            that.handleOnRowClick(record)
          } // 点击行
          // dblclick: (event) => {},
          // contextmenu: (event) => {},
          // mouseenter: (event) => {},  // 鼠标移入行
          // mouseleave: (event) => {}
        }
      }
    }
  }
}
</script>

<style type="text/css"></style>
