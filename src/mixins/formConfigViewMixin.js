import { tools } from '@/odoojs'
import viewMixin from './viewMixin'

const cp = item => JSON.parse(JSON.stringify(item))

export default {
  mixins: [viewMixin],

  props: {},

  data() {
    return {
      dataInfo: { dataDict: {} },
      // selectedKeys: ['general_settings']
      selectedKeys: []
    }
  },
  computed: {
    debug() {
      return tools.debug
    },

    formInfo() {
      return tools.form_info({ view_info: this.viewInfo })
    },

    node() {
      return this.formInfo.node || { children: [] }
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
    }
  },

  watch: {},

  async created() {},
  async mounted() {},

  methods: {
    async initData() {
      const model = this.modelGet()

      await model.onchange()

      const context = model.action.get_context()

      this.selectedKeys = context.module ? [context.module] : []

      this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
      this.dataInfo = JSON.parse(JSON.stringify(model.data_info))

      console.log('dataInfo', cp(this.dataInfo))
      console.log('module.', this.selectedKeys)
      console.log('formInfo', cp(this.formInfo))
      console.log('node', cp(this.node))
    },
    methodCall(...args) {
      const model = this.modelGet()
      const view = 'form'
      return model.call(view, ...args)
    },

    handleOnViewEvent(event_name, ...args) {
      console.log(' handleOnViewEvent, ', event_name, args)
      // 点击按钮
      // if (event_name === 'button-clicked') this.handleButtonClicked(...args)
      // // 编辑页面 包括 relation 字段的的 子form view 的编辑
      // else if (event_name === 'on-change') this.handleOnchange(...args)
      // // relation 字段 刷新数据
      // else if (event_name === 'relation-browse')
      //   this.handleRelationBrowse(...args)
      // // relation 字段 点击 打开弹窗
      // else if (event_name === 'relation-pick') this.handleRelationPick(...args)
      // // relation 字段 编辑页面 提交
      // else if (event_name === 'on-commit') this.handleOnEventCommit(...args)
      // // relation 字段 编辑页面 取消 回滚
      // else if (event_name === 'on-rollback') this.handleOnRollback(...args)
      // // relation 字段 form 页面 删除
      // else if (event_name === 'on-unlink') this.handleOnEventUnlink(...args)
    },

    get_invisible(node) {
      return tools.node_invisible(node, {
        data_info: this.dataInfo,
        view_info: this.formInfo
      })
    },

    childern_filter(children) {
      return (children || []).filter(item => {
        if (this.debug) {
          return true
        } else {
          return !this.get_invisible(item)
        }
      })
    },

    async handleOnCommit() {
      console.log('commit')

      const model = this.modelGet()

      // const res =
      await model.wizard_button_click({
        node: { attrs: { type: 'object', name: 'execute' } }
      })

      // console.log(res)
      this.$emit('on-reload')
    },

    handleOnCancel() {
      console.log('cnacel')
      // this.$emit('on-event', 'on-form-event', 'on-rollback')
    }
  }
}
