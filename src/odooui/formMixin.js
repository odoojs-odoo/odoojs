import formBaseMixin from './formBaseMixin'

import api from '@/odoorpc'

import { try_call } from '@/odoorpc/tools'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export default {
  components: {},
  mixins: [formBaseMixin],
  props: {
    //
    //
  },

  data() {
    return {
      wizardVisible: false,
      wizardAction: undefined,

      res_id: undefined
    }
  },
  computed: {
    navbar_title() {
      return !this.editable
        ? `${this.actionInfo.name} ${this.record.display_name || ''}`
        : this.res_id
        ? `${this.actionInfo.name} ${this.record.display_name || ''}`
        : `${this.actionInfo.name} 新增`
    },
    actionInfo() {
      if (!this.view) {
        return {}
      } else {
        return this.view.action_info
      }
    },

    // 控制按钮显示和隐藏
    buttons() {
      return this.view ? this.view.buttons : {}
    },

    hasActive() {
      // 判断 存档和取消存档 菜单是否显示
      const active = this.fields.active
      return active ? true : false
    },

    header_buttons() {
      if (!this.view) {
        return []
      }

      return this.view.header_buttons(this.record, this.values)
    },

    current_state() {
      const values = { ...this.record, ...this.values }
      return values.state
    },

    header_statusbar_visible() {
      if (!this.view) {
        return []
      }
      return this.view.header_statusbar_visible(this.record, this.values)
    }
  },

  watch: {
    // 菜单切换时, 触发
    '$route.fullPath': {
      handler: function (/*val*/) {
        // console.log('in watch, $route.fullPath')
        // console.log('watch fullPath')
        this.init()
      },
      deep: true
    }
  },

  created() {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      //

      const query = this.$route.query
      const { id: res_id1 } = query
      const actionId = api.tools.path2action_id(this.$route.path)

      const res_id = res_id1 ? Number(res_id1) : undefined
      this.res_id = res_id

      this.editable = false

      const view = api.env.formview(actionId)
      this.view = view
      // this.buttons = view.buttons
      this.fields = await view.load_fields()
      this.viewInfo = view.view_info

      // console.log(view.view_info)

      await sleep(10)

      await this.load_relation()

      if (res_id) {
        await this.load_data(res_id)
        if (this.$route.meta.editable) {
          this.set_editable()
          this.editable = true
          delete this.$route.meta.editable
        } else {
          this.editable = false
        }
      } else {
        const dataInfo = await view.onchange_new()
        const { values } = dataInfo
        this.formValues = values
        this.record = {}
        this.values = values
        this.editable = true
      }
    },

    async set_editable() {
      this.formValues = this.view.set_editable(this.record)
      this.values = {}
    },

    set_not_editable() {
      this.formValues = {}
      this.values = {}
    },

    // 新增按钮触发
    async onClickNew() {
      const menu = this.$route.query.menu
      const query = { menu, view_type: 'form' }
      const path = this.$route.path
      this.$router.push({ path, query })
    },

    // 删除按钮触发
    async onClickDel() {
      await this.view.unlink(this.res_id)
      const menu = this.$route.query.menu
      const query = { menu, view_type: 'tree' }
      const path = this.$route.path
      this.$router.replace({ path, query })
    },

    // 编辑按钮触发
    async onClickEdit() {
      this.set_editable()
      this.editable = true
    },

    // 取消按钮触发
    onClickCancel() {
      if (this.res_id) {
        this.editable = false
        this.set_not_editable()
      } else {
        // 新增页面 , 点击取消, 返回列表页面
        const menu = this.$route.query.menu
        const query = { menu, view_type: 'tree' }
        const path = this.$route.path
        this.$router.replace({ path, query })
      }
    },

    onClickBack() {
      if (!this.editable) {
        const menu = this.$route.query.menu
        const query = { menu, view_type: 'tree' }
        const path = this.$route.path
        this.$router.replace({ path, query })
      }
    },

    // 保存按钮触发
    onClickSave() {
      //   console.log('onclickSubmit')

      this.handelCommit()
    },

    async handleBtnClicked(btn) {
      if (this.editable) {
        return
      }

      const { error, result } = await try_call(async () => {
        return await this.view.button_clicked({
          ...btn,
          record: this.record
        })
      })

      if (error) {
        console.log('btn click2 error', [error, result])
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        if (!result) {
          const res_id = this.record.id
          this.load_data(res_id)
        } else {
          // action name, string
          console.log('todo ret action', result)
          const actionId = result

          this.wizardAction = actionId
          this.wizardVisible = true

          //
          // this._action_return(result)
        }
      }
    },

    handleWizardDone() {
      console.log('handleWizardDone')
    },

    async handleOnUnarchive() {
      const res_id = this.res_id
      await this.view.unarchive(res_id)
      await this.load_data(res_id)
    },

    async handleOnArchive() {
      const res_id = this.res_id
      await this.view.archive(res_id)
      await this.load_data(res_id)
    },

    async handleOnCopy() {
      const res_id = await this.view.copy(this.res_id)
      const menu = this.$route.query.menu
      const query = { menu, view_type: 'form', id: res_id }
      const path = this.$route.path
      this.$route.meta.editable = true
      this.$router.push({ path, query })
    }
  }
}
