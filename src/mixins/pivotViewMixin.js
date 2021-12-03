import viewMixin from './viewMixin'
// const cp = item => JSON.parse(JSON.stringify(item))

export default {
  components: {},
  mixins: [viewMixin],

  props: {
    viewType: { type: String, default: 'pivot' },
    pivotData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    pivotData2: {
      get() {
        return this.pivotData
      },

      set(val) {
        this.$emit('update:pivotData', val)
      }
    }
  },

  watch: {},

  methods: {
    async initData() {
      // console.log('debugName', this.debugName)
      if (this.debugName === 'pivot') this.fetch_pivot_data()
      if (this.debugName === 'graph') this.fetch_graph_data()
      if (this.debugName === 'PivotViewToolbar') this.get_pivot_data()
    },

    async fetch_pivot_data() {
      const model = this.modelGet()

      this.loading = true
      const res = await model.pivot_search_browse()
      // console.log(' fetch_pivot_data', cp(res))
      this.loading = false
      this.pivotData2 = res
    },

    async fetch_graph_data() {
      const model = this.modelGet()

      this.loading = true
      const res = await model.graph_search_browse()
      // console.log(' fetch_pivot_data', cp(res))
      this.loading = false
      this.pivotData2 = res
    },

    get_pivot_data() {
      const model = this.modelGet()
      // console.log('get_pivot_data ', [model.view_type, model.pivot_data])

      if (this.viewType === 'graph') this.pivotData2 = model.graph_data
      else this.pivotData2 = model.pivot_data
    },

    async handleOnPivotChange(payload) {
      const model = this.modelGet()
      this.loading = true

      if (this.viewType === 'graph') {
        const res = await model.graph_change(payload)
        // console.log('graph, data:', model, cp(res || []))
        this.pivotData2 = res
      } else {
        const res = await model.pivot_change(payload)
        // console.log('pivot, data:', model, cp(res))
        this.pivotData2 = res
      }

      this.loading = false
    }
  }
}
