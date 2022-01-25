import api from '@/odooapi'
import routesMixin from './routesMixin'

export default {
  components: {},
  mixins: [routesMixin],

  props: {
    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },

    searchValue: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      data: {},

      showWizard: false,
      wizardViewInfo: {}
    }
  },
  computed: {
    viewType() {
      // to override, set view type
      return ''
    },

    records() {
      const { records = [] } = this.data
      return records
    },

    view() {
      const { views = {} } = this.viewInfo
      const { fields_views = {} } = views
      const view = fields_views[this.viewType] || {}
      return view
    },

    viewInfo2() {
      return { ...this.viewInfo, view: this.view }
    },

    node() {
      // console.log(this.viewType)
      return api.Views[this.viewType].view_node(this.viewInfo2)
    }
  },

  methods: {
    async action_return(result) {
      // console.log('action_return', result)
      const { action, context } = result

      if (action.type === 'ir.actions.act_window' && action.target === 'new') {
        // console.log('btn clicked return action.target = new', action)
        const views = await api.Action.load_views({ context, action })

        this.wizardViewInfo = { ...result, views }
        this.showWizard = true
      } else {
        this.action_return2(result)
      }
    },

    async action_return2(result) {
      console.log('_action_return2', result)

      const view_type_get = action => {
        if (action.type === 'ir.actions.act_window') {
          if (['current', 'main'].includes(action.target) || !action.target) {
            const res_id = action.res_id
            // form view read
            if (res_id) return { view_type: 'form', id: res_id }
            // form view create
            else if (action.view_mode === 'form') return { view_type: 'form' }
            // list view
            else return {}
          }
        }

        return {}
      }

      const { context, action } = result

      if (action.type === 'ir.actions.act_url') {
        console.log('todo,ir.actions.act_url', action)
        console.log('建设中 act_url :', action.url)
        this.$message.info(`建设中...act_url, ${action.url}`)

        return
      }

      const query = {
        action: action.id,
        ...view_type_get(action),
        active_id: context.active_id
      }

      this.push_route({
        query,
        breadcrumbName: action.display_name || action.name,
        context,
        action
      })
    }
  }
}
