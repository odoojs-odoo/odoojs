import X2mMixin from '@/odooui/X2mMixin'

export default {
  components: {},
  mixins: [X2mMixin],
  props: {
    editable: { type: Boolean, default: false }
  },
  data() {
    return {
      showModal: false,
      recordsOld: [],
      record: {}
    }
  },
  computed: {
    dataInfo() {
      return { record: this.record, values: {} }
    },

    fields() {
      if (!this.relation) {
        return {}
      }

      const fields = this.relation.form.fields
      return fields
    }
  },

  watch: {},

  async created() {},

  async mounted() {},

  methods: {
    meta_get(fname) {
      return this.fields[fname] || {}
    },

    invisible_get(meta = {}) {
      return typeof meta.invisible === 'function'
        ? meta.invisible({ record: { ...this.record, ...this.values } })
        : meta.invisible
    },

    async handleShowForm(record, recordsOld) {
      const row = { ...record }
      if (!row.id) delete row.id

      this.record = { ...record }
      this.recordsOld = recordsOld

      this.showModal = true
    },

    async handleOnRemove() {
      // console.log('handleOnRemove', this.record, this.recordsOld)
      const recs = this.recordsOld.filter(item => item.id !== this.record.id)
      const ids = recs.map(item => item.id)
      const vals = [6, recs, ids]
      this.$emit('on-commit', vals)
      this.showModal = false
    }
  }
}
