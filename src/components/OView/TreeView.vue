<template>
  <div>
    <div v-show="groupby.length">
      <!-- {{ expandedRowKeys }} -->
      <!-- {{ activeIds }} -->

      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="records"
        rowKey="id"
        :pagination="pagination"
        :expanded-row-keys.sync="expandedRowKeys"
        :customRow="tableCustomRow"
        @expand="onExpend"
        @change="handleTableChange"
      >
        <!-- <span slot="key" slot-scope="text, record">
          {{ text }}
          <a-icon type="right" @click="onclickRow(record)" />
          <a-icon type="down" />
        </span> -->
      </a-table>
    </div>

    <div v-show="!groupby.length">
      <!-- {{ activeIds }} -->
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="records"
        rowKey="id"
        :pagination="pagination"
        :loading="loading"
        :customRow="tableCustomRow"
        @change="handleTableChange"
      >
      </a-table>
    </div>

    <template v-if="showWizard">
      <WizardForm
        :visible.sync="showWizard"
        :view-info="wizardViewInfo"
        @on-event="handleOnViewEvent"
      />
    </template>
  </div>
</template>

<script>
import listViewMixin from '@/mixins/listViewMixin'
import WizardForm from '@/components/OView/WizardForm.vue'

export default {
  name: 'TreeView',
  components: { WizardForm },
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
        selectedRowKeys: this.activeIdsWithGroupby,
        onChange: (selectedRowKeys, selectedRows) => {
          this.handleOnRowSelect(selectedRowKeys, selectedRows)
        }
      }
    }
  },
  watch: {},
  async created() {},

  mounted() {},
  methods: {
    onclickRow(record) {
      console.log(record)
    },

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
        }
      }
    }
  }
}
</script>

<style type="text/css"></style>
