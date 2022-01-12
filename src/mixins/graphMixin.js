import api from '@/odooapi'
import treeSearchMixin from './treeSearchMixin'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

export default {
  components: {},
  mixins: [treeSearchMixin],

  props: {
    toolbar: { type: Boolean, default: false },
    pivotData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {}
  },

  computed: {
    // pivotInfo() {
    //     const { views = {} } = this.viewInfo
    //     const { fields = {} } = views
    //     const measures_all = this.measures_all
    //     const groupbys = this.groupbys
    //     const rows = this.is_swap ? this.cols : this.rows
    //     const cols = this.is_swap ? this.rows : this.cols
    //     const measures = this.measures

    //     return { fields, groupbys, measures_all, rows, cols, measures }
    //   },

    viewType() {
      return 'graph'
    },

    pivotData2: {
      get() {
        return this.pivotData
      },

      set(val) {
        this.$emit('update:pivotData', val)
      }
    },

    defaultPivotData() {
      const pivotData = api.Views[this.viewType].default_pivot_data({
        ...this.viewInfo2,
        node: this.node
      })

      return pivotData
    },

    measures: {
      get() {
        return this.pivotData.measures || this.defaultPivotData.measures
      },
      set(val) {
        this.pivotData2 = { ...this.pivotData2, measures: [...val] }
      }
    },

    rows: {
      get() {
        return this.pivotData.rows || this.defaultPivotData.rows
      },
      set(val) {
        this.pivotData2 = { ...this.pivotData2, rows: [...val] }
      }
    },

    cols: {
      get() {
        return this.pivotData.cols || this.defaultPivotData.cols
      },
      set(val) {
        this.pivotData2 = { ...this.pivotData2, cols: [...val] }
      }
    },

    measures_all() {
      return api.Views[this.viewType].pivot_measures_all({
        ...this.viewInfo2,
        node: this.node
      })
    },

    groupbys() {
      return api.Views[this.viewType].pivot_groupbys({
        ...this.viewInfo2,
        node: this.node
      })
    }
  },

  watch: {},
  async created() {},

  mounted() {
    // console.log('graph, mounted', cp(this.measures_all))
    // console.log('graph, mounted groupbys,', cp(this.groupbys))
  },

  methods: {
    async load_data(search) {
      this._load_data({ search })
    },

    async _load_data(payload = {}) {
      const { search, measures } = payload
      //   console.log('_load_data,')
      //   console.log('graph,', cp(this.node))

      const res = await api.Views[this.viewType].load_data(this.viewInfo2, {
        search: search || this.searchValue,
        rows: this.rows,
        cols: this.cols,
        measures: measures || this.measures
      })
      this.data = res
    },

    handleOnEvent(event_name, ...args) {
      // search value change
      if (event_name === 'on-search-change') this.handleOnSearchChange(...args)
      if (event_name === 'on-change-pivot') this.handleOnPivotChange(...args)
    },

    async handleOnPivotChange(payload) {
      // console.log(' handleOnPivotChange, ', payload)

      const { type } = payload

      if (type === 'measure') {
        const { field, value } = payload
        return await this.olap_change_measure(field, value)
      }
    },

    async olap_change_measure(field, ckecked) {
      //   console.log('olap_change_measure,', field, ckecked)

      // const  { type: 'measure', field: '__count', value: true} = payload
      const measures = this.measures
      if (ckecked) {
        if (!measures.includes(field)) {
          const meas = [...measures, field]
          const measures2 = [
            ...Object.keys(this.measures_all),
            '__count'
          ].filter(item => meas.includes(item))
          this.measures = measures2
          this._load_data({ measures: measures2 })
        }
      } else {
        if (measures.includes(field)) {
          this.measures = measures.filter(item => item !== field)
        }
      }
    }
  }
}
