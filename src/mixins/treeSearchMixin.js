import api from '@/odooapi'
import viewMixin from './viewMixin'

export default {
  mixins: [viewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    groupby() {
      const { groupby = [] } = this.data
      // console.log(this.groups)
      return groupby
    }
  },
  watch: {},

  async created() {},

  mounted() {
    // console.log('mounted', this.viewType, cp(this.viewInfo))
    this.load_data()
  },

  methods: {
    async load_data(search) {
      // console.log('load_data', this.viewType)
      this.data = await api.Views[this.viewType].load_data(this.viewInfo2, {
        search: search || this.searchValue
      })
      // console.log(this.data)
    },

    handleOnEvent(event_name, ...args) {
      // search value change
      if (event_name === 'on-search-change') this.handleOnSearchChange(...args)
    },

    async handleOnSearchChange(search) {
      this.load_data(search)
    }
  }
}
