import X2mTreeMixin from '@/odooui/X2mTreeMixin'

export default {
  components: {},
  mixins: [X2mTreeMixin],
  props: {
    parentData: {
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
    readonly() {
      if (this.relation) {
        const { record = {}, values = {} } = this.parentData

        const readonly = this.relation.readonly_get({
          record: { ...record, ...values }
        })
        return readonly
      } else {
        return true
      }
    }
  },

  watch: {},

  async created() {},

  async mounted() {},

  methods: {
    async handleCreate() {
      // console.log('createO2m')
      this.$refs.subForm.handleCreate()
    },

    async handleOnRowClick(record) {
      // console.log('handleOnRowClick')
      this.$refs.subForm.handleShowForm(record)
    },

    async handleOnCommit(value) {
      console.log('handleOnCommit subform', this.records, this.values, value)

      const view = this.relation.tree
      const ret_commit = view.commit(this.records, this.values, value)

      console.log('handleOnCommit from subform', ret_commit)
      const { values, values_onchange } = ret_commit
      this.values = values

      this.$emit('change', values_onchange)
    }
  }
}
