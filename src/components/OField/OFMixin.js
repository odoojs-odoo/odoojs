// 所有字段的 mixin

import api from '@/odoorpc'

export default {
  components: {},
  mixins: [],

  props: {
    width: { type: String, default: undefined },
    editable: { type: Boolean, default: false },
    value: {
      //type: Any,
      default: undefined
    },

    fieldInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },

    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },

    dataInfo: {
      type: Object,
      default: () => {
        return { record: {} }
      }
    }
  },
  data() {
    return {
      value_input: undefined
    }
  },
  computed: {
    value2: {
      get() {
        if (this.value_input === undefined) {
          return this.value_edit
        } else {
          return this.value_input
        }
      },
      set(val) {
        this.value_input = val
      }
    },

    record() {
      return this.dataInfo.record || {}
    },

    values() {
      return this.dataInfo.values || {}
    },

    fname() {
      return this.fieldInfo.name
    },

    widget() {
      return this.fieldInfo.widget
    },

    readonly() {
      const field = api.env.field(this.fieldInfo)

      const values = this.values
      const record = this.record
      const readonly = field.readonly_get({ record: { ...record, ...values } })
      // console.log(this.fname, this.fieldInfo, values, state, readonly)
      return readonly
    },

    required() {
      const required = this.fieldInfo.required
      if (typeof required !== 'function') {
        return required
      }

      return required({ record: { ...this.record, ...this.values } })
    },

    value_readonly() {
      return this.record[this.fname]
    },

    value_edit() {
      // this.editable ?
      if (this.fname in this.values) return this.values[this.fname]
      else return this.value_readonly
    },

    value_display() {
      return this.value_edit
    },

    compute_style() {
      if (this.width) {
        return `width: ${this.width}`
      } else {
        return undefined
      }
    }
  },

  watch: {
    value_edit: {
      handler: function (val) {
        // console.log('in watch, value_edit')
        this.value_input = val
      },
      deep: true
    }
  },

  async created() {},
  async mounted() {},

  methods: {
    async handleChange(value, ...args) {
      // o2m 字段, 需要重写该函数
      this.$emit('change', this.fieldInfo.name, value, ...args)
    }
  }
}
