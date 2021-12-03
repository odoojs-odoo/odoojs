import { tools } from '@/odoojs'
import viewMixin from './viewMixin'

const cp = item => JSON.parse(JSON.stringify(item))

const global_debug = 1
const try_call = async (fn, debug) => {
  if (global_debug || debug) return { result: await fn() }
  try {
    return { result: await fn() }
  } catch (error) {
    return { error }
  }
}

export default {
  mixins: [viewMixin],

  props: {
    editable: { type: Boolean, default: false }
  },

  data() {
    return {
      loading: false,
      dataInfo: { dataDict: {} }
    }
  },
  computed: {
    editable2: {
      get() {
        return this.editable
      },
      set(val) {
        this.$emit('update:editable', val)
      }
    },

    formInfo() {
      return tools.form_info({ view_info: this.viewInfo })
    }
  },
  watch: {},

  async created() {},

  mounted() {
    // console.log('mounted:', cp(this.formInfo.node))
  },

  methods: {
    async initData() {
      const model = this.modelGet()

      const query = this.$route.query
      const resId = query.id ? parseInt(query.id) : undefined
      // console.log(resId)
      this.loading = true
      if (resId) await model.read(resId)
      else await model.onchange()
      this.loading = false

      this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
      this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
    },

    methodCall(...args) {
      const model = this.modelGet()
      const view = 'form'
      return model.call(view, ...args)
    },

    handleOnEvent(event_name, ...args) {
      // 打印按钮
      if (event_name === 'on-print') this.handleOnPrint(...args)
      // 编辑按钮, 进入编辑 form
      else if (event_name === 'on-edit') this.handleOnEdit(...args)
      // 取消按钮, 取消编辑, 回到 form 或list view
      else if (event_name === 'on-rollback') this.handleOnBtnRollback(...args)
      // 保存按钮, 提交编辑, 回到 form view
      else if (event_name === 'on-commit') this.handleOnBtnCommit(...args)
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
      // 编辑页面 包括 relation 字段的的 子form view 的编辑
      else if (event_name === 'on-change') this.handleOnchange(...args)
      // relation 字段 刷新数据
      else if (event_name === 'relation-browse')
        this.handleRelationBrowse(...args)
      // relation 字段 点击 打开弹窗
      else if (event_name === 'relation-pick') this.handleRelationPick(...args)
      // relation 字段 编辑页面 提交
      else if (event_name === 'on-commit') this.handleOnEventCommit(...args)
      // relation 字段 编辑页面 取消 回滚
      else if (event_name === 'on-rollback') this.handleOnRollback(...args)
      // relation 字段 form 页面 删除
      else if (event_name === 'on-unlink') this.handleOnEventUnlink(...args)
    },

    async handleOnPrint(action) {
      const model = this.modelGet()
      // const res =
      await model.print(action)
      // console.log(res)
    },

    async handleOnEdit() {
      this.editable2 = true
    },

    async handleOnBtnRollback(payload = {}) {
      const model = this.modelGet()
      const rid = this.dataInfo.dataDict.id

      if (!rid) {
        this.editable2 = false
        const path = `/web`
        this.$router.replace({ path, query: { action: model.action.id } })
      } else {
        console.log('rollback')
        this.loading = true
        this.editable2 = false
        await model.rollback(payload)
        this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
        this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
        this.loading = false
      }
    },

    async handleOnBtnCommit() {
      this.editable2 = false

      this.loading = true
      const model = this.modelGet()

      const { error } = await try_call(async () => {
        return await model.commit()
      })
      this.loading = false

      if (error) {
        console.log(error)
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.editable2 = false

        const query = this.$route.query
        const resId = query.id ? parseInt(query.id) : undefined

        if (resId) {
          this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
          this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
        } else {
          const actionId = model.action.id
          const path = `/web`
          const query = {
            action: actionId,
            view_type: 'form',
            id: model.data_info.dataDict.id
          }
          this.$router.push({ path, query })
        }
      }
    },

    async handleOnBtnUnlink() {
      console.log(' handleUnlink ')
      const model = this.modelGet()

      const { error } = await try_call(async () => {
        await model.unlink()
        return true
      })

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        const path = `/web`
        const model = this.modelGet()
        const query = { action: model.action.id }
        this.$router.replace({ path, query })
      }
    },

    async handleOnBtnCopy() {
      // this.$message.info(`建设中..., copy`)
      const model = this.modelGet()
      await model.copy()

      this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
      this.dataInfo = JSON.parse(JSON.stringify(model.data_info))

      this.editable2 = true
    },

    async handleOnAction(action) {
      console.log('action form0:', action)
      const model = this.modelGet()
      const { error, result } = await try_call(async () => {
        return await model.action_call(action)
      })

      console.log('action form:', error, result)

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        if (result) this.$emit('on-action-return', result)
        else {
          this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
          this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
        }
      }
    },

    async handleButtonClicked(payload = {}) {
      const model = this.modelGet()
      console.log('btn click', payload, model)

      const { error, result } = await try_call(async () => {
        return await model.button_clicked(payload)
      })

      console.log('btn click2', error, result)

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        if (result) this.$emit('on-action-return', result)
        else {
          this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
          this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
        }
      }
    },

    async handleRelationBrowse(payload) {
      console.log(' handleRelationBrowse', payload.field, payload)
      const model = this.modelGet()
      await model.relation_to_browse(payload)
      this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
      this.dataInfo = JSON.parse(JSON.stringify(model.data_info))

      // console.log('xxxxxx,', JSON.parse(JSON.stringify(model.view_info)))
    },

    async handleRelationPick(payload) {
      console.log(' handleRelationPick ', payload)
      const model = this.modelGet()
      this.loading = true
      // 新增o2m 页面. 先清理 formview. 避免 显示 旧的编辑 数据
      const res = await model.relation_pick_reset(payload)
      if (res) this.dataInfo = JSON.parse(JSON.stringify(model.data_info))

      await model.relation_pick(payload)
      this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
      this.dataInfo = JSON.parse(JSON.stringify(model.data_info))

      // console.log('xxxxxx,', JSON.parse(JSON.stringify(model.view_info)))
      this.loading = false
    },

    async handleOnchange(payload = {}) {
      this.loading = true
      const model = this.modelGet()
      await model.onchange(payload)
      this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
      this.loading = false
    },

    async handleOnEventCommit(payload = {}) {
      const { callback: callback_relation } = payload
      const model = this.modelGet()

      const res = await try_call(async () => {
        await model.commit({ ...payload })
        return true
      })

      const { error, result } = res
      console.log(error, result)

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
        console.log('commit', cp(model.data_info))
        if (callback_relation) callback_relation(res)
      }
    },

    async handleOnRollback(payload = {}) {
      this.loading = true
      const model = this.modelGet()
      await model.rollback(payload)
      this.viewInfo = JSON.parse(JSON.stringify(model.view_info))
      this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
      this.loading = false
    },

    async handleOnEventUnlink(payload = {}) {
      const { callback: callback_relation } = payload
      const model = this.modelGet()
      const res = await try_call(async () => {
        await model.unlink({ ...payload })
        return true
      })

      const { error } = res

      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.dataInfo = JSON.parse(JSON.stringify(model.data_info))
        if (callback_relation) callback_relation(res)
      }
    }
  }
}
