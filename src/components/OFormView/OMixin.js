import { tools } from '@/odoojs'

export default {
  components: {},
  props: {
    loading: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },

    dataInfo: {
      type: Object,
      default: () => {
        return { dataDict: {} }
      }
    },

    viewInfo: {
      type: Object,
      default: () => {
        return { fields: {}, node: { children: [] } }
      }
    },

    methodCall: { type: Function, default: () => undefined }
  },
  data() {
    return {}
  },
  computed: {
    debug() {
      return tools.debug
    },

    node() {
      return this.viewInfo.node || { children: [] }
    },

    res_model() {
      return this.viewInfo.model
    },

    dataDict() {
      return this.dataInfo.dataDict || {}
    },

    fullname() {
      return this.node.fullName
    },

    children_visible() {
      return this.childern_filter(this.node.children)
    },

    invisible_by_oe_read_or_edit_only() {
      const node = this.node
      const oe_read_only = (node.class || '').includes('oe_read_only')
      const oe_edit_only = (node.class || '').includes('oe_edit_only')
      const editable = this.editable

      // console.log(node, oe_read_only, oe_edit_only, editable)
      return (editable && oe_read_only) || (!editable && oe_edit_only)
    }
  },

  watch: {},

  async created() {},
  async mounted() {},

  methods: {
    handleOnEvent(event_name, ...args) {
      this.$emit('on-event', event_name, ...args)
    },

    get_invisible(node) {
      return tools.node_invisible(node, {
        data_info: this.dataInfo,
        view_info: this.viewInfo
      })
    },

    childern_filter(children) {
      return (children || []).filter(item => {
        if (this.debug) {
          return true
        } else {
          return !this.get_invisible(item)
        }
      })
    }
  }
}
