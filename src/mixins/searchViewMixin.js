import api from '@/odooapi'

import viewMixin from './viewMixin'

export default {
  mixins: [viewMixin],

  props: {
    viewType2: { type: String, default: '' },
    defaultValue: { type: Object, default: () => undefined },
    value: { type: Object, default: () => undefined }
  },

  data() {
    return {}
  },
  computed: {
    viewType() {
      return 'search'
    },

    searchBoxValue() {
      return api.Views.search.display_value(this.viewInfo2, this.searchValue)
    },

    searchBtnOptions() {
      return api.Views.search.filter_options(this.viewInfo2, this.searchValue)
    },

    groupbyBtnOptions() {
      return api.Views.search.groupby_options(this.viewInfo2, this.searchValue)
    },

    filtersBtnOptions() {
      return api.Views.search.filters_options(this.viewInfo2, this.searchValue)
    },

    searchFields() {
      return api.Views.search.search_options(this.viewInfo2, this.searchValue)
    }
  },
  watch: {
    defaultValue: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newVal, oldval) {
        // console.log('watch, defaultValue, val', newVal, oldval)
        if (newVal) this.$emit('update:searchValue', newVal)
      },
      deep: true,
      immediate: true
    },

    value: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newVal, oldval) {
        // console.log('watch, value, val', newVal, oldval)
        if (newVal) this.$emit('update:searchValue', newVal)
      },
      deep: true,
      immediate: true
    }
  },

  async created() {},

  mounted() {},

  methods: {
    searchM2oOptionMethod(payload) {
      return api.Views.search.get_selection(this.viewInfo2, payload)
    },

    async handleOnSearchUnlink(res_id, cb) {
      // console.log(values)
      const res = await api.Views.search.unlink_filter(
        this.viewInfo2,
        res_id,
        this.searchValue
      )
      cb(res)
    },

    async handleOnSearchSubmit(values, cb) {
      // console.log(values)
      const res = await api.Views.search.submit_filter(
        this.viewInfo2,
        values,
        this.searchValue
      )
      cb(res)
    },

    handleOnSearchSelect(name, value) {
      const value2 = api.Views.search.onchange(
        this.viewInfo2,
        this.searchValue,
        { name, value }
      )

      this.$emit('input', value2)

      this.$emit('on-event', 'on-search-change', value2)
    }
  }
}
