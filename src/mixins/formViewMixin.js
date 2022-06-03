import api from '@/odooapi'
import viewMixin from './viewMixin'
import editMixin from './editMixin'

import { try_call } from '@/odooapi/tools'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

const is_node = node => {
  if (typeof node !== 'object') return false
  if (Array.isArray(node)) return false
  if (typeof node === 'boolean') return false
  return true
}

const tuples2ids = tuples => {
  const ids = tuples.reduce((acc, tup) => {
    const op = tup[0]
    if (op === 6) acc = [...tup[2]]
    return acc
  }, [])

  return ids
}

export default {
  mixins: [viewMixin, editMixin],

  props: {
    editable: { type: Boolean, default: false }
  },

  data() {
    return {
      loading: false,
      values_edit: {}
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
    },

    field_nodes() {
      const fn = node => {
        if (!is_node(node)) return []
        else if (node.tagName === 'field') {
          const meta = this.view.fields[node.attrs.name]

          if (meta.type === 'boolean') {
            return []
          } else {
            return [node]
          }
        } else
          return (node.children || []).reduce((acc, ch) => {
            return [...acc, ...fn(ch)]
          }, [])
      }

      return fn(this.node)
    },
    rules_edit() {
      return this.field_nodes.reduce((acc, node) => {
        if (this.get_required(node)) {
          acc[node.attrs.name] = [
            { required: true, message: '不能为空!', trigger: ['change'] }
          ]
        }
        return acc
      }, {})
    }
  },
  watch: {
    values: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newVal, oldval) {
        // console.log('watch, value:', newVal, oldval)
        this.set_values_edit(this.record, newVal)
      },
      deep: true,
      immediate: true
    }
  },

  async created() {},

  mounted() {
    // console.log('mounted', this.viewType, cp(this.viewInfo2), cp(this.node))
    // console.log('mounted', cp(this.field_nodes))

    this.load_data()
  },

  methods: {
    get_required(node) {
      return api.Node.required(
        { ...this.viewInfo2, node },
        { record: this.record, values: this.values }
      )
    },

    set_values_edit(record, values2) {
      const values = { ...record, ...values2 }
      this.values_edit = Object.keys(values).reduce((acc, fld) => {
        const meta = this.view.fields[fld] || {}

        if (['one2many'].includes(meta.type)) {
          // acc[fld] = values[fld] || []
        } else if (['many2many'].includes(meta.type)) {
          const old = record[fld] || []
          const nv = values2[fld] || []

          if (old.length) acc[fld] = old
          if (nv.length) acc[fld] = tuples2ids(nv)
        } else if (['many2one'].includes(meta.type)) {
          acc[fld] = (values[fld] || [null, ''])[0]
        } else if (['boolean'].includes(meta.type)) {
          acc[fld] = values[fld]
        } else if (['integer', 'float'].includes(meta.type)) {
          acc[fld] = values[fld]
        } else {
          acc[fld] = values[fld] || ''
        }

        return acc
      }, {})
    },

    async load_data() {
      // // const query = this.$route.query
      const query = this.query_get()
      //

      const resId = query.id ? parseInt(query.id) : undefined
      this.data = await api.Views.form.load_data(this.viewInfo2, resId)
      this.set_values_edit(this.record, this.values)

      // console.log('load_data', [
      //   this.data,
      //   this.record,
      //   this.values,
      //   this.values_edit
      // ])

      this.update_breadcrumbName(resId ? this.record.display_name : '新建')
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
      console.log(action)

      const res_id = this.record.id
      if (res_id) {
        const ids = [res_id]
        const { context } = this.viewInfo
        await api.Action.print({ context, action }, ids)
      }
    },

    async handleOnEdit() {},

    async handleOnBtnRollback() {
      const res_id = this.record.id
      if (res_id) {
        this.editable2 = false
        const dataInfo = await api.Views.form.read(this.viewInfo2, res_id)
        this.data = dataInfo
        this.update_breadcrumbName(this.record.display_name)
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
      // console.log('commit', this.data, this.record, this.values_edit)

      for (const fld in this.rules_edit) {
        const msg = await new Promise(resolve => {
          this.$refs.refForm.validateField(fld, msg => {
            resolve(msg)
          })
        })
        if (msg) {
          const meta = this.view.fields[fld]
          this.$message.error(`${meta.string}  ${msg}`, 10)
        }
      }

      this.$refs.refForm.validate(async valid => {
        if (valid) {
          this.handleOnBtnCommit2()
        } else {
          // console.log('xxxx2222', valid)
        }
      })
    },
    async handleOnBtnCommit2() {
      const { error, result } = await try_call(async () => {
        // console.log('commit', this.data, this.record, this.values)
        return await api.Views.form.commit(this.viewInfo2, this.data)
      })
      if (error) {
        console.log(error)
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.editable2 = false
        // const query = this.$route.query
        const query = this.query_get()
        const res_id = query.id ? parseInt(query.id) : undefined
        if (res_id) {
          if (result) {
            const dataInfo = await api.Views.form.read(this.viewInfo2, res_id)
            this.data = dataInfo
            this.update_breadcrumbName(this.record.display_name)
          }
        } else {
          const { action, context, views } = this.viewInfo
          // const { query: query_old } = this.$route
          const query_old = query
          const { active_id } = query_old
          const active_query = active_id ? { active_id } : {}
          const query_mew = { action: action.id, view_type: 'form', id: result }
          const query2 = { ...query_mew, active_query }
          this.replace_route({ query: query2, action, context, views })
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

      const { query: query_old } = this.$route
      const { active_id } = query_old
      const active_query = active_id ? { active_id } : {}
      const query_new = { action: action.id, view_type: 'form', id: res_id }
      const query = { ...query_new, ...active_query }

      this.replace_route({ query })
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
    },

    async _action_return(result) {
      // console.log('form view, action_return', result)
      return this.action_return(result)
    }
  }
}
