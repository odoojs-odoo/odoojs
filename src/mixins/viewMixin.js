// const cp = item => JSON.parse(JSON.stringify(item))

export default {
  components: {},
  props: {
    debugName: { type: String, default: 'undefind' },

    initReady: { type: Boolean, default: false },
    modelGet: { type: Function, default: () => undefined }
  },

  data() {
    return {
      viewInfo: {}
    }
  },

  computed: {},

  watch: {
    initReady(newVal) {
      // console.log('watch,initReady,', this.debugName, newVal, oldVal)
      if (newVal) this.init()
    }
  },

  async created() {
    // console.log('create', this.debugName, this.initReady)
  },
  async mounted() {
    if (this.initReady) this.init()
  },

  methods: {
    async init() {
      const model = this.modelGet()
      // const viewInfo = model.view_info
      // console.log(viewInfo)
      this.viewInfo = JSON.parse(JSON.stringify(model.view_info))

      this.initData()
    },

    async initData() {
      // To Override
    }
  }
}
