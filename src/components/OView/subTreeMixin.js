import OMixin from '@/components/OFormView/OMixin'

// const cp = item => JSON.parse(JSON.stringify(item))

export default {
  components: {},
  mixins: [OMixin],

  props: {},

  data() {
    return {
      showModal: false
    }
  },

  computed: {
    fname() {
      return this.node.attrs.name
    }
  },

  watch: {},

  async created() {},
  async mounted() {},

  methods: {
    handleOnCreate() {
      console.log('handleOnCreate,', this.node)
      this.$emit('on-event', 'relation-pick', {
        type: 'one2many',
        field: this.fname,
        node: this.node
      })

      this.showModal = true
    },
    async handleOnRowClick(row) {
      // console.log('handleOnRowClick,', row, this.node)

      this.$emit('on-event', 'relation-pick', {
        type: 'one2many',
        field: this.fname,
        node: this.node,
        row_id: row.id,
        editable: this.editable
      })

      this.showModal = true
    }
  }
}
