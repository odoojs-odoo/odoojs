import api from '@/odooapi'

export default {
  components: {},
  mixins: [],

  props: {
    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },

    searchValue: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      data: {}
    }
  },
  computed: {
    viewType() {
      // to override, set view type
      return ''
    },

    records() {
      const { records = [] } = this.data
      return records
    },

    view() {
      const { views = {} } = this.viewInfo
      const { fields_views = {} } = views
      const view = fields_views[this.viewType] || {}
      return view
    },

    viewInfo2() {
      return { ...this.viewInfo, view: this.view }
    },

    node() {
      // console.log(this.viewType)
      return api.Views[this.viewType].view_node(this.viewInfo2)
    }
  },

  methods: {}
}
