import api from '@/api'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

const Mixin = {
  data() {
    return {
      actionTarget: '',

      model: undefined,
      initReady: false,

      // for Wizard formview
      showWizard: 0,
      wizardModel: undefined,

      // listview 通知 toolbar.
      activeIds: [],

      // searchBox 和  searchBtn 通讯
      searchChange: 0,

      // calendar toolbar  和  calendarview 通讯
      calendarData: {},

      // pivot toolbar  和  pivot view 通讯
      pivotData: {},

      // for form view
      editable: false,

      // for toolbar
      actionId: '',
      actionType: '',
      actionName: '',

      viewType: '',
      viewMode: [],
      hideButton: {}
    }
  },
  computed: {},

  watch: {},

  async created() {},

  methods: {
    modelGet() {
      return this.model
    },

    async init() {
      this.initReady = false
      this.model = undefined
      this.editable = false
      this.viewMode = []
      this.viewType = ''

      this.actionTarget = ''

      this.hideButton = {}
      this.activeIds = []

      this.showWizard = 0

      const query = this.$route.query

      const { action: actionId, view_type: viewType } = query
      const { active_id } = query
      const active_id2 = active_id && Number(active_id)

      this.actionId = actionId

      const action = await api.action(actionId, { active_id: active_id2 })

      this.action = action
      this.actionName = action.action_name

      this.actionType = action.type

      if (action.type === 'ir.actions.act_window') {
        const model = action.model
        this.model = model

        this.actionTarget = action.target

        // console.log(
        //   'view_info',
        //   action.target,
        //   JSON.parse(JSON.stringify(model.view_info))
        // )

        if (['current', 'main'].includes(action.target)) {
          if (viewType === 'form') {
            this.viewType = 'form'
            this.hideButton = { ...model.hide_button() }
            const resId = query.id ? parseInt(query.id) : undefined
            if (!resId) this.editable = true
          } else {
            this.viewMode = action.view_mode.filter(
              mode =>
                !['search', 'form', 'gantt', 'qweb', 'activity'].includes(mode)
            )

            // tree, list, kanban, pivot, calendar, graph,

            // gantt view 只有 mrp 模块中出现三次
            // qweb view 只有 sale_timesheet 模块中出现一次
            // activity view 的 功能, form view 中 安排活动 按钮中实现

            if (!this.viewMode.length) {
              console.log('TBD, action.view_mode,', action.view_mode)
              throw 'TBD, action.view_mode'
            }

            this.viewType = this.viewMode[0]
            model.with_view(this.viewType)
            this.hideButton = { ...model.hide_button() }
          }
        } else if (action.target === 'inline') {
          // res.config.settings/onchange
          // model.env('res.config.settings').onchange()
          // const res = await model.onchange()

          const context = action.get_context()
          console.log('TBD, inline.', context, action)

          // this.viewType = 'form'
          // this.hideButton = { ...model.hide_button() }

          // this.editable = true
        } else {
          console.log('TBD, action.target', action.target)
          // ('current', 'Current Window'),
          // ('new', 'New Window'),
          // ('inline', 'Inline Edit'),
          // ('fullscreen', 'Full Screen'),
          // ('main', 'Main action of Current Window')

          throw 'TBD, action.target'
        }
      } else if (action.type === 'ir.actions.server') {
        console.log('TBD, action.type server ')
        const action2 = await action.run()
        console.log('TBD, action.type server 2', action2)
        this.handleOnActionReturn(action2)
        // throw 'TBD, action.type server'
      } else {
        console.log('TBD, action.type ', action.type)
        throw 'TBD, action.type'
      }

      this.initReady = true
    },

    wizardModelGet() {
      return this.wizardModel
    },

    async handleOnActionReturn(action) {
      // console.log('handleOnAction', action, action.type, action.target)
      if (action.type === 'ir.actions.act_url') {
        console.log('建设中 act_url :', action.url)
        this.$message.info(`建设中..., act_url`)
      } else if (action.type === 'ir.actions.report') {
        console.log('建设中 report :', action.type)
        this.$message.info(`建设中..., ${action.type}`)
      } else if (action.type === 'ir.actions.act_window') {
        // console.log('act_window :', action, action.target)

        if (action.target === 'new') {
          // console.log('new modal', this.showWizard, action)
          // this.actionTarget = action.target
          this.wizardModel = action.model
          this.showWizard = this.showWizard + 1
          // console.log('new modal2', this.showWizard, action)
        } else if (['current', 'main'].includes(action.target)) {
          console.log(action.target, 'current  router', action)
          const res_id = action.res_id
          const action_id = action.id
          const query = {
            action: action_id,
            active_id: action.env.context.active_id,
            ...(res_id ? { view_type: 'form', id: res_id } : {})
          }
          // console.log(action.target, query)
          const path = `/web`
          this.$router.push({ path, query })
        } else {
          console.log(action.target, 'TBD')
          //     console.log(' TBD form:', action.type, action)
          //     // TBD next action
          //     //   this.showModal = true
        }
      } else {
        console.log(' TBD form:', action.type, action)
        // TBD next action
        //   this.showModal = true
      }
    },

    handleToolbarEvent(event_name, ...args) {
      // 搜索条件 改变, 通知 listview 刷新数据
      if (event_name === 'on-search-change') this.handleOnSearchChange(...args)
      // for 日历视图,
      else if (event_name === 'on-change-calendar')
        this.handleChangeCalendar(...args)
      // 创建按钮, 跳转到 formview,
      else if (event_name === 'on-new') this.handleOnCreate(...args)
      // 通知, listview,
      else if (event_name === 'on-list-event') this.handleListEvent(...args)
      // 通知, formview,
      else if (event_name === 'on-form-event') this.handleFormEvent(...args)
    },

    handleOnSearchChange() {
      console.log(' handleOnSearchChange ')
      this.searchChange = this.searchChange + 1
    },

    async handleChangeCalendar(calendar) {
      this.calendarData = { ...calendar }
    },

    async handleOnCreate() {
      // console.log(' handleOnCreate ')
      const path = `/web`
      const query = { action: this.actionId, view_type: 'form' }
      this.$router.push({ path, query })
    },

    handleFormEvent(event_name, ...args) {
      this.$refs.formView.handleOnEvent(event_name, ...args)
    },

    handleListEvent(event_name, ...args) {
      this.$refs.listView.handleOnEvent(event_name, ...args)
    },

    handleOnRowSelect(activeIds) {
      this.activeIds = activeIds
    },

    async handleReload() {
      console.log(' reload')

      await api.reload()

      const path = `/home`
      this.$router.replace({ path })
    }
  }
}

export default Mixin
