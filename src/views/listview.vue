<template>
  <div>
    <span v-if="view_type === 'notree'">
      加载中 ...
    </span>
    <span v-else-if="view_type === 'kanban'">
      建设中 ...
      <!-- , kanban -->
    </span>
    <span v-else-if="view_type === 'form'">
      建设中 ...
      <!-- form -->
    </span>
    <span v-else-if="view_type === 'list'">
      <h1>{{ view_title }}</h1>

      <Divider />

      <span v-if="!readonly && !hideCreate">
        <Button @click="handleOnCreate">创建</Button>
        <Divider />
      </span>

      <Page
        v-if="total_length > 10"
        :total="total_length"
        show-total
        show-sizer
        show-elevator
        @on-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      />
      <Divider />

      <TreeView
        :columns="columns"
        :data="dataList"
        @on-row-click="handleOnRowClick"
      />
    </span>

    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import TreeView from '@/components/TreeView'
import listMixin from '@/mixins/listMixin'

export default {
  name: 'ListView',
  components: { TreeView },
  mixins: [listMixin],

  data() {
    return {}
  },
  computed: {},

  async created() {
    await this.init()
  },

  methods: {}
}
</script>

<style type="text/css"></style>
