import api from '@/api'

// eslint-disable-next-line no-unused-vars
const deep_copy = node => {
  return JSON.parse(JSON.stringify(node))
}

const Mixin = {
  data() {
    return {
      model: undefined,
      hideEdit: false,
      dataDict: {},
      formData: {},
      editable: false,
      formRules: {},

      select_options: {},

      one2many_fields: [],

      modal_model: undefined,
      showModal: false,
      modal_node: {
        attrs: {},
        children: []
      }
    }
  },
  computed: {
    readonly() {
      const readonly = this.$route.meta.readonly
      return readonly
    },

    fields() {
      const res = this.get_model_attr('fields', {})
      return { ...res }
    },

    node() {
      if (this.model) {
        const val = this.model.get_view_node()
        return val
      } else {
        return {}
      }
    },

    view_title() {
      if (this.model) {
        // console.log(this.model.view_title)
        return this.model.view_title
      } else {
        return ''
      }
    },

    one2many_fields_set() {
      // be override
      return []
    },

    one2many_fields_is_set_by_node() {
      // 如果是 自定义重写 form view,  则这里是 false, 不读取 node 里的 o2m_fields
      // 需要自己 定义 one2many_fields
      return false
    }
  },

  watch: {
    // // 菜单切换时, 触发
    // '$route.query': {
    //   handler: function(val) {
    //     console.log('watch, $route.query, val', val)
    //     this.init()
    //   },
    //   deep: true
    // }
  },

  async created() {},

  mounted() {},

  methods: {
    async init() {
      console.log('from created,', this.$route)

      this.one2many_fields = [...this.one2many_fields_set]

      this.dataDict = {}
      this.formData = {}

      const query = this.$route.query
      const rid = query.id ? Number(query.id) : false

      const action_ref = this.$route.meta.name

      const action = await api.action(action_ref)
      const formview = action.formview
      const model = formview.model

      console.log('from created,', model)

      const hideEdit = model.hide_create()
      this.hideEdit = hideEdit

      if (rid) {
        await model.read(rid)
        await model.init_selection()
        if (this.one2many_fields_is_set_by_node) {
          const o2m_nodes = model.sheet_one2many_fields
          this.one2many_fields = [...o2m_nodes]
        }

        this.model = model

        this.dataDict = { ...model.values }
        this.formData = { ...model.values }
        console.log('init, model,', model, deep_copy(this.dataDict))

        await this.init_o2m()
      } else {
        await model.onchange()
        this.model = model
        await model.init_selection()

        if (this.one2many_fields_is_set_by_node) {
          const o2m_nodes = model.sheet_one2many_fields
          this.one2many_fields = [...o2m_nodes]
        }

        this.dataDict = { ...model.values }
        this.formData = { ...model.values }
        this.editable = true
        console.log('init, model new,', model, deep_copy(this.dataDict))
      }
    },

    async init_o2m() {
      for (const col of this.one2many_fields) {
        // console.log(col, col.name, this.model)
        await this.model.relation_browse(col.name, { node: col.node })
        console.log('init, model, 2,', this.model, this.model.values)
        this.dataDict = { ...this.model.values }
        this.formData = { ...this.model.values }
      }
    },

    modelMethod() {
      return this.model
    },

    readonly_modifier(node_name) {
      const readonly = this.model.get_readonly(node_name, this.dataDict)
      // console.log(' readonly, ', node_name, readonly)
      return readonly
    },

    invisible_modifier(node_name) {
      const invisible = this.model.get_invisible(node_name, this.dataDict)
      return invisible
    },

    // required_modifier(node_name) {
    //   return this.get_attr_of_modifier(node_name, 'required')
    // },

    // handleOnCreate() {
    //   console.log(' handleOnCreate ')
    // },

    handleOnWrite() {
      console.log(' handleOnWrite ')
      // this.$emit('on-btn-write')
      this.editable = true
      // this.keyIndex = this.keyIndex + 1
    },

    async handleOnUnlink() {
      console.log(' handleOnUnlink ')
      // to be override .  to show dialog
      await this.handleUnlink()
    },

    async handleUnlink(success, error) {
      console.log(' handleUnlink ')
      try {
        await this.model.unlink()
        if (success) {
          success(true)
        }
      } catch (e) {
        console.log(e)
        if (error) {
          error(e)
        }
      }
    },

    async handleOnCommit() {
      await this.handleCommit()
    },

    async handleCommit(success, error) {
      console.log(' handleOnCommit ')
      try {
        await this.model.commit()
        await this.init_o2m()

        this.dataDict = { ...this.model.values }
        this.formData = { ...this.model.values }
        this.editable = false
        if (success) {
          success(true)
        }
      } catch (e) {
        console.log(e)
        if (error) {
          error(e)
        }
      }
    },

    goto_treeform() {
      const action_ref = this.$route.meta.name
      const path = `/web/${action_ref}/list`
      this.$router.replace({ path })
    },

    handleOnCancel() {
      const query = this.$route.query
      const rid = query.id ? Number(query.id) : false

      if (!rid) {
        this.goto_treeform()
      } else {
        this.model.rollback()
        this.dataDict = { ...this.model.values }
        this.formData = { ...this.model.values }
        this.editable = false
      }
    },

    async handleOnchange(field, value, text) {
      console.log('handleOnchange', [field, value, text])
      await this.model.onchange(field, value, text)
      console.log('handleOnchange2', this.model)
      this.dataDict = { ...this.model.values }
      this.formData = { ...this.model.values }
      console.log('handleOnchange3', this.model.values)
    },

    async handleButtonClicked(payload = {}) {
      console.log(payload)
      const { type, name } = payload
      const res = await this.model.button_clicked(type, name)

      if (!res) {
        this.dataDict = { ...this.model.values }
        this.formData = { ...this.model.values }
      } else {
        console.log(res, deep_copy(res.view.view_node))

        this.modal_node = res.view.view_node
        this.modal_model = res

        this.showModal = true
      }
    },

    modalModelMethod() {
      return this.modal_model
    }

    // async init_select_options() {
    // 全局扫描本页面中的 node, 中的 node.attrs.widget === 'selection' node
    // 预处理 所有的 selection

    //   const set_options = (fld, ops) => {
    //     this.select_options = {
    //       ...this.select_options,
    //       [fld]: ops
    //     }
    //   }

    //   for (const fld of Object.keys(view._view_fields)) {
    //     const node = this.node_get(fld)
    //     if (node.attrs.widget === 'selection') {
    //       const meta = view._fields[fld]
    //       if (meta.type === 'selection') {
    //         set_options(fld, meta.selection)
    //       } else if (meta.type === 'many2one') {
    //         const options = await record.get_selection(fld, {
    //           name: '',
    //           domain: meta.domain,
    //           // context,
    //           limit: 0
    //         })
    //         set_options(fld, options)
    //       }
    //     }
    //   }

    //
    // },

    // // TBD, 这个 应该是废弃了, 没人调用
    // async get_options(payload) {
    //   const { field, query, limit } = payload
    //   // console.log(' get_options, ', field, this.select_options)
    //   const options2 = this.select_options[field]
    //   if (options2) {
    //     return options2
    //   }
    //   const options = await this.model.get_selection(field, { query, limit })
    //   return options
    // },
  }
}

export default Mixin
