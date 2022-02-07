import api from '@/odooapi'

import W2SaleHome from './W2SaleHome'
import W2PurchaseHome from './W2PurchaseHome'
import W2CashHome from './W2CashHome'
import W2FinanceHome from './W2FinanceHome'
import W2StockHome from './W2StockHome'
import W2MrpHome from './W2MrpHome'

const mods = {
  sale: 'W2SaleHome',
  purchase: 'W2PurchaseHome',
  cash: 'W2CashHome',
  finance: 'W2FinanceHome',
  stock: 'W2StockHome',
  mrp: 'W2MrpHome'
}

export default {
  name: 'Web2Home',

  components: {
    W2SaleHome,
    W2PurchaseHome,
    W2CashHome,
    W2FinanceHome,
    W2StockHome,
    W2MrpHome
  },

  mixins: [],

  props: {
    webName: { type: String, default: '' }
  },

  data() {
    return {}
  },
  computed: {},
  watch: {},

  async created() {},

  mounted() {},

  render(createElement) {
    console.log([this.webName])
    const tag = mods[this.webName]
    if (tag) {
      return createElement(tag, {
        props: {
          // dataInfo: this.dataInfo,
          // viewInfo: { ...this.viewInfo }
        },
        on: {
          'on-event': this.handleOnEvent
          // 'on-row-click': () => this.$emit('on-row-click')
        }
      })
    } else {
      return createElement('span', {}, ['web2home'])
    }
  },

  methods: {
    handleOnEvent(event_name, ...args) {
      // console.log('node,handleOnEvent,  ', event_name, ...args)

      if (event_name === 'on-action') this.handleOnAction(...args)

      // if (event_name === 'button-clicked') this.handleButtonClicked(...args)
      // else if (event_name === 'on-write') this.handleOnwrite(...args)
      // else if (event_name === 'on-write-ok')
      //   this.$emit('on-event', event_name, ...args)
      // else if (event_name === 'action-return')
      //   this.$emit('on-event', event_name, ...args)
    },

    async handleOnAction(query) {
      const { action: actionId, view_type: viewType } = query
      const { id: resId, active_id } = query

      console.log('handleOnAction,  ', query)
      // const action = await api.Action.load(action_id)
      // console.log('handleOnAction 9,  ', action)

      const context2 = api.web.session.context

      const active_context = active_id
        ? { active_id, active_ids: [active_id] }
        : {}
      const additional_context = active_id ? active_context : undefined
      const kw = additional_context ? { additional_context } : {}
      const action = await api.Action.load(actionId, kw)
      const context = { ...context2, ...active_context }
      const views = await api.Action.load_views({ context, action })
      const defaultSearchValue = await api.Views.search.default_value({
        action,
        context,
        views
      })

      this.$emit('on-event', 'on-router', {
        query: { action: actionId },
        breadcrumbName: action.display_name || action.name,
        action,
        context,
        views,
        defaultSearchValue
      })
    },

    onclick() {
      console.log([api])
    }
  }
}
