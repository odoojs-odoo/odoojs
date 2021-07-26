<template>
  <div>
    <h1>
      {{ report_name }}
    </h1>

    <Table :columns="columns" :data="dataList" @on-row-click="handleOnRowClick">
    </Table>

    <Modal
      v-model="showModal"
      :title="`${report_name} ${currentRow.date_month_name}`"
      :fullscreen="true"
    >
      <div slot="footer">
        <span>
          <Button @click="modalExport">下载报表</Button>
        </span>
        <span>
          <Button @click="modalCancel">关闭</Button>
        </span>
      </div>

      <Table :columns="line_columns" :data="line_dataList"> </Table>
    </Modal>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'AccountReport',
  props: {},

  data() {
    return {
      model: '',
      Model: '',
      dataList: [],
      columns: [{ title: '账期', key: 'date_month_name' }],

      line_dataList: [],
      line_columns: [],
      showModal: false,
      currentRow: {}
    }
  },

  computed: {},

  watch: {
    // 菜单切换时, 触发
    '$route.query': {
      handler: function(val) {
        console.log('watch, $route.query, val', val)
        this.init()
      },
      deep: true
    }
  },

  async created() {
    await this.init()
  },

  async mounted() {},

  methods: {
    async init() {
      const query = this.$route.query
      console.log('report, init,', query)
      const model = query.model

      const Model = api.env.model(model)
      this.model = model
      this.Model = Model

      this.report_name = Model.report_name()

      const months = await Model.search_read_months()
      console.log('report, init,', months)

      this.dataList = months
    },

    async handleOnRowClick(row) {
      // if (!this.hasParent) {
      //   this.$emit('on-row-click', row)
      //   return
      // }
      console.log('handleOnRowClick,', row)

      const date_month = row.date_month

      const data = await this.Model.report_month(date_month)

      this.line_columns = data.fields
        .filter(item => !item.invisible)
        .map(item => {
          return { key: item.name, title: item.label }
        })

      console.log('handleOnRowClick,', data.lines)
      this.line_dataList = data.lines

      this.showModal = true
      this.currentRow = { ...row }
    },

    modalCancel() {
      this.showModal = false
    },

    async modalExport() {
      const result = await this.Model.export_report_month(
        this.currentRow.date_month
      )
      api.download(result)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
