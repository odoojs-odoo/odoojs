import { tools } from '@/odoojs'
import viewMixin from './viewMixin'

export default {
  mixins: [viewMixin],

  props: {
    searchChange: { type: Number, default: 0 }
  },

  data() {
    return {
      searchInfo: {}
    }
  },
  computed: {
    // for search view

    searchBtnOptions() {
      return tools.search_btn_options({
        search_info: this.searchInfo,
        view_info: this.viewInfo
      })
    },

    searchValues() {
      return tools.search_values({ search_info: this.searchInfo })
    },

    searchFields() {
      return tools.search_fields({
        view_info: this.viewInfo,
        search_info: this.searchInfo
      })
    }
  },
  watch: {
    searchChange() {
      // console.log('watch,searchChange,', newVal, oldVal)
      this.initData()
    }
  },

  async created() {},

  mounted() {},

  methods: {
    async initData() {
      const model = this.modelGet()
      this.searchInfo = JSON.parse(JSON.stringify(model.search_info))
    },

    handleOnSearchSelect(name, value) {
      const model = this.modelGet()
      model.set_search(name, value)
      this.searchInfo = JSON.parse(JSON.stringify(model.search_info))
      // this.initChangeViewType(model)
      this.$emit('on-event', 'on-search-change')
    }
  }
}
