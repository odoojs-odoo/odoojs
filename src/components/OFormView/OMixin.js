export default {
  components: {},
  mixins: [],

  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },

    dataDict: {
      type: Object,
      default: () => {
        return {}
      }
    },

    editable: { type: Boolean, default: false },

    node: {
      type: Object,
      default: () => {
        return {
          children: []
        }
      }
    },

    modelMethod: { type: Function, default: () => false }
  },

  data() {
    return {}
  },
  computed: {
    debug() {
      return 0
    },

    fullname() {
      return this.node.fullName
    },

    model() {
      return this.modelMethod()
    },
    value2: {
      get() {
        return this.value
      },
      set(/*value*/) {
        // console.log(' value2, ', value, typeof value)
        // this.$emit('input', value)
      }
    },

    invisible_by_oe_read_or_edit_only() {
      const node = this.node
      const oe_read_only = (node.class || '').includes('oe_read_only')
      const oe_edit_only = (node.class || '').includes('oe_edit_only')
      const editable = this.editable
      return (editable && oe_read_only) || (!editable && oe_edit_only)
    },

    children_visible() {
      return this.childern_filter(this.node.children)
    }
  },

  async created() {},

  methods: {
    async handleOnchange(field, value, text) {
      // console.log('handleOnchange', this.fullname, [field, value, text])
      this.$emit('on-change', field, value, text)
    },

    get_invisible(item) {
      if (this.model) {
        const invisible = this.model.get_invisible(item, this.dataDict)
        // console.log(invisible, this.fullname, item)
        return invisible
      } else {
        return false
      }
    },

    childern_filter(children) {
      return (children || []).filter(item => {
        if (this.debug) {
          return true
        } else {
          return !this.get_invisible(item)
        }
      })
    },

    handleButtonClicked(payload) {
      console.log(this.fullname, payload)
      this.$emit('button-clicked', payload)
    }
  }
}
