<template>
  <span>
    <a-modal v-model="showModal" :title="relationInfo && relationInfo.string">
      <a-table
        :columns="columns"
        :data-source="records_for_selection"
        rowKey="id"
        :row-selection="rowSelection"
        :pagination="pagination"
      >
      </a-table>

      <template slot="footer">
        <a-space>
          <a-button size="small" key="commit" @click="handleOnOk"> 选择 </a-button>

          <a-button size="small" key="back" @click="() => (showModal = false)">
            取消
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </span>
</template>

<script>
import M2mNewMinxin from '@/odooui/M2mNewMinxin'

const PageSize = 10

export default {
  name: 'M2mNew',
  components: {},
  mixins: [M2mNewMinxin],
  props: {},
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },

      pagination: {
        // position: 'top'
        total: 0,
        pageSize: PageSize
      }
    }
  },
  computed: {},

  watch: {},
  created() {},

  async mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
