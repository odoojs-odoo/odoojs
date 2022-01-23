import api from '@/odooapi'

export default {
  components: {},
  mixins: [],

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
      // console.log('_action_return', result)
      const { action } = result

      if (action.type === 'ir.actions.act_window' && action.target === 'new') {
        // console.log('btn clicked return action.target = new', action)
        this.wizardViewInfo = result
        this.showWizard = true
      } else {
        this.action_return2(result)
      }
    },
    async action_return2(result) {
      // console.log('_action_return2', result)

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

      this.$route.meta.viewInfo = result
      const { context, action } = result
      const query = {
        action: action.id,
        active_id: context.active_id,
        ...view_type_get(action)
      }

      this.$route.meta.viewInfo = result
      // console.log(action.target, query)
      const path = `/web`
      this.$router.push({ path, query })
    }
  }
}
