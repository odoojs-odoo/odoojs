<template>
  <div>
    <span v-if="move_data.state === 'draft'">
      <Button @click="handleOnCreate">创建</Button>
      <Divider />
    </span>

    <!-- v-if="total_length > 10" -->
    <Page
      :total="total_length"
      :page-size="pageSize"
      show-total
      show-sizer
      show-elevator
      @on-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
    />

    <Table :columns="columns" :data="dataList" @on-row-click="handleOnRowClick">
    </Table>
  </div>
</template>

<script>
import listRpcMixin from '@/mixins/listRpcMixin'

import api from '@/api'

export default {
  name: 'OpenLine',
  components: {},
  mixins: [listRpcMixin],

  props: {
    move_id: { type: Number, default: 0 },
    move_data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      pageSize: 2
    }
  },
  computed: {
    columns() {
      return [
        {
          key: 'account_id',
          title: '科目',
          render: (h, { row }) => {
            return h('span', {}, [row.account_id__name])
          }
        },
        { key: 'name', title: '摘要' },
        { key: 'debit', title: '借方' },
        { key: 'credit', title: '贷方' }
      ]
    }
  },

  watch: {
    move_id(newVal) {
      //   console.log('watch, show, val', newVal, oldVal)

      if (newVal) {
        this.init()
      }
    }
  },

  async created() {
    if (this.move_id) {
      this.init()
    }
  },

  mounted() {},
  methods: {
    async init() {
      //   console.log('init,', this.$route)
      //   console.log('init,', this.move_id)
      const model = this.$route.meta.model

      const Model2 = api.env.model(model)
      const Model = Model2.with_context({ default_move_id: this.move_id })

      const records = await Model.create_record()

      records.domain = []
      records.order = 'id'
      records.offset = 0
      records.limit = this.pageSize

      const res = await records.pageGoto()
      console.log(records, res)

      this.model = records
      this.dataList = [...res]
      this.total_length = records.total_length
    },

    handleOnCreate() {
      console.log(' handleOnCreate ')
      const action_ref = this.$route.meta.name
      const path = `/web/${action_ref}/form`
      this.$router.push({ path, query: { move_id: this.move_id } })
    },

    handleOnRowClick(row) {
      console.log('handleOnRowClick,', row)

      const action_ref = this.$route.meta.name
      const path = `/web/${action_ref}/form`
      this.$router.push({ path, query: { id: row.id, move_id: this.move_id } })
    }
  }
}
</script>

<style type="text/css"></style>
