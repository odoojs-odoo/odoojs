// o2m 和 m2m 字段 的 mixin, widget=x2many_tree

import OFMixin from './OFMixin'
import api from '@/odoorpc'

const check_array_equ = (listA, listB) => {
  let result =
    listA.length === listB.length &&
    listA.every(a => listB.some(b => a === b)) &&
    listB.every(_b => listA.some(_a => _a === _b))

  return result
}

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default {
  components: {},
  mixins: [OFMixin],

  props: {
    value: { type: Array, default: () => [] },
    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      relation: undefined,
      subRecords: []
    }
  },
  computed: {
    value_readonly() {
      return this.record[this.fname] || []
    }
  },

  watch: {
    // 菜单切换时, 触发
    '$route.fullPath': {
      handler: function (/*val*/) {
        // console.log('in watch, $route.fullPath')
        // console.log('watch fullPath')
        this.subRecords = []
      },
      deep: true
    }
  },

  async created() {},
  async mounted() {},

  methods: {
    check_array_equ(listA, listB) {
      return check_array_equ(listA, listB)
    },

    async load_relation() {
      // console.log('load_relation: ', this.fieldInfo, this.viewInfo)
      const relation = api.env.relation(this.fieldInfo, {
        parent: this.viewInfo
      })
      await relation.load_views()
      this.relation = relation
      console.log('load_relation ok: ', relation, this.fname, this.viewInfo)
      return { [this.fname]: relation }
    },

    async load_relation_data(for_new) {
      // console.log('load_relation_data: ', this.fname, for_new)
      if (for_new) {
        const m2m_value = this.values[this.fname]
        // console.log('load_relation_data: ', this.values, this.fname, m2m_value)
        const view = this.relation.tree

        // console.log('load_relation_data: ', this.fname, this.fieldInfo)
        if (this.fieldInfo.type === 'one2many') {
          // console.log('load_relation_data: ', this.fname, m2m_value)

          const res = await view.read_for_new_o2m(m2m_value)
          // console.log('load_relation_data2: ', this.fname, m2m_value, res)
          const { values } = res
          this.subRecords = values
        } else {
          const records = await view.read_for_new(m2m_value)
          // console.log('load_relation_data: ', this.fname, m2m_value, records)
          this.subRecords = records
        }
      } else {
        const ids = this.record[this.fname]
        const view = this.relation.tree
        const records = await view.read(ids)
        this.subRecords = records
        // console.log('o2m load_data', this.fname, ids, this.subRecords)
      }
    },

    async handleChange(value) {
      this.$emit('change', this.fieldInfo.name, value)
    }
  }
}
