import OWMixin from './OWMixin'

const tuples2ids = tuples => {
  const ids = tuples.reduce((acc, tup) => {
    const op = tup[0]
    if (op === 6) acc = [...tup[2]]
    return acc
  }, [])

  return ids
}

export default {
  name: '',
  components: {},
  mixins: [OWMixin],
  props: {
    value_readonly: { type: Array, default: () => [] },
    value_edit: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    tuples2ids(tuples) {
      return tuples2ids(tuples)
    }
  }
}
