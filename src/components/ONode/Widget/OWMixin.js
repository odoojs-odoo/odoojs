import OF1Mixin from './OF1Mixin'

export default {
  components: {},
  mixins: [OF1Mixin],

  props: {
    value_readonly: {
      type: [Object, Array, String, Boolean, Number],
      default: undefined
    },

    value_edit: {
      type: [Object, Array, String, Boolean, Number],
      default: undefined
    }
  },
  data() {
    return {}
  },
  computed: {
    value() {
      return this.value_edit
    },

    value_display() {
      return this.value
    }
  },

  watch: {},

  async created() {},
  async mounted() {},

  methods: {
    async onchange(value, ...args) {
      // console.log('handleOnchange', [this.fname, value])
      this.$emit('on-change', value, ...args)
      //   console.log(this.viewInfo)
    }
  }
}
