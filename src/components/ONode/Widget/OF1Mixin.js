import OMixin from '../OMixin'

import api from '@/odooapi'

export default {
  components: {},
  mixins: [OMixin],

  props: {},
  data() {
    return {}
  },
  computed: {
    fname() {
      return this.node.attrs.name
    },

    field() {
      const { view = {} } = this.viewInfo
      const { fields = {} } = view
      const meta = fields[this.fname] || {}
      return meta
    },

    widget() {
      const node = this.node
      const { attrs = {} } = node
      const { widget } = attrs
      return widget
    },

    readonly() {
      return this.get_readonly(this.node)
    },

    required() {
      return this.get_required(this.node)
    },

    edit_only() {
      if (this.classNameByNode.includes('oe_edit_only')) return 'oe_edit_only'
      else return ''
    },

    classNameByField() {
      const arr = [...this.classNameByNode]
      if (this.readonly) arr.push('o_readonly_modifier')
      if (this.required) arr.push('o_required_modifier')
      arr.push('o_field_widget')
      return arr
    },

    className() {
      const arr = [...this.classNameByField]
      //  被 override

      return arr.join(' ')
    }
  },

  watch: {},

  async created() {},
  async mounted() {},

  methods: {
    get_readonly(node) {
      return api.Node.readonly(
        { ...this.viewInfo, node },
        { record: this.record, values: this.values }
      )
    },

    get_required(node) {
      return api.Node.required(
        { ...this.viewInfo, node },
        { record: this.record, values: this.values }
      )
    }
  }
}
