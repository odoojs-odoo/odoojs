// import api from '@/odoorpc'

export default {
  components: {},
  mixins: [],

  data() {
    return {
      actionInfo: {}, // actionView info
      viewType: 'tree' // kanban/list/pivot/... view 切换
    }
  },

  computed: {},

  watch: {
    // 菜单切换时, 触发
    '$route.fullPath': {
      handler: function (/*val*/) {
        // console.log('in watch, $route.fullPath')
        // console.log('watch fullPath')
        this.init()
      },
      deep: true
    }
  },

  async created() {
    this.init()
  },

  mounted() {},

  methods: {
    init() {
      const query = this.$route.query
      // console.log('--- query ---',query);
      const { view_type: viewType } = query
      // const actionId = api.tools.path2action_id(this.$route.path)
      // const actionInfo = api.env.action_info_get(actionId)

      // this.actionInfo = actionInfo
      this.viewType = viewType
    }
  }
}
