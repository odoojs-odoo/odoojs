import api from '@/api'

const Mixin = {
  data() {
    return {
      model: undefined,
      dataList: [],
      total_length: 0,
      pageSize: 10
    }
  },
  computed: {
    columns() {
      return []
    }
  },

  watch: {},

  async created() {},

  methods: {
    async init() {
      const model = this.$route.meta.model
      const Model = api.env.model(model)
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

    onPageChange(page) {
      this.pageGoto(page)
    },

    onPageSizeChange(page_size) {
      if (this.model) {
        this.model.limit = page_size
        if (this.model.page_number === 1) {
          this.pageGoto()
        }
      }
    },

    async pageGoto(page = 1) {
      if (this.model) {
        await this.model.pageGoto(page)
        this.dataList = [...this.model.values_list]
      }
    },

    handleOnCreate() {
      console.log(' handleOnCreate ')
      const action_ref = this.$route.meta.name
      const path = `/web/${action_ref}/form`
      this.$router.push({ path, query: { move_id: this.move_id } })
    },

    async handleOnRowClick(row) {
      console.log('handleOnRowClick,', row)

      const action_ref = this.$route.meta.name
      const path = `/web/${action_ref}/form`
      this.$router.push({ path, query: { id: row.id, move_id: this.move_id } })
    }
  }
}

export default Mixin
