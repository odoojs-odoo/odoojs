import OF1Mixin from './OF1Mixin'

export default {
  components: {},
  mixins: [OF1Mixin],

  props: {},
  data() {
    return {}
  },
  computed: {
    widget_todo() {
      const done = ['boolean_favorite']
      return done.includes(this.widget) ? '' : this.widget
      // return this.widget
    },

    value_readonly() {
      return this.record[this.fname]
    },

    value_edit() {
      if (this.fname in this.values) return this.values[this.fname]
      else return this.record[this.fname]
    },

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
      console.log('handleOnchange', [this.fname, value])
      this.$emit('on-event', 'on-change', this.fname, value, ...args)
    }
  }
}
