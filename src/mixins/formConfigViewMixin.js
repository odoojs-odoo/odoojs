import api from '@/odooapi'
import viewMixin from './viewMixin'
import editMixin from './editMixin'

// const cp = item => JSON.parse(JSON.stringify(item))

// const global_debug = 1
// const try_call = async (fn, debug) => {
//   if (global_debug || debug) return { result: await fn() }
//   try {
//     return { result: await fn() }
//   } catch (error) {
//     return { error }
//   }
// }

export default {
  mixins: [viewMixin, editMixin],

  props: {},

  data() {
    return {
      // selectedKeys: ['general_settings']
      selectedKeys: []
    }
  },
  computed: {
    viewType() {
      return 'form'
    },

    node_control_panel() {
      const children = this.node.children
      return children.length > 1 ? children[0] : { children: [] }
    },
    node_setting_container() {
      const children = this.node.children
      return children.length > 1 ? children[1] : { children: [] }
    },
    node_settings_tab() {
      const children = this.node_setting_container.children
      return children.length > 1 ? children[0] : { children: [] }
    },

    node_settings() {
      const children = this.node_setting_container.children
      return children.length > 1 ? children[1] : { children: [] }
    },

    current_node() {
      const keys = this.selectedKeys || []
      const key = keys.length ? keys[0] : ''

      const node = this.node_settings.children.find(
        item => item.attrs['data-key'] === key
      ) || { children: [] }
      return node
    },

    values() {
      const { values = {} } = this.data
      return values
    }
  },

  watch: {},

  async created() {},
  async mounted() {
    // console.log(
    //   'mounted',
    //   this.viewType,
    //   cp(this.viewInfo2),
    //   cp(this.node),
    //   cp(this.node_settings)
    // )
    this.load_data()
  },

  methods: {
    async load_data() {
      this.data = await api.Views.form.load_data(this.viewInfo2)

      const context = api.Views.form._context(this.viewInfo2)
      // console.log(this.data, context)
      this.selectedKeys = context.module ? [context.module] : []
    },

    handleOnViewEvent(event_name, ...args) {
      console.log(' handleOnViewEvent, ', event_name, args)
      // // 点击按钮
      // if (event_name === 'button-clicked') this.handleButtonClicked(...args)
      // // 编辑页面 包括 relation 字段的的 子form view 的编辑
      // else if (event_name === 'on-change') this.handleOnchange(...args)
    },

    async handleButtonClicked(payload = {}) {
      console.log('btn click', payload)
      // const model = this.modelGet()
      //
      // const { error, result } = await try_call(async () => {
      //   return await model.wizard_button_click(payload)
      // })
      // console.log('btn click2', error, result)
      // if (error) {
      //   this.$error({ title: '用户错误', content: error.data.message })
      // } else {
      //   if (result) this.$emit('on-action-return', result)
      //   else {
      //     // this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
      //     // this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
      //   }
      // }
    },

    async handleOnchange(payload = {}) {
      console.log('handleOnchange', payload)
      // // this.loading = true
      // const model = this.modelGet()
      // await model.onchange(payload)
      // this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
      // // this.loading = false
    },

    async handleOnCommit() {
      console.log('commit')

      // const model = this.modelGet()

      // // const res =
      // await model.wizard_button_click({
      //   node: { attrs: { type: 'object', name: 'execute' } }
      // })

      // // console.log(res)
      // this.$emit('on-reload')
    },

    handleOnCancel() {
      console.log('cnacel')
      // this.$emit('on-event', 'on-form-event', 'on-rollback')
    }
  }
}
