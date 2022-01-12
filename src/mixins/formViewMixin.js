import api from '@/odooapi'
import viewMixin from './viewMixin'
import editMixin from './editMixin'

const cp = item => JSON.parse(JSON.stringify(item))

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
  mixins: [viewMixin, editMixin],

  props: {
    editable: { type: Boolean, default: false }
  },

  data() {
    return {
      loading: false,
      showWizard: false,
      wizardViewInfo: {}
    }
  },
  computed: {
    viewType() {
      return 'form'
    },

    editable2: {
      get() {
        return this.editable
      },
      set(val) {
        this.$emit('update:editable', val)
      }
    },

    record() {
      const { record = {} } = this.data
      return record
    },

    values() {
      const { values = {} } = this.data
      return values
    }
  },
  watch: {},

  async created() {},

  mounted() {
    console.log('mounted', this.viewType, cp(this.viewInfo2), cp(this.node))
    this.load_data()
  },

  methods: {
    async load_data() {
      // console.log('load_data')
      const query = this.$route.query
      const resId = query.id ? parseInt(query.id) : undefined
      this.data = await api.Views.form.load_data(this.viewInfo2, resId)
    },

    handleOnEvent(event_name, ...args) {
      // 打印按钮
      if (event_name === 'on-print') this.handleOnPrint(...args)
      // 编辑按钮, 进入编辑 form
      else if (event_name === 'on-edit') this.handleOnEdit(...args)
      // 取消按钮, 取消编辑, 回到 form 或list view
      else if (event_name === 'on-rollback') this.handleOnBtnRollback(...args)
      // 保存按钮, 提交编辑, 回到 form view
      else if (event_name === 'on-commit') this.queue_handleOnBtnCommit(...args)
      // 删除按钮, 回到 list view
      else if (event_name === 'on-unlink') this.handleOnBtnUnlink(...args)
      // 复制按钮, 打开新建 form view
      else if (event_name === 'on-copy') this.handleOnBtnCopy(...args)
      // action按钮, 刷新页面 或者 跳转 或者 打开 弹窗
      else if (event_name === 'on-action') this.handleOnAction(...args)
    },

    handleOnViewEvent(event_name, ...args) {
      // console.log(' handleOnViewEvent, ', event_name, args)
      // 点击按钮
      if (event_name === 'button-clicked') this.handleButtonClicked(...args)
      // 编辑页面 form view 的编辑
      else if (event_name === 'on-change') this.queue_handleOnchange(...args)
      // 子组建直接更新数据. WPriority / WBooleanToggle 组件
      else if (event_name === 'on-write') this.handleOnwrite(...args)
      // action, wizard form, button click return, reload data
      else if (event_name === 'on-wizard-ok') this.handleOnWizardOk(...args)
    },

    async handleOnPrint(action) {
      // console.log(this.viewInfo)

      const res_id = this.record.id
      if (res_id) {
        const ids = [res_id]
        const { session, context } = this.viewInfo
        await api.Action.print({ session, context, action }, ids)
      }
    },

    async handleOnEdit() {
      // const dataInfo = await api.Views.form.onchange({
      //   ...this.viewInfo,
      //   record: this.record
      // })
      // this.data = dataInfo
    },

    async handleOnBtnRollback() {
      const res_id = this.record.id
      if (res_id) {
        this.editable2 = false
        const dataInfo = await api.Views.form.read(this.viewInfo2, res_id)
        this.data = dataInfo
      } else {
        this.editable2 = false
        this.$router.go(-1)
      }
    },

    async handleOnwrite(values) {
      // console.log('formview handleOnwrite:', cp(values))
      await api.Views.form.write(this.viewInfo2, {
        record: this.record,
        values
      })
      const dataInfo = await api.Views.form.read(this.viewInfo2, this.record.id)
      this.data = dataInfo
    },

    async queue_handleOnBtnCommit() {
      this.call_queue(['handleOnBtnCommit'])
    },

    async handleOnBtnCommit() {
      const { error, result } = await try_call(async () => {
        console.log('commit', this.data, this.record, this.values)

        return await api.Views.form.commit(this.viewInfo2, this.data)
      })

      if (error) {
        console.log(error)
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.editable2 = false

        const query = this.$route.query
        const res_id = query.id ? parseInt(query.id) : undefined

        if (res_id) {
          if (result) {
            const dataInfo = await api.Views.form.read(this.viewInfo2, res_id)
            this.data = dataInfo
          }
        } else {
          const { action } = this.viewInfo
          const path = `/web`
          const query = {
            action: action.id,
            view_type: 'form',
            id: result
          }
          this.$router.replace({ path, query })
        }
      }
    },

    async handleOnBtnUnlink() {
      console.log(' handleUnlink ')

      const { error } = await try_call(async () => {
        await api.Views.form.unlink(this.viewInfo2, this.record.id)
        return true
      })

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.$router.go(-1)
      }
    },

    async handleOnBtnCopy() {
      const res_id = await api.Views.form.copy(this.viewInfo2, this.record.id)
      const { action } = this.viewInfo

      this.$route.meta.editable = true
      const path = `/web`
      const query = {
        action: action.id,
        view_type: 'form',
        id: res_id
      }
      this.$router.replace({ path, query })

      // this.editable2 = true
    },

    async handleOnAction(action_todo) {
      // 工具条 按钮 触发
      console.log('action form0:', action_todo)
      const active_id = this.record.id
      const info = await api.Views.form.action_call(
        this.viewInfo2,
        action_todo,
        { active_id }
      )

      console.log('action form ret:', info)
      this._action_return(info)
    },

    async _action_return(result) {
      const { context, action } = result
      if (action.type === 'ir.actions.act_url') {
        console.log('建设中 act_url :', action.url)
        this.$message.info(`建设中..., act_url`)
      } else if (action.type === 'ir.actions.report') {
        console.log('建设中 report :', action.type)
        this.$message.info(`建设中..., ${action.type}`)
      } else if (action.type === 'ir.actions.act_window') {
        if (action.target === 'new') {
          console.log('TODO: btn clicked return action.target = new', action)
          this.wizardViewInfo = result
          this.showWizard = true
          // throw 'TODO: btn clicked return action.target = new'
        } else if (
          ['current', 'main'].includes(action.target) ||
          !action.target
        ) {
          console.log(action.target, 'current  router', action)
          const res_id = action.res_id
          const action_id = action.id
          const query = {
            action: action_id,
            active_id: context.active_id,
            ...(res_id ? { view_type: 'form', id: res_id } : {})
          }

          this.$route.meta.viewInfo = result
          // console.log(action.target, query)
          const path = `/web`
          this.$router.push({ path, query })
        } else {
          console.log('TODO: btn clicked return action.target', action)
          throw 'TODO: btn clicked return action.target'
        }
      } else {
        console.log('TODO btn clicked return action:', action.type, action)
        throw 'TODO btn clicked return action.type '
        // TBD next action
        //   this.showModal = true
      }
    },

    async handleButtonClicked(node) {
      console.log('btn click', node)

      const { error, result } = await try_call(async () => {
        return await api.Node.button_clicked(this.viewInfo2, {
          node,
          record: this.record
        })
      })

      if (error) {
        console.log('btn click2 error', [error, result])
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        if (!result) {
          const res_id = this.record.id
          const dataInfo = await api.Views.form.read(this.viewInfo2, res_id)
          this.data = dataInfo
        } else {
          this._action_return(result)
        }
      }
    },

    async handleOnWizardOk(result) {
      if (!result) {
        const res_id = this.record.id
        const dataInfo = await api.Views.form.read(this.viewInfo2, res_id)
        this.data = dataInfo
      } else {
        return this._action_return(result)
      }
    }
  }
}
