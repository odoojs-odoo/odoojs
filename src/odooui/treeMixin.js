import api from '@/odoorpc'

export default {
  components: {},
  mixins: [],
  props: {},

  data() {
    return {
      treeview: undefined, // 对象, 接口函数的入口
      fields: {}, // 模型的字段信息
      buttons: {}, // 控制按钮显示和隐藏
      actionBtns: [], // 操作按钮中的 额外 actions

      records: [], // 列表页面的数据

      activeIds: [],
      expandedRowKeys: [],

      search_values: {},
      pagination: {
        // current
        // position: 'top'
        // total: 0,
        // pageSize: PageSize
        // pageSizeOptions: ['10', '20', '30', '40']
      }
    }
  },
  computed: {
    actionInfo() {
      if (!this.treeview) {
        return {}
      } else {
        return this.treeview.action_info
      }
    },

    search_items() {
      if (!this.treeview) {
        return {}
      } else {
        return this.treeview.search_items
      }
    },

    hasActive() {
      // 判断 存档和取消存档 菜单是否显示
      const active = this.fields.active
      return active ? true : false
    },

    // table 的 列
    columns() {
      const get_render = (col, meta) => {
        if (meta.type === 'many2one') {
          // eslint-disable-next-line no-unused-vars
          return (value, row, index) => (value ? value[1] : '')
        } else if (meta.type === 'selection') {
          const get_label = value => {
            const elm = meta.selection.find(item => item[0] === value)
            return elm ? elm[1] : ''
          }
          // eslint-disable-next-line no-unused-vars
          return (value, row, index) => (value ? get_label(value) : '')
        } else if (meta.type === 'boolean') {
          // eslint-disable-next-line no-unused-vars
          return (value, row, index) => (value ? '是' : '否')
        } else {
          return undefined
        }
      }

      const fields = this.fields
      const cols = Object.keys(fields)
        .filter(item => !fields[item].invisible)
        .map(fld => {
          const meta = fields[fld]

          const col = { dataIndex: fld, key: fld, title: meta.string }

          const render = get_render(fld, meta)
          if (render) {
            col.customRender = render
          }

          return col
        })

      // console.log(cols)

      return cols
    }
  },

  watch: {
    // 菜单切换时, 触发
    '$route.fullPath': {
      handler: function (/*val*/) {
        console.log('in watch , $route.fullPath', this.$route.fullPath)
        // console.log('watch fullPath')
        // console.log('watch', )
        this.init()
      },
      deep: true
    },

    searchValue: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newVal, oldval) {
        // console.log('watch, searchValue, val', newVal, oldval)
        this.expandedRowKeys = []
        this.activeIds = []
      },
      deep: true,
      immediate: true
    }
  },

  created() {},

  mounted() {
    // console.log('mounted', this.$route.fullPath)
    this.init()
  },

  methods: {
    async init() {
      console.log('init', this.$route)
      const actionId = api.tools.path2action_id(this.$route.path)

      const treeview = api.env.treeview(actionId)
      this.treeview = treeview
      this.buttons = treeview.buttons
      this.actionBtns = treeview.action_buttons
      this.fields = await treeview.load_fields()
      await this.fresh_data()
    },

    async handleTableChange(pagination) {
      this.treeview.pagination = pagination
      await this.fresh_data()
    },

    // 新增按钮触发
    onClickNew() {
      const menu = this.$route.query.menu
      const query = { menu, view_type: 'form' }
      const path = this.$route.path
      this.$router.push({ path, query })
    },
    onSearch() {
      console.log('----- 搜索 -----')
    },

    handleOnExportAll() {
      this.treeview.export_xlsx_all()
    },

    handleOnRowSelect(activeIds) {
      this.activeIds = activeIds
    },

    async fresh_data() {
      this.records = await this.treeview.search_read()
      this.pagination = { ...this.treeview.pagination }
      this.search_values = this.treeview.search_values
    },

    async unlink() {
      const ids = this.activeIds
      console.log(' handleUnlink ', ids)
      await this.treeview.unlink(ids)
      this.activeIds = []

      return true
    },

    async handleOnUnarchive() {
      const ids = this.activeIds
      await this.treeview.unarchive(ids)
      this.activeIds = []
      this.fresh_data()
    },

    async handleOnArchive() {
      const ids = this.activeIds
      await this.treeview.archive(ids)
      this.activeIds = []
      this.fresh_data()
    },

    // 行点击事件触发
    async handleOnRowClick(row) {
      const menu = this.$route.query.menu
      const query = { menu, view_type: 'form', id: row.id }
      const path = this.$route.path
      this.$router.push({ path, query })
    },

    async handleSearchChange(item, value) {
      const search_values = this.treeview.search_change(item, value)
      this.search_values = search_values
      this.treeview.pagination = {
        ...this.treeview.pagination,
        current: 1,
        total: 0
      }
      await this.fresh_data()

      // console.log(search_values)
    }
  }
}
