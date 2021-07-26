<template>
  <div>
    <h1>{{ view_title }}</h1>

    <Divider />

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

    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
// 重写 listview 的 例子

import TreeView from '@/components/TreeView'
import listMixin from '@/mixins/listMixin'

export default {
  name: 'ResCountry',
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
