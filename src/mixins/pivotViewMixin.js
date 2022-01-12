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
    return {
      is_swap: false
    }
  },

  computed: {
    pivotInfo() {
      const { views = {} } = this.viewInfo
      const { fields = {} } = views
      const measures_all = this.measures_all
      const groupbys = this.groupbys
      const rows = this.is_swap ? this.cols : this.rows
      const cols = this.is_swap ? this.rows : this.cols
      const measures = this.measures

      return { fields, groupbys, measures_all, rows, cols, measures }
    },

    pivotData2: {
      get() {
        return this.pivotData
      },

      set(val) {
        this.$emit('update:pivotData', val)
      }
    },

    viewType() {
      return 'pivot'
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

    groupbys() {
      return api.Views[this.viewType].pivot_groupbys({
        ...this.viewInfo2,
        node: this.node
      })
    },

    measures_all() {
      return api.Views[this.viewType].pivot_measures_all({
        ...this.viewInfo2,
        node: this.node
      })
    }
  },

  watch: {},
  async created() {},

  mounted() {
    // console.log('pivot, mounted', cp(this.viewInfo2))
    // console.log('pivot, mounted node,', cp(this.node))
  },

  methods: {
    async load_data(search) {
      this._load_data({ search })
    },

    async _load_data(payload = {}) {
      const { search, measures } = payload
      // console.log('load_data', cp(this.node), this.searchValue)
      // console.log('load_data2', this.measures)

      const callback = res => {
        // console.log('load_data2,', cp(res))
        this.data = res
      }

      const res = await api.Views[this.viewType].load_data(this.viewInfo2, {
        search: search || this.searchValue,
        rows: this.rows,
        cols: this.cols,
        measures: measures || this.measures,
        records: this.records,
        callback
      })
      this.data = res
    },

    handleOnEvent(event_name, ...args) {
      // search value change
      if (event_name === 'on-search-change') this.handleOnSearchChange(...args)
      if (event_name === 'on-change-pivot') this.handleOnPivotChange(...args)
    },

    async olap_change_measure(field, ckecked) {
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
    },

    pivot_swap() {
      // console.log('handleOnPivotChange, swap,')
      this.is_swap = !this.is_swap
    },

    async pivot_unfold(type, kwargs = {}) {
      const swap = { row: 'col', col: 'row' }
      const type2 = this.is_swap ? swap[type] : type
      // console.log('pivot_unfold,', type2, cp(kwargs))

      const { domain, groupby, dims, next } = kwargs

      if (type2 === 'row') {
        // if (!this.rows.includes(next)) this.rows = [...this.rows, next]

        const callback = res => {
          // console.log('pivot_unfold,', cp(res))
          const { rows, records } = res
          this.rows = rows
          this.data = { records }
        }

        const res = await api.Views[this.viewType].load_data_row(
          this.viewInfo2,
          {
            parent_info: { dims, groupby },
            domain,
            dim: next,
            rows: this.rows,
            cols: this.cols,
            measures: this.measures,
            records: this.records,
            callback
          }
        )
        const { rows, records } = res
        this.rows = rows
        this.data = { records }
      } else {
        // if (!this.cols.includes(next)) this.cols = [...this.cols, next]

        const callback = res => {
          // console.log('pivot_unfold,', cp(res))
          const { cols, records } = res
          this.cols = cols
          this.data = { records }
        }

        const res = await api.Views[this.viewType].load_data_col(
          this.viewInfo2,
          {
            parent_info: { dims, groupby },
            domain,
            dim: next,
            rows: this.rows,
            cols: this.cols,
            measures: this.measures,
            records: this.records,
            callback
          }
        )
        const { cols, records } = res
        this.cols = cols
        this.data = { records }
      }
    },

    _pivot_fold(type, kwargs = {}) {
      const swap = { row: 'col', col: 'row' }
      const type2 = this.is_swap ? swap[type] : type
      // console.log('_pivot_fold,', type2, cp(kwargs))

      const { groupby, dims, next } = kwargs

      if (type2 === 'row') {
        const res = api.Views[this.viewType].pivot_remove_row(this.viewInfo2, {
          records: this.records,
          parent_info: { dims, groupby },
          dim: next,
          rows: this.rows
          // cols: this.cols,
        })
        const { rows, records } = res
        this.rows = rows
        this.data = { records }
      } else {
        const res = api.Views[this.viewType].pivot_remove_col(this.viewInfo2, {
          records: this.records,
          parent_info: { dims, groupby },
          dim: next,
          // rows: this.rows,
          cols: this.cols
        })
        const { cols, records } = res
        this.cols = cols
        this.data = { records }
      }
    },

    async handleOnPivotChange(payload) {
      // console.log(' handleOnPivotChange, ', payload)

      /*
       * { command, type, field, next, search } = payload
       * command:  swap, select, unselct
       * type: row, column, measure
       * field:
       * next
       * value: {filter, domain, }
       */

      const { command, type, ...kw } = payload

      if (command === 'swap') {
        this.pivot_swap()
      } else if (command === 'unfold') {
        // console.log('handleOnPivotChange, unfold,', command, payload)
        this._load_data()
      } else if (type === 'measure') {
        const { field, value } = payload
        return await this.olap_change_measure(field, value)
      } else if (command === 'fold') {
        return this._pivot_fold(type, kw)
      } else {
        // console.log('handleOnPivotChange, unfold0,', cp(payload))
        return await this.pivot_unfold(type, kw)
      }
    }
  }
}
