// sub tree 的 mixin

import X2mMixin from './X2mMixin'

export default {
  name: 'X2mTreeMixin',
  components: {},
  mixins: [X2mMixin],
  props: {
    editable: { type: Boolean, default: false },
    records: { type: Array, default: () => [] }
    // valuesDefault: { type: Array, default: () => [] }
  },
  data() {
    return {
      values: []
    }
  },
  computed: {
    // values: {
    //   get() {
    //     // console.log('valuesDefault', this.valuesDefault)
    //     return this.valuesDefault
    //   },

    //   set(value) {
    //     this.$emit('update:valuesDefault', value)
    //   }
    // },
    fieldInfo() {
      return this.relationInfo || {}
    },

    readonly() {
      // console.log([this.fieldInfo.name, this.fieldInfo])
      // return this.fieldInfo.readonly

      if (this.relation) {
        const { record = {}, values = {} } = this.parentData || {}

        const readonly = this.relation.readonly_get({
          record: { ...record, ...values }
        })
        return readonly
      } else {
        return true
      }
    },

    columns() {
      const get_render = (col, meta) => {
        if (meta.type === 'many2one') {
          // eslint-disable-next-line no-unused-vars
          return (value, row, index) => (value ? value[1] : '')
        }
        if (meta.type === 'selection') {
          const get_label = value => {
            const elm = meta.selection.find(item => item[0] === value)
            return elm ? elm[1] : ''
          }
          // eslint-disable-next-line no-unused-vars
          return (value, row, index) => (value ? get_label(value) : '')
        }
        return undefined
      }

      if (!this.relation) {
        return []
      }

      const fields = this.relation.tree.fields

      // const views = this.fieldInfo.views || {}
      // const { fields = {} } = views.tree || {}
      const cols = Object.keys(fields).map(fld => {
        const meta = fields[fld]
        const col = {
          dataIndex: fld,
          key: fld,
          title: meta.string,
          align: 'center'
        }
        const render = get_render(fld, meta)
        if (render) {
          col.customRender = render
        }
        return col
      })
      return cols
    },

    values_display() {
      if (!this.relation) {
        return []
      }

      const vals = this.relation.tree.values_display(this.records, this.values)
      return vals
    }
  },

  watch: {
    editable: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newValue, oldValue) {
        // console.log('watch editable', this.fname, newValue, oldValue)
        if (newValue === false) {
          this.values = []
        }
      },
      deep: true,
      immediate: true
    }
  },

  created() {},

  mounted() {},

  methods: {}
}
