import treeViewMixin from '@/mixins/treeViewMixin'

import api from '@/odooapi'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default {
  mixins: [treeViewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    viewType() {
      return 'kanban'
    },

    kanban_class() {
      const node = this.node || {}
      const arr = ['o_kanban_view', ' o_kanban_ungrouped']
      if (node.attrs.class) arr.push(node.attrs.class)
      return arr.join(' ')
    }
  },
  watch: {},

  async created() {},

  mounted() {},

  methods: {
    render_kanban(record) {
      const node = api.Views.kanban.render_kanban(this.viewInfo2, record)
      // console.log('render_kanban1', cp(this.viewInfo2), cp(this.node))
      // console.log('render_kanban2', cp(record), cp(node))
      return node
    },

    async handleOnRowClick2(row) {
      this.handleOnRowClick(row)
    },

    handleOnEvent(event_name, ...args) {
      // console.log(' handleOnViewEvent, ', event_name, args)
      if (event_name === 'on-search-change') this.handleOnSearchChange(...args)
      else if (event_name === 'on-write-ok') this.handleOnwriteOK(...args)
      else if (event_name === 'action-return') this.handleActionReturn(...args)
      // // action, wizard form, button click return, reload data
      // if (event_name === 'on-wizard-ok') this.handleOnWizardOk(...args)
    },

    async handleOnwriteOK() {
      this.fresh_data()
    },

    async handleActionReturn(result) {
      // console.log('kanban view, action_return', result)
      return this.action_return(result)
    }
  }
}
