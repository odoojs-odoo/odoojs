import api from '@/odooapi'
import routesMixin from './routesMixin'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

const Mixin = {
  mixins: [routesMixin],
  data() {
    return {
      routes: [],
      viewInfo: {},
      actionInfo: {}, // action view info
      viewType: '', // kanban/list/pivot/... view 切换
      viewMode: [], //  kanban/list/pivot/... view 切换

      calendarData: undefined, // calendar toolbar  和  calendarview 通讯
      searchValue2: undefined, // searchBox 和 searchBtn 通讯
      defaultSearchValue: undefined,
      searchValue: {}, // 全局用的 搜索条件

      activeIds: [], // listview 通知 toolbar.

      // for form view
      editable: false,

      // pivot toolbar  和  pivot view 通讯
      pivotData: {}
    }
  },
  computed: {
    pageHeaderTitle() {
      return this.actionInfo.display_name || this.actionInfo.name
    }
  },

  async created() {},

  methods: {
    async init() {
      this.load_routes()
      // console.log(this.$route)
      this.viewInfo = {}
      this.actionInfo = {}

      this.viewMode = []
      this.viewType = ''

      this.searchValue2 = undefined
      this.defaultSearchValue = undefined
      this.searchValue = {}
      this.calendarData = undefined

      this.activeIds = []

      this.editable = false

      const query = this.$route.query
      const { action: actionId, view_type: viewType } = query
      const { active_id } = query
      const active_id2 = active_id && Number(active_id)

      // console.log(cp(this.$route.meta || {}))

      const _get_view_info = async () => {
        // console.log(cp(this.$route.meta.routes || []))
        const { routes: routes_old = [] } = this.$route.meta

        const route_me_index = routes_old.findIndex(
          item => item.fullPath === this.$route.fullPath
        )

        if (route_me_index >= 0) {
          const route_me = routes_old[route_me_index]
          const { action, context } = route_me
          const views_get = async () => {
            const { views: views_in } = route_me
            if (views_in) return views_in
            const views_new = await api.Action.load_views({ context, action })
            route_me.views = views_new
            return views_new
          }
          const views = await views_get()
          const info = { context, action, views }
          this.$route.meta.routes = routes_old.slice(0, route_me_index + 1)
          return info
        } else {
          const context2 = api.web.session.context

          const active_context = active_id2
            ? { active_id: active_id2, active_ids: [active_id2] }
            : {}
          const additional_context = active_id2 ? active_context : undefined
          const kw = additional_context ? { additional_context } : {}
          const action = await api.Action.load(actionId, kw)
          const context = { ...context2, ...active_context }
          const views = await api.Action.load_views({ context, action })
          const info = { context, action, views }

          this.$route.meta.routes = []

          const active_query = active_id ? { active_id } : {}

          this.push_route_no_router({
            path: '/web',
            query: { action: actionId, ...active_query },
            breadcrumbName: action.display_name || action.name,
            action,
            context,
            views
          })

          if (viewType === 'form') {
            this.push_route_no_router({
              path: '/web',
              query,
              breadcrumbName: '',
              action,
              context,
              views
            })
          }

          this.save_routes()

          return info
        }
      }

      const viewInfo = await _get_view_info()
      const { action } = viewInfo
      this.actionInfo = action
      this.viewInfo = viewInfo
      const searchValue = await api.Views.search.default_value(viewInfo)
      this.defaultSearchValue = searchValue
      this.searchValue = searchValue

      const actionType = action.type

      const routes = this.$route.meta.routes || []
      // console.log(this.$route)
      this.routes = [...routes]

      //

      if (action.type === 'ir.actions.client2') {
        console.log('建设中 client2 :', action)
        // this.$message.info(`建设中..., act_url`)
      } else if (action.type === 'ir.actions.act_url') {
        console.log('建设中 act_url :', action.url)
        this.$message.info(`建设中..., act_url`)
      } else if (action.type === 'ir.actions.report') {
        console.log('建设中 report :', action.type)
        this.$message.info(`建设中..., ${action.type}`)
      } else if (actionType === 'ir.actions.act_window') {
        if (action.target === 'inline') {
          this.viewType = 'form'
          console.log('action.target=inline. config form')
        } else if (
          ['current', 'main'].includes(action.target) ||
          !action.target
        ) {
          if (action.target === 'new') {
            // never here. 在 菜单点击事件中 已经过滤该种情况.
            console.log('error, action.target=new.')
            throw 'error, action.target=new'
          } else if (viewType === 'form') {
            const resId = query.id ? parseInt(query.id) : undefined
            if (!resId) this.editable = true

            const editable = this.$route.meta.editable
            // console.log('this.$route', [editable], this.$route)
            // form view 复制按钮 , 带过来的信息
            if (editable) {
              this.editable = true
              delete this.$route.meta.editable
            }

            this.viewType = 'form'
          } else {
            const view_mode = api.Action.view_mode(viewInfo)
            this.viewMode = view_mode.filter(
              mode =>
                !['search', 'form', 'gantt', 'qweb', 'activity'].includes(mode)
            )

            // tree, list, kanban, pivot, calendar, graph,
            // gantt view 只有 mrp 模块中出现三次
            // qweb view 只有 sale_timesheet 模块中出现一次
            // activity view 的 功能, form view 中 安排活动 按钮中实现

            if (!this.viewMode.length) {
              console.log('TBD, action.view_mode,', action.view_mode)
              throw `TBD,view_mode,  ${action.view_mode}`
            }

            const viewType2 = this.viewMode[0]
            this.viewType = viewType2
          }
        } else {
          console.log('TBD, action.target', action.target)
          // ('current', 'Current Window'),
          // ('new', 'New Window'),
          // ('inline', 'Inline Edit'),
          // ('fullscreen', 'Full Screen'),
          // ('main', 'Main action of Current Window')

          throw 'TBD, action.target'
        }
      } else {
        console.log('TBD, actionType ', actionType)

        throw `TBD, ${actionType}`
      }
    },

    handleToolbarEvent(event_name, ...args) {
      // 搜索条件 改变, 通知 listview 刷新数据
      if (event_name === 'on-search-change') this.handleOnSearchChange(...args)
      // for 日历视图,
      else if (event_name === 'on-change-pivot') this.handleChangePivot(...args)
      else if (event_name === 'on-change-calendar')
        this.handleChangeCalendar(...args)
      // 创建按钮, 跳转到 formview,
      else if (event_name === 'on-new') this.handleOnCreate(...args)
      // 通知, listview,
      else if (event_name === 'on-list-event') this.handleListEvent(...args)
      // 通知, formview,
      else if (event_name === 'on-form-event') this.handleFormEvent(...args)
    },

    handleOnSearchChange(value) {
      // console.log(' handleOnSearchChange ', value, cp(this.searchValue))
      this.searchValue = value
      const viewref = `${this.viewType}View`
      console.log('viewref', viewref)
      this.$refs[viewref].handleOnEvent('on-search-change', value)
    },

    async handleChangePivot(value) {
      const viewref = `${this.viewType}View`
      console.log('viewref', viewref)
      this.$refs[viewref].handleOnEvent('on-change-pivot', value)
    },

    async handleChangeCalendar(value) {
      const viewref = `${this.viewType}View`
      console.log('viewref', viewref)
      this.$refs[viewref].handleOnEvent('on-change-calendar', value)
    },

    async handleOnCreate() {
      // console.log(' handleOnCreate ', this.viewInfo)
      // this.$route.meta.viewInfo
      //

      const { query: query_old } = this.$route
      const { active_id } = query_old
      const active_query = active_id ? { active_id } : {}

      const { action, context, views } = this.viewInfo
      const query = { action: action.id, view_type: 'form', ...active_query }

      if (this.viewType === 'form') {
        this.replace_route({ path: '/web', query })
      } else {
        this.push_route({
          path: '/web',
          query,
          breadcrumbName: '',
          action,
          context,
          views
        })
      }
    },

    handleFormEvent(event_name, ...args) {
      this.$refs.formView.handleOnEvent(event_name, ...args)
    },

    handleListEvent(event_name, ...args) {
      this.$refs.listView.handleOnEvent(event_name, ...args)
    },

    handleOnRowSelect(activeIds) {
      this.activeIds = activeIds
    }

    // async handleReload() {
    //   console.log(' reload')

    //   await api.reload()

    //   const path = `/home`
    //   this.$router.replace({ path })
    // }
  }
}

export default Mixin
