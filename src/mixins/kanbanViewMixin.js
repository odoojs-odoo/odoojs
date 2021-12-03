import treeViewMixin from '@/mixins/treeViewMixin'
import { tools } from '@/odoojs'

export default {
  mixins: [treeViewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    // for kanban
    kanbanInfo() {
      const info = tools.kanban_info({ view_info: this.viewInfo })
      // console.log('xxxx,kanbanInfo,', info)
      return info
    },

    viewInfoForNode() {
      const viewInfo = this.viewInfo || {}
      const { model, views = {} } = viewInfo
      const { kanban = {} } = views

      return { ...kanban, model }
    }
  },
  watch: {},

  async created() {},

  mounted() {},

  methods: {}
}
