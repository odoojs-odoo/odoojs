import X2mMixin from '@/odooui/X2mMixin'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export default {
  components: {},
  mixins: [X2mMixin],
  props: {
    editable: { type: Boolean, default: false },

    parentData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      showModal: false,
      formview: undefined, // 对象, 接口函数的入口
      record: {},
      formValues: {},
      values: {}
    }
  },
  computed: {
    dataInfo() {
      return { record: this.record, values: this.values }
    },

    fields() {
      if (!this.relation) {
        return {}
      }

      const fields = this.relation.form.fields
      return fields
    },

    rules_edit() {
      // console.log(this.fields)

      return Object.values(this.fields).reduce((acc, meta) => {
        if (meta.required) {
          acc[meta.name] = [
            { required: true, message: '不能为空!', trigger: ['change'] }
          ]
        }
        return acc
      }, {})
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

    async handleCreate() {
      // console.log('createO2m')
      const view = this.relation.form
      const res = await view.onchange_new(this.parentData)

      const { record, values } = res
      this.record = record
      this.values = values

      this.formview = view

      this.showModal = true
    },

    async handleShowForm(record) {
      const row = { ...record }
      if (!row.id) delete row.id
      const view = this.relation.form
      this.record = { ...record }
      this.values = {}
      if (this.editable) {
        // console.log([record])
        this.formValues = view.set_editable(record, this.parentData)
        this.formview = view
      } else {
        this.formValues = {}
      }

      this.showModal = true
    },

    async handleChange(fname, value) {
      // console.log('o2m handleChange', fname, value)

      const validate = async (done, { formValues, values }) => {
        this.formValues = { ...this.formValues, ...formValues }
        this.values = { ...this.values, ...values }
        await sleep(100)
        this.$refs.refForm.validate(async valid => {
          console.log('form valid', valid)
          done(valid)
        })
      }

      const result = await this.formview.onchange(fname, { value, validate })
      console.log('o2m handleChange ok', fname, value, result)

      const { values: values2 = {} } = result
      this.values = values2
      this.formValues = { ...this.formValues, ...values2 }
    },

    async handleOnRollback() {
      // console.log('handleOnRollback subform')
      this.showModal = false
    },

    async handleOnRemove() {
      // console.log('handleOnRemove', this.record)
      const value = [2, this.record.id, false]
      this.$emit('on-commit', value)
      this.showModal = false
    },

    async handleOnCommit() {
      // console.log('handleOnCommit subform')

      const validate = async done => {
        await sleep(100)
        this.$refs.refForm.validate(async valid => {
          console.log('form commit valid', valid)
          done(valid)
        })
      }

      const result = await this.formview.commit({ validate })

      if (result) {
        this.$emit('on-commit', result)
        this.showModal = false
      }
    }
  }
}
