import X2mTreeMixin from '@/odooui/X2mTreeMixin'

export default {
  components: {},
  mixins: [X2mTreeMixin],
  props: {},
  data() {
    return {}
  },
  computed: {},

  watch: {},

  async created() {},

  async mounted() {},

  methods: {
    async handleCreate() {
      // console.log('createO2m')
      this.$refs.subNew.handleCreate(this.values_display)
    },

    async handleOnRowClick(record) {
      // console.log('handleOnRowClick')
      this.$refs.subForm.handleShowForm(record, this.values_display)
    },

    async handleOnCommit(value) {
      // console.log('handleOnCommit from subform', value)
      this.values = [value]
      const value2 = [...value]
      value2[1] = false
      this.$emit('change', [value2])
    }
  }
}
