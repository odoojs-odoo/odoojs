import KBNodeMixin from './KBNodeMixin'

import ODefaultKanban from './ODefaultKanban.vue'
import OAccountKanban from './OAccountKanban.vue'
import OStockKanban from './OStockKanban.vue'
import OProjectKanban from './OProjectKanban.vue'
import OKBProjectTasks from './OKBProjectTasks.vue'

export default {
  name: 'OKanban',
  components: {
    ODefaultKanban,
    OAccountKanban,
    OStockKanban,
    OProjectKanban,
    OKBProjectTasks
  },

  mixins: [KBNodeMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  watch: {},
  async created() {},
  async mounted() {},

  render(createElement) {
    // console.log(cp(this.node), cp(this.record))

    const tag_get = () => {
      //
      const view_node_class = this.view_node.attrs.class || ''
      // console.log(view_node_class)
      if (view_node_class.includes('o_account_kanban')) return 'OAccountKanban'
      else if (view_node_class.includes('o_stock_kanban')) return 'OStockKanban'
      else if (view_node_class.includes('o_project_kanban'))
        return 'OProjectKanban'
      else if (view_node_class.includes('o_kanban_project_tasks'))
        return 'OKBProjectTasks'
      else return 'ODefaultKanban'
    }

    const tagName2 = tag_get()

    return createElement(tagName2, {
      props: {
        dataInfo: this.dataInfo,
        viewInfo: { ...this.viewInfo }
      },
      on: {
        'on-event': this.handleOnEvent,
        'on-row-click': () => this.$emit('on-row-click')
      }
    })
  },

  methods: {}
}
