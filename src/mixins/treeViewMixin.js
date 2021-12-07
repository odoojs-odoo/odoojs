import viewMixin from './viewMixin'

export default {
  mixins: [viewMixin],

  props: {
    searchChange: { type: Number, default: 0 }
  },

  data() {
    return {
      loading: false,
      dataList: [],
      pagination: {
        // position: 'top'
        total: 0,
        pageSize: 10
      }
    }
  },
  computed: {},
  watch: {
    searchChange(newVal, oldVal) {
      console.log('watch,searchChange,', newVal, oldVal)
      this.resetData()
    }
  },

  methods: {
    async initData() {
      const model = this.modelGet()
      model.set_limit(this.pagination.pageSize)
      this.resetData()
    },

    async resetData() {
      const model = this.modelGet()
      this.pagination = JSON.parse(JSON.stringify(model.pagination))
      await this.fetch_data_list()
    },

    async fetch_data_list() {
      this.loading = true

      const model = this.modelGet()
      const pagination = { ...this.pagination }
      await model.pageGoto(pagination.current || 1)

      this.pagination = { ...this.pagination, total: model.total_length }
      this.dataList = [...model.values_list]
      this.loading = false
    },

    fresh_data() {
      // console.log(page)
      const model = this.modelGet()
      this.pagination = JSON.parse(JSON.stringify(model.pagination))
      this.dataList = [...model.values_list]
    },

    handlePageChange(page) {
      // console.log(page)
      this.pagination = { ...this.pagination, current: page }
      this.fetch_data_list()
    },

    async handleOnRowClick(row) {
      const model = this.modelGet()
      const actionId = model.action.id
      // console.log(model.env.context.active_id)
      const active_id = model.env.context.active_id
      const path = `/web`
      const query = {
        action: actionId,
        view_type: 'form',
        id: row.id,
        ...(active_id ? { active_id } : {})
      }
      this.$router.push({ path, query })
    }
  }
}
