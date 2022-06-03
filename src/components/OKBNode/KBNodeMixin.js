import api from '@/odooapi'
import { try_call } from '@/odooapi/tools'
import routesMixin from '@/mixins/routesMixin'

import { search_dropdown_menu, node_remove_dropdown_menu } from './tools'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default {
  components: {},

  mixins: [routesMixin],

  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return { record: {} }
      }
    },

    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {}
  },
  computed: {
    view_node() {
      const { node } = this.viewInfo
      return node
    },

    node_raw() {
      // console.log('node_raw', cp(this.viewInfo))
      const node = api.Views.kanban.render_kanban(
        this.viewInfo,
        this.dataInfo.record
      )

      return cp(node)
    },

    node() {
      const node2 = node_remove_dropdown_menu(this.node_raw)
      return node2
    },

    dropdown_menu_node() {
      const nodes = search_dropdown_menu(this.node_raw)
      //   console.log(node_raw, nodes)
      if (!nodes.length) {
        return {}
      }

      return nodes[0]
    },

    dropdown_menu() {
      return this.dropdown_menu_node.children || []
    },

    className() {
      const arr = []
      const { attrs = {} } = this.node
      if (attrs.class) arr.push(attrs.class)
      arr.push('o_kanban_record')
      return arr.join(' ')
    }
  },

  watch: {},
  async created() {},
  async mounted() {},

  methods: {
    async handleOnRowClick() {
      // console.log('handleOnRowClick to emit')
      this.$emit('on-row-click')
    },

    async handleOnRowClick2() {
      if (this.node.attrs.class.includes('oe_kanban_global_click')) {
        return this.handleOnRowClick()
      } else {
        // o_stock_kanban
        // o_account_kanban
        // console.log('handleOnRowClick2 Do Nothing')
      }
    },

    handleOnEvent(event_name, ...args) {
      // console.log('node,handleOnEvent,  ', event_name, ...args)

      if (event_name === 'button-clicked') this.handleButtonClicked(...args)
      else if (event_name === 'on-write') this.handleOnwrite(...args)
      else if (event_name === 'on-write-ok')
        this.$emit('on-event', event_name, ...args)
      else if (event_name === 'action-return')
        this.$emit('on-event', event_name, ...args)
    },

    async handleOnwrite(values) {
      await api.Views.form.write(this.viewInfo, {
        record: this.dataInfo.record,
        values
      })

      this.$emit('on-event', 'on-write-ok')
    },

    async handleButtonClicked_color_pick(node) {
      const color = Number(node.attrs['data-color'] || '0')
      this.handleOnwrite({ color })
    },

    // eslint-disable-next-line no-unused-vars
    async handleButtonClicked_set_cover(node) {
      // console.log('handleButtonClicked_set_cover1')
      // for project.task
    },

    async handleButtonClicked_edit() {
      console.log('handleButtonClicked, edit', this.$route)
      const { query: query_old } = this.$route
      const { active_id } = query_old
      const active_query = active_id ? { active_id } : {}

      this.$route.meta.editable = true

      const { action, context, views } = this.viewInfo
      const res_id = this.dataInfo.record.id
      const query_new = { action: action.id, view_type: 'form', id: res_id }
      const query = { ...query_new, ...active_query }
      this.push_route({ query, breadcrumbName: '', action, context, views })

      return
    },

    async handleButtonClicked_delete() {
      // console.log(
      //   'handleButtonClicked_delete',
      //   node,
      //   this.viewInfo,
      //   this.dataInfo
      // )

      const { error, result } = await try_call(async () => {
        const res_id = this.dataInfo.record.id
        await api.Views.list.unlink(this.viewInfo, res_id)
        return true
      })
      // console.log('handleButtonClicked', [error, result])

      if (error) {
        console.log('btn click2 error', [error, result])
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.$emit('on-event', 'on-write-ok')
      }
    },

    async handleButtonClicked_call(node) {
      const { error, result } = await try_call(async () => {
        return await api.Node.button_clicked(this.viewInfo, {
          node,
          record: this.dataInfo.record
        })
      })
      // console.log('handleButtonClicked', [error, result])

      if (error) {
        console.log('btn click2 error', [error, result])
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        if (!result) {
          this.$emit('on-event', 'on-write-ok')
        } else {
          this.$emit('on-event', 'action-return', result)
        }
      }
    },

    async handleButtonClicked(node) {
      // console.log('handleButtonClicked', node, this.viewInfo, this.dataInfo)
      const type = node.attrs.type

      if (!type) {
        const node_class = node.attrs.class
        const is_upload_bill =
          node_class.includes('oe_kanban_action_button') &&
          node_class.includes('o_button_upload_bill')

        const is_action_a =
          node_class.includes('oe_kanban_action') &&
          node_class.includes('oe_kanban_action_a')

        const is_color_set =
          node_class.includes('oe_kanban_color_') && node.attrs['data-color']

        // class: "oe_kanban_color_9"
        // data-color: "9"

        if (is_upload_bill) {
          console.log('todo: o_button_upload_bill ')
        } else if (is_action_a) {
          return this.handleButtonClicked_edit(node)
        } else if (is_color_set) {
          return this.handleButtonClicked_color_pick(node)
        } else {
          console.log('todo ')
        }

        return
      } else if (type === 'edit') {
        return this.handleButtonClicked_edit(node)
      } else if (type === 'set_cover') {
        return this.handleButtonClicked_set_cover(node)
      } else if (type === 'delete') {
        return this.handleButtonClicked_delete(node)
      } else if (['object', 'action'].includes(type)) {
        return this.handleButtonClicked_call(node)
      } else {
        console.log('todo handleButtonClicked', type)
        return
      }
    }
  }
}
