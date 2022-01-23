import api from '@/odooapi'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default {
  components: {},
  mixins: [],

  props: {
    fname: { type: String, default: undefined },
    field: {
      type: Object,
      default: () => {
        return {}
      }
    },

    editable: { type: Boolean, default: false },

    rowEditchanged: { type: Boolean, default: false },

    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },

    parentViewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    parentData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      // 点击新增按钮, 设置标志, 便于 line edit 新增行
      createClicked: false,

      formViewInfo: undefined,
      formData: {},
      showModal: false,
      showModalNew: false,
      m2mSelectOptions: [],
      m2m_records: []
    }
  },

  computed: {
    rowEditchanged2: {
      get() {
        return this.rowEditchanged
      },
      set(val) {
        this.$emit('update:rowEditchanged', val)
      }
    },

    viewType() {
      // to override, set view type
      return 'subtree'
    },

    records() {
      const { records = [] } = this.data
      return records
    },

    values() {
      const { values = [] } = this.data
      return values
    },

    values_display_new() {
      if (this.createClicked) {
        const me = api.Node.values_display(this.viewInfoForCall, {
          record: {},
          values: { ...this.formData.values }
        })
        const values = [{ ...me }]
        return values
      } else {
        return []
      }
    },

    values_display() {
      const records = this.records
      const values = [
        ...records.map(item => [4, item.id, item]),
        ...this.values
      ]

      // console.log('values2,', cp(values), cp(this.formData))
      // console.log(records, values)
      // console.log('m2mSelectOptions,', this.m2mSelectOptions)
      const vals = values.reduce((acc, tup) => {
        const op = tup[0]

        if (op === 6) {
          acc = this.m2m_records
        } else if (op === 5) {
          acc = []
        } else if ([3, 2].includes(op)) {
          acc = acc.filter(item => item.id !== tup[1])
        } else if (op === 4) {
          const me = acc.find(item => tup[1] === item.id)
          if (!me) acc = [...acc, tup[2]]
        } else if (op === 1 || op === 0) {
          const rec_index = acc.findIndex(item => item.id === tup[1])
          const rec_me = rec_index >= 0 ? acc[rec_index] : {}
          const me = api.Node.values_display(this.viewInfoForCall, {
            record: rec_me,
            values: tup[2]
          })

          const me2 = op === 0 ? { id: tup[1], ...me } : me

          if (rec_index >= 0) acc[rec_index] = me2
          else acc.push(me2)
        } else {
          //
        }

        return acc
      }, [])
      // console.log('values2,', vals)

      const values_new = this.values_display_new

      return [...vals, ...values_new]
    },

    view() {
      const { views = {} } = this.viewInfo
      const { fields_views = {} } = views
      const view = fields_views[this.viewType] || {}
      return view
    },

    viewInfo2() {
      return { ...this.viewInfo, view: this.view }
    },

    viewInfoForCall() {
      const formViewInfo = this.formViewInfo
      if (!formViewInfo) {
        return {
          ...this.viewInfo2,
          node: this.node,
          parent: this.parentViewInfo
        }
      } else {
        const { views } = formViewInfo
        return {
          ...this.viewInfo,
          views,
          view: this.view,
          node: this.node,
          parent: this.parentViewInfo
        }
      }
    },

    node() {
      return api.Views[this.viewType].view_node(this.viewInfo2)
    },

    tree_node_editable() {
      // return ''
      return this.node.attrs.editable
    }
  },

  watch: {
    editable(newVal, oldVal) {
      // console.log(newVal, oldVal, this.data)
      if (!oldVal && newVal) {
        this.formData = {}
      }
    }
  },

  async created() {},
  async mounted() {
    // console.log(cp(this.node))
  },

  methods: {
    setShowModel() {
      if (!this.editable) {
        this.showModal = true
      } else if (!['top', 'bottom'].includes(this.tree_node_editable)) {
        this.showModal = true
      } else {
        this.showModal = false
      }
    },

    async handleOnCreate() {
      // console.log('handleOnCreate')
      if (this.field.type === 'many2many') {
        const info = this.viewInfo2

        const res = await api.Node.m2m_search_read(
          { ...info, node: this.node },
          { records: this.values_display }
        )

        this.m2mSelectOptions = res

        this.showModalNew = true
      } else {
        const info = this.viewInfoForCall
        const res = await api.Node.relation_new(info, {
          parentData: this.parentData
        })
        // console.log('handleOnCreate,', res)

        const { viewInfo, data } = res
        this.formViewInfo = viewInfo
        this.formData = { ...data }

        if (this.tree_node_editable) {
          this.createClicked = true
          const values_new = this.values_display_new
          this.$refs.refSubTreeEdit.setCurrentRow(values_new)
          this.rowEditchanged2 = true
        }

        this.setShowModel()
      }
    },

    async handleOnRowClick(row) {
      return this.handleSubRowChange(row)
    },

    async handleSubRowChange(record) {
      // console.log('handleSubRowChange', record)
      const info = this.viewInfoForCall

      const row = { ...record }
      if (!row.id) delete row.id

      const res = await api.Node.relation_pick(info, {
        parentData: this.parentData,
        row,
        editable: this.editable
      })
      console.log(' handleOnRowClick2 ', row, cp(res))

      const { viewInfo, data } = res
      this.formViewInfo = viewInfo
      this.formData = data
      this.createClicked = false
      this.setShowModel()
    },

    handleSubFormOnEvent(event_name, ...args) {
      // console.log(' handleSubFormOnEvent', event_name, ...args)

      if (event_name === 'on-commit') {
        this.handleOnCommit(...args)
      } else if (event_name === 'on-rollback') {
        this.subRowRollback(...args)
      } else if (event_name === 'on-change-ok') {
        this.subRowOnchangeOk(...args)
      }
    },

    async subRowOnchangeOk({ data }) {
      // TODO:
      // TREE line edit 需要 立即 调用 parent onchange
      // 如果再取消, 则再触发一次  parent onchange

      // this.formData = { ...this.formData, values: {} }
      this.formData = { ...data }
      this.rowEditchanged2 = true
    },

    async subRowRollback({ done }) {
      // console.log('subRowRollback subform')
      // this.formData = { ...this.formData, values: {} }
      this.formData = {}
      this.createClicked = false
      done()
    },

    async handleOnCommit({ value, m2m_records = [], done }) {
      // console.log(
      //   'handleOnCommit from subform',
      //   records,
      //   values,
      //   cp(formData),
      //   cp([subRecord, subValues])
      // )

      this.m2m_records = m2m_records

      const info = this.viewInfoForCall
      const fname = this.fname
      const field = this.field
      const ret_commit = await api.Node.relation_commit(info, {
        records: this.records,
        values: this.values,
        formData: { fname, field, value },
        parentData: this.parentData
      })

      this.createClicked = false
      this.formData = {}

      if (done) done()

      // console.log('subtree,commit,', cp(ret_commit))

      const { values_onchange, values_write, ...subData } = ret_commit
      this.$emit('update:data', subData)
      this.$emit('on-change', values_onchange, { for_write: values_write })
    }
  }
}
