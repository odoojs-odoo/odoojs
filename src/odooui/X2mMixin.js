// sub for x2m 的 mixin

import api from '@/odoorpc'

export default {
  components: {},
  mixins: [],
  props: {
    relationInfo: { type: Object, default: undefined },

    parentViewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    relation() {
      if (this.relationInfo) {
        return api.env.relation(this.relationInfo, {
          parent: this.parentViewInfo
        })
      } else {
        return undefined
      }
    }
  },

  watch: {},

  async created() {},

  async mounted() {},

  methods: {}
}
