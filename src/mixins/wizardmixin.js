import { tools } from '@/odoojs'

const cp = val => JSON.parse(JSON.stringify(val))

const try_call = async (fn, debug) => {
  if (debug) return { result: await fn() }
  try {
    return { result: await fn() }
  } catch (error) {
    return { error }
  }
}

export default {
  //   mixins: [],

  props: {
    visible: { type: Number, default: 0 },
    modelGet: { type: Function, default: () => undefined }
  },

  data() {
    return {
      viewInfo: {},
      dataInfo: { dataDict: {} },
      visible2: false
    }
  },
  computed: {
    formViewInfo() {
      const info = tools.form_info({ view_info: this.viewInfo })
      return info
    },

    node() {
      return this.formViewInfo.node || { children: [] }
    },

    formTitle() {
      const node = this.node
      return (node.attrs || {}).string
    },

    formInfo() {
      const info = this.formViewInfo

      const node = this.node

      console.log('node', cp(node))

      const children2 = node.children || []
      const children = children2.filter(item => item.tagName !== 'footer')
      return { ...info, node: { ...node, children } }
    },

    formFooter() {
      const node = this.node
      const children2 = node.children || []
      const footer = children2.find(item => item.tagName === 'footer') || {}
      // console.log('footer', cp(footer))
      return footer
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    visible(newVal, oldVal) {
      // console.log('watch, wizard ', newVal, oldVal)
      if (newVal) {
        this.init()
      }
    }
  },

  methods: {
    get_invisible(node) {
      return tools.node_invisible(node, {
        data_info: this.dataInfo,
        view_info: this.viewInfo
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

    async init() {
      // console.log('wizard')
      const model = this.modelGet()
      const res = await try_call(async () => {
        await model.onchange()
        return true
      })

      const { error } = res

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
        this.dataInfo = JSON.parse(JSON.stringify(model.data_info))

        this.visible2 = true

        // console.log('init', model, cp(this.viewInfo), cp(this.dataInfo))
      }
    },

    methodCall(...args) {
      const model = this.modelGet()
      const view = 'form'
      return model.call(view, ...args)
    },

    handleOnViewEvent(event_name, ...args) {
      if (event_name === 'button-clicked') this.handleButtonClicked(...args)
      else if (event_name === 'on-change') this.handleOnchange(...args)
    },

    async handleOnchange(payload = {}) {
      // this.loading = true
      const model = this.modelGet()
      await model.onchange(payload)
      this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
      // this.loading = false
    },

    async handleButtonClicked(payload = {}) {
      console.log('btn click', cp(payload))
      // TBD wizard_button_click  携带 自己的 context

      const { node } = payload
      const is_cancel = node.attrs.special === 'cancel'
      if (is_cancel) {
        this.visible2 = false
        return
      }

      const model = this.modelGet()

      const { error, result } = await try_call(async () => {
        return await model.wizard_button_click(payload)
      })

      console.log('btn click res', [error, result])

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.visible2 = false
        if (result) {
          //
          if (result.type === 'ir.actions.act_window_close') {
            this.visible2 = false
            //  TBD 关闭  modal , 通知 父页面 刷新页面
            // 销售 生成 结算单
          }
        } else {
          //  TBD 关闭  modal , 通知 父页面 刷新页面
          // 销售 发货 验证按钮
        }
      }
    }
  }
}
