import api from '@/odooapi'

import treeSearchMixin from './treeSearchMixin'

export default {
  mixins: [treeSearchMixin],

  props: {
    calendarData: { type: Object, default: () => undefined }
  },

  data() {
    return {}
  },
  computed: {
    viewType() {
      return 'calendar'
    },
    defaultCalendarData() {
      return api.Views.calendar.default_value()
    },

    calendarData2() {
      return this.calendarData || this.defaultCalendarData
    },

    date_start() {
      const node = this.node
      return (node.attrs || {}).date_start
    }
  },

  watch: {},

  async created() {},
  async mounted() {},

  methods: {
    async load_data(search, calendarData) {
      // console.log('load_data', search, calendarData)

      const calendarData2 = calendarData || this.calendarData2

      this.$emit('update:calendarData', calendarData2)

      this.data = await api.Views[this.viewType].load_data(this.viewInfo2, {
        value: calendarData2,
        search: search || this.searchValue
      })

      console.log(this.data)
    },

    handleOnEvent(event_name, ...args) {
      // search value change
      if (event_name === 'on-search-change') this.handleOnSearchChange(...args)
      if (event_name === 'on-change-calendar')
        this.handleChangeCalendar(...args)
    },

    async handleChangeCalendar(value) {
      this.load_data(null, value)
    },

    getValue({ node, record }) {
      const fname = node.attrs.name

      return record[fname]
    }
  }
}
