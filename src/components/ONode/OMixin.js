import api from '@/odooapi'

export default {
  components: {},
  props: {
    loading: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },

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
    node() {
      return this.viewInfo.node || { children: [] }
    },

    widget() {
      const node = this.node
      const { attrs = {} } = node
      const { widget } = attrs
      return widget
    },

    record() {
      return this.dataInfo.record || {}
    },

    values() {
      return this.dataInfo.values || {}
    },

    invisible() {
      return this.get_invisible(this.node)
    },

    classNameByNode() {
      const arr = []
      const { attrs = {} } = this.node
      if (attrs.class) arr.push(attrs.class)
      // if(this.invisible){
      //   attrs.style = 'display: none;'
      // }
      if (this.invisible) arr.push('o_invisible_modifier')
      return arr
    },

    className() {
      const arr = [...this.classNameByNode]
      return arr.join(' ')
    }
  },

  watch: {},

  async created() {},
  async mounted() {},

  methods: {
    handleOnEvent(event_name, ...args) {
      // console.log('node,handleOnEvent,  ', event_name, ...args)
      this.$emit('on-event', event_name, ...args)
    },

    renderNode2(createElement, node, tagName2) {
      return createElement(tagName2, {
        props: {
          editable: this.editable,
          loading: this.loading,
          dataInfo: this.dataInfo,
          viewInfo: { ...this.viewInfo, node }
        },
        on: { 'on-event': this.handleOnEvent }
      })
    },

    get_classNameByNode(node) {
      const arr = []
      const { attrs = {} } = node
      if (attrs.class) arr.push(attrs.class)
      if (this.get_invisible(node)) arr.push('o_invisible_modifier')

      return arr
    },

    get_className(node) {
      const arr = [...this.get_classNameByNode(node)]
      return arr.join(' ')
    },

    get_invisible(node) {
      return api.Node.invisible(
        { ...this.viewInfo, node },
        { record: this.record, values: this.values }
      )
    }
  }
}
