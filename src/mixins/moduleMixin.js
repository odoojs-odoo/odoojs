// import api from '@/api'

// page 实现了 翻页
// 需要再实现 上拉加载新的

import { parseTime } from '@/utils'

export default {
  data() {
    return {
      // 关键参数, 对应 $store 里的 module
      moduleName: undefined,

      // 控制列表页面的 分页
      pageSize: 10,
      currentPage: 1
    }
  },

  computed: {
    // store 里的数据
    state() {
      console.log('this.moduleName', this.moduleName)
      if (!this.moduleName) {
        return {}
      } else {
        const ss = this.$store.state[this.moduleName]
        return ss || {}
      }
    },

    // 控制 新增按钮,  显示文本 / 是否隐藏
    btnNew() {
      const btn = this.state._config.btnNew || {}
      btn.label = btn.label || '新增'
      return btn
    },

    // 控制 查看按钮,  显示文本 / 是否隐藏
    btnView() {
      const btn = this.state._config.btnView || {}
      btn.label = btn.label || '查看'
      return btn
    },

    // 控制 编辑按钮,  显示文本 / 是否隐藏
    btnEdit() {
      const btn = this.state._config.btnEdit || {}
      btn.label = btn.label || '编辑'
      return btn
    },

    // 控制 删除按钮,  显示文本 / 是否隐藏
    btnDel() {
      const btn = this.state._config.btnDel || {}
      btn.label = btn.label || '删除'
      return btn
    },

    // 表单需要的所有下拉列表框的可选项
    options() {
      return this.$store.state[this.moduleName].options
    },

    // 页面标题
    description() {
      if (this.$route.meta.title) {
        return this.$route.meta.title
      }

      return this.state._config.description
    },

    // 移动端 app list 的 title / label / icon / value
    forAppList() {
      return this.state._config.forAppList || {}
    },

    // 自动展示列表页面时, 需要的字段
    columnsForList2() {
      const cols = this.state._config.columnsForList
      const cols2 = Object.keys(cols).map((item) => {
        const item2 = {
          title: cols[item].label,
          key: item
        }

        // if (cols[item].type === 'time') {
        //   // item2.slot = cols[item].slot || 'time'
        //   item2.render = (h, params) => {
        //     console.log('table, time', h, params)
        //     console.log(
        //       'table, time',
        //       params.row[params.column.key],
        //       typeof params.row[params.column.key]
        //     )

        //     const time2 = params.row[params.column.key]

        //     return h('span', {}, time2 ? time2.slice(11, 19) : undefined)
        //   }
        // }

        if (cols[item].type === 'img') {
          item2.render = (h, params) => {
            console.log('table, img', h, params)
            return h('img', {
              /*  组件样式 */
              style: {
                width: '100px',
                height: '80px',
                'border-radius': '5%'
              },
              /*  html属性 */
              attrs: {
                /*  图片的路径,直接采用后台返回的键值 */
                src: params.row[item]
              }
            })
          }
        }

        return item2
      })

      console.log('columnsForList2', cols2)

      return [
        // { title: 'ID', key: 'id' },
        { type: 'index', width: 60, align: 'center' },
        ...cols2,
        {
          title: 'Action',
          slot: 'action',
          width: 300,
          align: 'center',
          fixed: 'right'
        }
      ]
    },

    columnsForList() {
      console.log('columnsForList, ', this.state)
      return this.state._config.columnsForList
    },

    // 自动展示详情页面时, 需要的字段
    columnsForView() {
      return this.state._config.columnsForView
    },

    // 自动展示表单页面时, 需要的字段
    columnsForForm() {
      console.log('columnsForForm, ', this.state)
      return (this.state._config || {}).columnsForForm
    },

    // 表单页面数据
    formData: {
      get() {
        return this.state.formData
      },

      set(val) {
        console.log(' form data set,', val)
        this.$store.dispatch(`${this.moduleName}/setForm`, { ...val })
      }
    },

    // 列表页面数据
    dataList() {
      return this.state.dataList
    },

    // 详情页面数据
    dataDict() {
      return this.state.dataDict
    },

    // 列表页面, 记录总数
    dataCount() {
      return this.state.dataCount
    }
  },

  watch: {
    // formData: {
    //   handler: function(val, oldval) {
    //     // console.log('watch, formData, val', val)
    //   },
    //   deep: true
    // },
    // '$route.meta': {
    //   handler: function(val, oldval) {
    //     // console.log('watch, $route.meta, val', val)
    //     const moduleName = val.name
    //     this.moduleName = moduleName
    //     this.handleFlash()
    //   },
    //   deep: true
    // }
  },

  async created() {},

  methods: {
    setModuleName() {
      const moduleName = this.$route.meta.name
      // const model = this.$route.meta.model
      console.log('odoo model ', moduleName, this.$route)
      this.moduleName = moduleName
    },

    // 移动端 app list 的 title / label / icon / value
    titleForAppList(rec) {
      // console.log('titleForAppList', this.forAppList)
      if (this.forAppList.title) {
        return this.forAppList.title(rec)
      } else {
        return ''
      }
    },

    iconForAppList(rec) {
      // console.log('titleForAppList', this.forAppList)
      if (this.forAppList.icon) {
        return this.forAppList.icon(rec)
      } else {
        return ''
      }
    },

    labelForAppList(rec) {
      // console.log('titleForAppList', this.forAppList)
      if (this.forAppList.label) {
        return this.forAppList.label(rec)
      } else {
        return ''
      }
    },

    valueForAppList(rec) {
      // console.log('titleForAppList', this.forAppList)
      if (this.forAppList.value) {
        return this.forAppList.value(rec)
      } else {
        return ''
      }
    },

    // 点击查看按钮, 跳转查看页面
    onBtnView(rec) {
      console.log('onBtnView', rec)
      console.log('onBtnView route ', this.$route)
      this.$store.dispatch(`${this.moduleName}/setDict`, { id: rec.id })

      this.$router.push({
        path: this.$route.meta.paths.view,
        query: { id: rec.id }
      })
    },

    // 点击新增按钮, 跳转表单页面
    onBtnNew() {
      // console.log('handleCreate')
      this.$store.dispatch(`${this.moduleName}/setForm`, {})
      this.$router.push({ path: this.$route.meta.paths.form })
      //
    },

    // 点击编辑按钮, 跳转表单页面
    onBtnEdit(rec) {
      // console.log('onBtnEdit', rec)
      // console.log('onBtnEdit route ', this.$route)
      this.$store.dispatch(`${this.moduleName}/setForm`, { id: rec.id })

      this.$router.push({
        path: this.$route.meta.paths.form,
        query: { id: rec.id }
      })
    },

    // 点击删除按钮, 执行删除操作,
    // 可以重写覆盖 该函数, 增加 确认对话框, 在确认后, call this.handleDel(rec)
    onBtnDel(rec) {
      this.handleDel(rec)
    },

    // 处理删除操作, 删除后刷新页面
    async handleDel(rec) {
      // console.log('handleDel', rec)
      //
      await this.$store.dispatch(`${this.moduleName}/unlink`, { id: rec.id })
      this.handleFlash()
    },

    handleSearch2(page) {
      //
      console.log('handleSearch2', page)
      this.currentPage = page
      this.handleSearch()
    },

    // 处理查询操作
    async handleSearch() {
      await this.$store.dispatch(`${this.moduleName}/search`, {
        limit: this.pageSize,
        page: this.currentPage
      })
    },

    handleFlash2(pagesize) {
      console.log('handleSearch2', pagesize)
      this.pageSize = pagesize
      this.handleFlash()
    },

    // 初始化查询操作, 取总记录数, 复位分页参数
    async handleFlash() {
      // console.log('handleFlash')
      this.currentPage = 1
      await this.$store.dispatch(`${this.moduleName}/search_count`)
      await this.$store.dispatch(`${this.moduleName}/search`, {
        limit: this.pageSize,
        page: this.currentPage
      })
      //
    },

    // 详情页面 / 编辑表单, 根据 id 参数 读取 数据
    handleView() {
      // console.log('handleView route ', this.$route)
      const rid = this.$route.query.id
      if (rid) {
        this.$store.dispatch(`${this.moduleName}/browse_one`, { id: rid })
      } else {
        this.$store.dispatch(`${this.moduleName}/setForm`, {})
      }
      this.$store.dispatch(`${this.moduleName}/getOptions`)
      //
    },

    // 表单页面 提交按钮, 创建记录或编辑记录, 完成后 刷新 list
    async handleSubmit() {
      //
      console.log('handleSubmit', this.formData)

      const cols = this.columnsForForm || {}
      const fromData = this.formData
      // console.log('formData', fromData)

      const fromData2 = Object.keys(fromData).reduce((acc, cur) => {
        const meta = cols[cur] || {}
        if (meta.type === 'datetime') {
          // console.log('formData 1', cur, meta.type, fromData[cur])
          acc[cur] = parseTime(fromData[cur])
        } else {
          acc[cur] = fromData[cur]
        }

        return acc
      }, {})

      // console.log('handleSubmit', fromData2)

      if (this.formData.id) {
        await this.$store.dispatch(`${this.moduleName}/write`, {
          values: fromData2
        })
      } else {
        await this.$store.dispatch(`${this.moduleName}/create`, {
          values: fromData2
        })
      }

      // this.handleFlash()

      this.$router.replace({
        path: this.$route.meta.paths.view,
        query: { id: this.dataDict.id }
      })
    },

    // 表单页面 下拉列表框可选项 动态处理函数
    // 目前 仅实现了 根据表单其他字段的值, 做过滤
    getSelectOptins(field) {
      //
      const config = this.$store.state[this.moduleName]._config
      // console.log('options,_config,', field, config)

      // eslint-disable-next-line object-curly-spacing
      const { optionsForForm = {} } = config
      const filter_fn = (optionsForForm[field] || {}).filter

      const old_options = this.$store.state[this.moduleName].options[field]
      if (!filter_fn) {
        return old_options
      }

      // console.log('getSelectOptins,', this.formData)
      const new_options = filter_fn({
        self: this,
        formData: this.formData,
        options: old_options || []
      })

      return new_options
    }
  }
}
