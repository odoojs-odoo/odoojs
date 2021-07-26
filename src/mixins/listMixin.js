import api from '@/api'

const Mixin = {
  data() {
    return {
      model: undefined,
      hideCreate: false,
      total_length: 0,
      dataList: [],
      view_type: 'notree'
    }
  },
  computed: {
    readonly() {
      const readonly = this.$route.meta.readonly
      return readonly
    },

    view_title() {
      if (this.model) {
        // console.log(this.model.view_title)
        return this.model.view_title
      } else {
        return ''
      }
    },

    columns() {
      if (this.model) {
        const cols = this.model.view_columns

        const cols2 = cols.filter(
          item =>
            !item.node.attrs.invisible && item.node.attrs.optional !== 'hide'
        )
        // console.log(JSON.parse(JSON.stringify(cols2)))
        return [...cols2]
      } else {
        return []
      }
    }
  },

  watch: {
    // 菜单切换时, 触发
    '$route.fullPath': {
      handler: function(/*val*/) {
        // console.log('watch, $route.fullPath, val', val)
        this.init()
      },
      deep: true
    }
  },

  async created() {},

  methods: {
    async init() {
      // console.log('init,', this.$route)

      const action_ref = this.$route.meta.name

      const action = await api.action(action_ref)
      console.log(action)
      // view_type: 'list'
      if (action.views.list) {
        this.view_type = 'list'
        const listview = action.listview
        const model = listview.model

        const hideCreate = model.hide_create()
        this.hideCreate = hideCreate

        await model.pageGoto(1)
        // console.log('init, model,', model, hideCreate)
        console.log(
          'init, model,',
          JSON.parse(JSON.stringify(listview.view_node))
        )

        this.model = model
        this.total_length = model.total_length
        console.log(model, model.values_list)
        this.dataList = [...model.values_list]
      } else if (action.views.kanban) {
        this.view_type = 'kanban'
      } else if (action.views.form) {
        this.view_type = 'form'
        // const action_ref = this.$route.meta.name
        // const path = `/web/${action_ref}/form`
        // this.$router.replace({ path })
      } else {
        this.view_type = 'notree'
      }
    },

    onPageChange(page) {
      this.pageGoto(page)
    },

    onPageSizeChange(page_size) {
      if (this.model) {
        this.model.limit = page_size
        if (this.model.page_number === 1) {
          this.pageGoto()
        }
      }
    },

    async pageGoto(page = 1) {
      if (this.model) {
        await this.model.pageGoto(page)
        this.dataList = [...this.model.values_list]
      }
    },

    handleOnCreate() {
      console.log(' handleOnCreate ')
      const action_ref = this.$route.meta.name
      const path = `/web/${action_ref}/form`
      this.$router.push({ path })
    },

    async handleOnRowClick(row) {
      console.log('handleOnRowClick,', row)

      const action_ref = this.$route.meta.name
      const path = `/web/${action_ref}/form`
      this.$router.push({ path, query: { id: row.id } })
    }
  }
}

export default Mixin
