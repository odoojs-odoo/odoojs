import treeViewMixin from '@/mixins/treeViewMixin'
import { tools } from '@/odoojs'
const cp = item => JSON.parse(JSON.stringify(item))

const try_call = async (fn, debug) => {
  if (debug) return { result: await fn() }
  try {
    return { result: await fn() }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export default {
  mixins: [treeViewMixin],

  props: {},

  data() {
    return {
      activeIds: []
    }
  },
  computed: {
    // for tree
    view_columns() {
      return tools.view_columns({ view_info: this.viewInfo })
    },

    columns() {
      const cols = this.view_columns
      // console.log(cols)
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
      return [...cols2].map(col => {
        return { ...col, dataIndex: col.key }
      })
    }
  },
  watch: {},

  async created() {},

  mounted() {},

  methods: {
    handleOnRowSelect(activeIds) {
      this.activeIds = activeIds
      this.$emit('on-row-select', activeIds)
    },

    handleOnEvent(event_name, ...args) {
      // 打印按钮, 直接下载
      if (event_name === 'on-print') this.handleOnPrint(...args)
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
      const model = this.modelGet()
      // const res =
      await model.export_xlsx_all()
      // console.log(res)
    },

    async handleOnExport() {
      this.$message.info('建设中..., 导出数据')
      // TBD
      // const active_ids = this.activeIds
    },

    async handleOnPrint(action) {
      const ids = this.activeIds
      const model = this.modelGet()
      // const res =
      await model.print(action, ids)
      // console.log(res)
    },

    async handleOnBtnUnlink() {
      const ids = this.activeIds
      console.log(' handleUnlink ', ids)
      const model = this.modelGet()

      const { error } = await try_call(async () => {
        await model.unlink({ ids })
        return true
      })

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.fresh_data()
      }
    },

    async handleOnUnarchive() {
      const ids = this.activeIds
      const model = this.modelGet()
      await model.unarchive(ids)
      this.fresh_data()
    },

    async handleOnArchive() {
      const ids = this.activeIds
      const model = this.modelGet()
      await model.archive(ids)
      this.fresh_data()
    },

    async handleOnAction(action) {
      console.log(cp(action))
      const ids = this.activeIds
      const model = this.modelGet()
      const { error, result } = await try_call(async () => {
        return await model.action_call(action, ids)
      })

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        if (!result) {
          this.fresh_data()
        } else {
          this.$emit('on-action-return', result)
        }
      }
    }
  }
}
