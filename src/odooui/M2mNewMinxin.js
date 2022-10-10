import X2mMixin from '@/odooui/X2mMixin'

export default {
  components: {},
  mixins: [X2mMixin],
  props: {},
  data() {
    return {
      showModal: false,

      recordsOld: [],

      records_for_selection: [],

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  computed: {
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
        const col = { dataIndex: fld, key: fld, title: meta.string }
        const render = get_render(fld, meta)
        if (render) {
          col.customRender = render
        }
        return col
      })
      return cols
    },

    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(selectedRowKeys, selectedRows)
          this.handleOnRowSelect(selectedRowKeys, selectedRows)
        }
      }
    }
  },

  watch: {},

  async created() {},

  async mounted() {},

  methods: {
    handleOnRowSelect(selectedRowKeys, selectedRows) {
      // console.log('handleOnRowSelect', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      // this.$emit('on-row-select', selectedRowKeys)
    },

    async handleCreate(recordsOld) {
      this.recordsOld = recordsOld
      this.showModal = true
      const res = await this.relation.tree.search_read_for_m2m_new(recordsOld)
      this.records_for_selection = res
    },

    handleOnOk() {
      // console.log('handleOnOk m2m new', this.selectedRowKeys)
      const recs = [...this.recordsOld, ...this.selectedRows]
      const ids = recs.map(item => item.id)
      const vals = [6, recs, ids]
      this.$emit('on-commit', vals)
      this.showModal = false
      this.selectedRowKeys = []
      this.selectedRows = []
    }
  }
}
