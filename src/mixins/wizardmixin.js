import api from '@/odooapi'

import editMixin from './editMixin'

const cp = val => JSON.parse(JSON.stringify(val))

let global_debug = 0
global_debug = 1

const try_call = async (fn, debug) => {
  if (global_debug || debug) return { result: await fn() }
  try {
    return { result: await fn() }
  } catch (error) {
    return { error }
  }
}

export default {
  mixins: [editMixin],

  props: {
    visible: { type: Boolean, default: false },
    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      data: {}
    }
  },
  computed: {
    visible2: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    view() {
      const { views = {} } = this.viewInfo
      const { fields_views = {} } = views
      const view = fields_views.form || {}
      return view
    },

    viewInfo2() {
      return { ...this.viewInfo, view: this.view }
    },

    node() {
      // console.log(this.viewType)
      return api.Views.form.view_node(this.viewInfo2)
    },

    node_non_footer() {
      const node = this.node
      const children2 = node.children || []
      const children = children2.filter(item => item.tagName !== 'footer')

      return { ...node, children }
    },

    node_footer() {
      const node = this.node
      const children2 = node.children || []
      const footer = children2.find(item => item.tagName === 'footer') || {}
      // console.log('footer', cp(footer))
      return footer
    },

    values() {
      const { values = {} } = this.data
      return values
    }
  },
  watch: {},

  async created() {},

  mounted() {
    // console.log('mounted', cp(this.viewInfo))
    // console.log('mounted', cp(this.node))
    this.load_data()
  },

  methods: {
    async load_data() {
      this.data = await api.Views.form.load_data(this.viewInfo2)
    },

    handleOnViewEvent(event_name, ...args) {
      if (event_name === 'button-clicked')
        this.queue_handleButtonClicked(...args)
      else if (event_name === 'on-change') this.queue_handleOnchange(...args)
    },

    queue_handleButtonClicked(node) {
      this.call_queue(['handleButtonClicked', node])
    },

    async handleButtonClicked(node) {
      // console.log('handleButtonClicked:', node, this.data)
      const { special } = node.attrs
      if (special) {
        if (special === 'cancel') {
          this.visible2 = false
          return
        } else if (special === 'add') {
          console.log('wizard button click add:')
          throw 'wizard button click add'
        } else if (special === 'save') {
          console.log('wizard button click save:')
          throw 'wizard button click save'
        } else {
          //
          console.log('wizard button click uknown')
          throw 'wizard button click uknown'
        }
      }

      const { error, result } = await try_call(async () => {
        return await api.Node.wizard_button_clicked(this.viewInfo2, {
          node,
          values: this.values
        })
      })

      if (error) {
        console.log('btn click2 error', [error, result])
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        if (!result) {
          //   //  TBD 关闭  modal , 通知 父页面 刷新页面
          //   // 1 销售 发货 验证按钮
          //   // 2 发送短消息 成功后
          this.visible2 = false
          this.$emit('on-event', 'on-wizard-ok')
        } else {
          const { action } = result
          if (action.type === 'ir.actions.act_window_close') {
            this.visible2 = false
            this.$emit('on-event', 'on-wizard-ok')
            // 关闭  modal , 通知 父页面 刷新页面
            // 1. 销售 生成 结算单
          } else if (action.type === 'ir.actions.act_window') {
            this.visible2 = false
            this.$emit('on-event', 'on-wizard-ok', result)
            // 关闭  modal ,
            // 通知 父页面 跳转
            // 1. 销售 生成 结算单并查看
          } else if (action.type === 'ir.actions.client') {
            if (action.tag === 'reload') {
              // 制造 菜单 , 运行调度器
              this.visible2 = false
              this.$emit('on-event', 'on-wizard-ok', result)
            } else {
              console.log('TODO: btn click return', cp(result))
              throw `button click, return : ${action.type}`
            }
          } else {
            console.log('TODO: btn click return', cp(result))
            throw `button click, return : ${action.type}`
          }
        }
      }
    }
  }
}
