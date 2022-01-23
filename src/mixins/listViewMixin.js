import treeViewMixin from '@/mixins/treeViewMixin'

import api from '@/odooapi'
import { try_call } from '@/odooapi/tools'

export default {
  mixins: [treeViewMixin],

  props: {},

  data() {
    return {
      activeIdsWithGroupby: [],
      expandedRowKeys: []
    }
  },
  computed: {
    viewType() {
      return 'list'
    },

    activeIds() {
      return this.activeIdsWithGroupby.filter(item => typeof item === 'number')
    },

    view_columns() {
      const { fields } = this.view
      const node = this.node
      const columns = (node.children || [])
        .filter(item => item.tagName === 'field')
        .map(item => {
          const fname = item.attrs.name
          const meta = fields[fname] || {}
          const title = item.attrs.string || meta.string
          return { key: fname, title, node: item, meta }
        })

      return columns
    },

    columns() {
      const cols = this.view_columns
      // console.log('tree cols:', cols)
      // TBD GROUPBY

      const cols2 = cols.filter(
        item =>
          !item.node.attrs.invisible &&
          item.node.attrs.optional !== 'hide' &&
          item.node.tagName === 'field'
        // item.node.tagName !== 'templates_no_templates' &&
        // item.node.tagName !== 'groupbyb' &&
      )
      // console.log(JSON.parse(JSON.stringify(cols2)))
      const get_render = col => {
        if (col.meta.type === 'many2one') {
          // eslint-disable-next-line no-unused-vars
          return (value, row, index) => (value ? value[1] : '')
        }
        if (col.meta.type === 'selection') {
          const get_label = value => {
            const elm = col.meta.selection.find(item => item[0] === value)
            return elm ? elm[1] : ''
          }
          // eslint-disable-next-line no-unused-vars
          return (value, row, index) => (value ? get_label(value) : '')
        }

        return undefined
      }

      const cols3 = [...cols2].map(col => {
        const ret = { ...col, dataIndex: col.key }
        const render = get_render(col)
        if (render) ret.customRender = render
        return ret
      })

      const cols6 = this.groupby.length
        ? [{ key: '_keyval', title: '', dataIndex: '_keyval' }, ...cols3]
        : [...cols3]

      return cols6
    }
  },
  watch: {
    searchValue: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newVal, oldval) {
        // console.log('watch, searchValue, val', newVal, oldval)
        this.expandedRowKeys = []
        this.activeIdsWithGroupby = []
      },
      deep: true,
      immediate: true
    }
  },

  async created() {},

  mounted() {},

  methods: {
    handleOnRowSelect(activeIds) {
      this.activeIdsWithGroupby = activeIds
      this.$emit('on-row-select', activeIds)
    },

    handleOnEvent(event_name, ...args) {
      // search value change
      if (event_name === 'on-search-change') this.handleOnSearchChange(...args)
      // 导出全部按钮, 直接下载
      // 打印按钮, 直接下载
      else if (event_name === 'on-print') this.handleOnPrint(...args)
      // 导出全部按钮, 直接下载
      else if (event_name === 'on-export-all') this.handleOnExportAll(...args)
      // 导出按钮, 跳转到弹窗
      else if (event_name === 'on-export') this.handleOnExport(...args)
      // 导入按钮, 跳转到新页面
      else if (event_name === 'on-import') this.handleOnImport(...args)
      // 删除按钮, 刷新页面
      else if (event_name === 'on-unlink') this.handleOnBtnUnlink(...args)
      // 存档按钮, 刷新页面
      else if (event_name === 'on-archive') this.handleOnArchive(...args)
      // 取消存档按钮, 刷新页面
      else if (event_name === 'on-unarchive') this.handleOnUnarchive(...args)
      // action 按钮, 刷新数据 或 跳转到新页面
      else if (event_name === 'on-action') this.handleOnAction(...args)
    },

    async handleOnImport() {
      this.$message.info('建设中..., 导入记录')
      // TBD
    },

    async handleOnExportAll() {
      await api.Views.list.export_xlsx_all(this.viewInfo2)
    },

    async handleOnExport() {
      // this.$message.info('建设中..., 导出数据')
      // TBD
      // const active_ids = this.activeIds
    },

    async handleOnPrint(action) {
      const { context } = this.viewInfo
      const ids = this.activeIds
      await api.Action.print({ context, action }, ids)
    },

    async handleOnBtnUnlink() {
      const ids = this.activeIds
      console.log(' handleUnlink ', ids)

      const { error } = await try_call(async () => {
        await api.Views.list.unlink(this.viewInfo2, ids)
        return true
      })

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.activeIdsWithGroupby = []
        this.fresh_data()
      }
    },

    async handleOnUnarchive() {
      const ids = this.activeIds
      await api.Views.list.unarchive(this.viewInfo2, ids)
      // this.fresh_data()
    },

    async handleOnArchive() {
      const ids = this.activeIds
      await api.Views.list.archive(this.viewInfo2, ids)
      this.fresh_data()
    },

    async handleOnAction(action_todo) {
      // 工具条 按钮 触发
      // console.log('action list', cp(action_todo))
      const active_ids = this.activeIds
      const result = await api.Views.list.action_call(
        this.viewInfo2,
        action_todo,
        { active_ids }
      )

      console.log('action list ret:', result)

      if (!result) {
        this.fresh_data()
      } else {
        this._action_return(result)
      }
    },

    handleOnViewEvent(event_name, ...args) {
      // console.log(' handleOnViewEvent, ', event_name, args)
      // 点击按钮
      // action, wizard form, button click return, reload data
      if (event_name === 'on-wizard-ok') this.handleOnWizardOk(...args)
    },

    async handleOnWizardOk(result) {
      console.log('wizard btn click')
      if (!result) this.fresh_data()
      else return this._action_return(result)
    },

    async _action_return(result) {
      // console.log('list view, action_return', result)
      return this.action_return(result)
    }
  }
}
