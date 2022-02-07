// import api from '@/odooapi'

// eslint-disable-next-line no-unused-vars
// const cp = val => JSON.parse(JSON.stringify(val))

export default {
  mixins: [],

  props: {
    info: {
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
      const { node = { children: [] } } = this.info
      return node
    },
    classNameByNode() {
      const arr = []
      const { attrs = {} } = this.node
      if (attrs.class) arr.push(attrs.class)
      return arr
    },

    className() {
      const arr = [...this.classNameByNode]
      return arr.join(' ')
    }
  },
  watch: {},

  async created() {},

  mounted() {},

  methods: {}
}
