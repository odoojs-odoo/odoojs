import viewMixin from './viewMixin'

export default {
  mixins: [viewMixin],

  props: {
    calendarData: { type: Object, default: () => undefined }
  },

  data() {
    return {
      loading: false,
      dataList: []
    }
  },
  computed: {
    date_start() {
      const node = ((this.viewInfo.views || {}).calendar || {}).node || {}
      // console.log(JSON.parse(JSON.stringify(node)))
      return (node.attrs || {}).date_start
    },

    viewInfoForNode() {
      const viewInfo = this.viewInfo || {}
      const { model, views = {} } = viewInfo
      const { calendar = {} } = views

      // console.log(JSON.parse(JSON.stringify({ ...calendar, model })))
      return { ...calendar, model }
    },

    node() {
      const viewInfo = this.viewInfoForNode
      const { node = { children: [] } } = viewInfo
      // console
      return node
    },

    children_visible() {
      return this.node.children.filter(item => !item.attrs.invisible)
    }
  },

  watch: {
    calendarData: {
      handler: function(newVal) {
        if (newVal && Object.keys(newVal).length) {
          this.fetch_calendar_data()
        }
      },
      deep: true
    }
  },

  async created() {},
  async mounted() {},

  methods: {
    async initData() {
      // console.log(
      //   ' fetch_calendar_data',
      //   JSON.parse(JSON.stringify(this.calendarData || {}))
      // )

      if (this.calendarData && Object.keys(this.calendarData).length) {
        this.fetch_calendar_data()
      }
    },

    async fetch_calendar_data() {
      const model = this.modelGet()
      this.loading = true
      await model.calendar_search_browse(this.calendarData)

      this.loading = false
      this.dataList = [...model.values_list]
    },

    getValue({ node, dataDict }) {
      const fname = node.attrs.name
      const meta = this.viewInfoForNode.fields[fname]
      const fname2 = ['many2one', 'selection'].includes(meta.type)
        ? `${fname}__name`
        : fname

      return dataDict[fname2]
    }
  }
}
