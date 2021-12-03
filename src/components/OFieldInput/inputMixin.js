export default {
  components: {},
  props: {
    loading: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
    dataDict: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fname: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: '' }
  },
  data() {
    return {
      value2: {}
    }
  },
  computed: {
    rules() {
      return {
        [this.fname]: [
          { required: this.required, message: '请输入!!', trigger: ['blur'] }
        ]
      }
    }
  },

  watch: {
    dataDict(newValue, oldValue) {
      // console.log('watch dataDict:', this.fname, newValue, oldValue)
      this.set_value_in_watch(newValue, oldValue)
    }
  },

  async created() {},
  async mounted() {
    this.set_value_in_mounted()
  },

  methods: {
    set_value_in_watch(newValue, oldValue) {
      // console.log('watch dataDict:', this.fname, newValue, oldValue)

      const valold = oldValue[this.fname]
      const valnew = newValue[this.fname]
      const myval = this.value2[this.fname]

      if (valnew !== valold && valnew !== myval) {
        this.value2 = { [this.fname]: valnew }
      }
    },
    set_value_in_mounted() {
      const valnew = this.dataDict[this.fname]
      const myval = this.value2[this.fname]
      // console.log('mounted:', this.fname, valnew, myval)
      if (valnew !== myval) this.value2 = { [this.fname]: valnew }
    },

    onchange(value, text) {
      // console.log('handleOnchange', [this.fname, value, text])
      this.$emit('on-change', value, text)
    }
  }
}
