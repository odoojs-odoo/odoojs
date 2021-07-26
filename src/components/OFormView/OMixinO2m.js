export default {
  components: {},
  mixins: [],

  props: {
    editable: { type: Boolean, default: false },
    parentField: { type: String, default: '' },
    data: { type: Array, default: () => [] },
    modelMethod: { type: Function, default: () => false }
  },

  data() {
    return {}
  },
  computed: {},

  async created() {},

  methods: {
    //
  }
}
