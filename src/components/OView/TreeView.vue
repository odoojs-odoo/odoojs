<template>
  <div class="fatherBox">
    <TreeNavbar
      :title="actionInfo.name"
      :search-values="search_values"
      :search-items="search_items"
      :buttons="buttons"
      :actionBtns="actionBtns"
      :hasActive="hasActive"
      @search-change="handleSearchChange"
      @click-right="onClickRight"
      :activeIds="activeIds"
    />

    <WizardForm
      :visible.sync="wizardVisible"
      :action="wizardAction"
      :actionIds="activeIds"
      @done="handleWizardDone"
    />

    <a-table
      class="bg"
      :row-selection="rowSelection"
      :pagination="pagination"
      :columns="columns"
      :data-source="records"
      rowKey="id"
      :customRow="tableCustomRow"
      :scroll="widthAndHeight"
      @change="handleTableChange"
    >
    </a-table>
  </div>
</template>

<script>
import TreeViewMixin from '@/components/OView/treeViewMixin'

import TreeNavbar from '@/components/ONavbar/treeNavbar.vue'
import WizardForm from '@/components/OView/WizardForm.vue'

export default {
  name: 'TreeView',
  components: { TreeNavbar, WizardForm },
  mixins: [TreeViewMixin],
  props: {},

  data() {
    return {}
  },

  computed: {},

  created() {},

  mounted() {
    // console.log('mounted', this.$route.fullPath)
  },

  methods: {}
}
</script>

<style type="text/css">
.fatherBox {
  /* background: red; */
}
.bg {
  /* background: white; */
  /* padding: 5px; */
  /* background-color: rebeccapurple; */
}

.ant-table-tbody > tr > td {
  /* background: palegreen; */
  padding: 5px;
}

.ant-table-pagination.ant-pagination {
  /* background: lightcoral; */
  margin: 10px 0px;
}
</style>
