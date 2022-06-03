export default {
  components: {},
  props: {
    type: { type: String, default: undefined },
    value: {
      type: [Array, String, Number, Boolean],
      default: () => undefined
    },
    fname: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: undefined },
    elementId: { type: String, default: undefined },
    className: { type: String, default: undefined }
  },
  data() {
    return {
      value2: {}
    }
  },
  computed: {
    className2() {
      const arr = []
      if (this.required) arr.push('input-required')
      if (this.className) arr.push(this.className)
      return arr.join(' ') || undefined
    },
    rules() {
      return {
        [this.fname]: [
          { required: this.required, message: '请输入!!', trigger: ['blur'] }
        ]
      }
    }
  },

  watch: {
    value: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newVal, oldval) {
        // console.log('watch, value:', this.fname, newVal, oldval)
        this.initValue(newVal)
      },
      deep: true,
      immediate: true
    }
  },

  async created() {},
  async mounted() {
    // console.log('mounted, value:', this.fname, this.value)
    this.initValue(this.value)
  },

  methods: {
    initValue(value) {
      this.value2 = { [this.fname]: value }
    },

    onchange(value, ...args) {
      // console.log('handleOnchange', [this.fname, value])
      this.$emit('on-change', value, ...args)
    }
  }
}
