import { computed, reactive, toRaw, watch } from 'vue'
import api from '@/odoorpc'

import { useL10n } from '@/components/tools/useL10n'

// res.users 需要 create, edit.
// no -- delete

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export function useForm(props, ctx) {
  // watch actionId
  // load formview
  // get fields
  // load data
  //
  //

  const { tr } = useL10n()

  const localState = {
    formview: null
  }

  const state = reactive({
    formviewReady: false,
    formviewFieldReady: false,
    mVal: {},
    fields: {},
    viewInfo: {},
    record: {},
    editable: false,
    values: {}
  })

  const buttons = computed(() => {
    if (state.formviewReady && localState.formview) {
      return localState.formview.buttons
    } else {
      return {}
    }
  })

  // const header_buttons = computed(() => {
  //   return state.formviewReady && localState.formview
  //     ? localState.formview.header_buttons(state.record, state.values)
  //     : []
  // })

  const currentState = computed(() => {
    return state.formviewReady && localState.formview
      ? { ...state.record, ...state.values }[
          localState.formview.state_field_name
        ]
      : ''
  })

  const statusbarVisible = computed(() => {
    return state.formviewReady && localState.formview
      ? localState.formview.header_statusbar_visible(currentState.value)
      : []
  })

  const sheet = computed(() => {
    if (state.formviewReady && localState.formview) {
      const sheet0 = localState.formview.view_sheet(state.formviewFieldReady)

      return sheet0
    } else {
      return { children: {} }
    }
  })

  // watch actionId, and get formview, load field
  watch(
    () => props.actionId,
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      if (newVal) {
        const formview = api.env.formview(newVal)
        // await sleep(1000)
        localState.formview = formview
        state.formviewReady = true
        // await sleep(1000)
        state.fields = await formview.load_fields()
        state.viewInfo = formview.view_info

        state.formviewFieldReady = true
      }
    },
    { immediate: true }
  )

  // watch formview and resId, load data
  watch(
    [() => state.formviewFieldReady, () => props.resId],
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      const [formviewFieldReady, resId] = newVal
      // console.log(formviewFieldReady, resId)
      if (!formviewFieldReady) return
      if (resId) {
        // await sleep(1000)
        const record = await localState.formview.read(Number(resId))

        state.record = record
        state.mVal = {}
        state.values = {}
        state.editable = false
      } else {
        const dataInfo = await localState.formview.onchange_new()
        const { values } = dataInfo
        state.mVal = values
        state.record = {}
        state.values = values
        state.editable = true
      }
    },
    { immediate: true }
  )

  function getLabel(fieldInfo) {
    if (!fieldInfo.string) return undefined

    if (typeof fieldInfo.string !== 'function') {
      return fieldInfo.string
    }

    if (state.formviewFieldReady && localState.formview) {
      const view = localState.formview
      const record2 = view.merge_to_one(state.record, state.values)
      const record = view.format_for_modifiers(record2)
      return fieldInfo.string({ record })
    }

    return
  }

  function getInvisible(fieldInfo) {
    if (!fieldInfo.invisible) return undefined
    if (typeof fieldInfo.invisible !== 'function') {
      return fieldInfo.invisible
    }

    if (state.formviewFieldReady && localState.formview) {
      const view = localState.formview
      const record2 = view.merge_to_one(state.record, state.values)
      const record = view.format_for_modifiers(record2)
      return fieldInfo.invisible({ record })
    }

    return
  }

  function getRules(fieldInfo) {
    // console.log([fieldInfo.name, fieldInfo.required], fieldInfo)
    if (!state.editable) return undefined
    if (!fieldInfo.required) return undefined

    function required_get() {
      if (typeof fieldInfo.required !== 'function') {
        return fieldInfo.required
      }

      if (state.formviewFieldReady && localState.formview) {
        const view = localState.formview
        const record2 = view.merge_to_one(state.record, state.values)
        const record = view.format_for_modifiers(record2)
        return fieldInfo.required({ record })
      }

      return false
    }

    const required = required_get()

    if (!required) return undefined
    return [{ required: true, message: `请输入${tr(fieldInfo.string)}!` }]
  }

  async function onChange(fname, value) {
    // console.log('onChange in formview', fname, value)
    if (!localState.formview) return

    const formview = localState.formview

    const result = await formview.onchange(fname, value)
    const { values: values2 = {} } = result
    state.values = { ...values2 }
    state.mVal = { ...state.mVal, ...values2 }

    // onchange 使用 form 自身的校验, 仅仅校验刚刚编辑的字段
    // 无需全部校验
    // 在提交时, 应做一次校验
    // ctx.editRef.value.validate()
  }

  async function handelCommit() {
    if (!localState.formview) {
      // error
      return
    }

    const id_ret = await localState.formview.commit(async done => {
      await sleep(100)
      // 在提交函数中执行 校验.
      // 提交函数 会进行排队. 等待 以前的 onchange 全部完成.
      // 以确保 当前页面中的 数据是 onchange 后的最新数据
      // 这里再等待100ms 是为了确保 前端页面完全刷新
      ctx.editRef.value.validate().then(
        () => done(true),
        () => done(false)
      )
    })

    if (id_ret) {
      if (props.resId) {
        const record = await localState.formview.read(id_ret)
        state.record = record
        state.values = {}
        state.editable = false
      } else {
        const rounteVal = ctx.router.currentRoute.value
        const { query, path } = rounteVal
        const { menu } = query
        const query2 = { menu, view_type: 'form', id: id_ret }
        ctx.router.push({ path, query: query2 })
      }
    } else {
      // 校验失败
    }
  }

  // 编辑按钮触发
  function onClickEdit() {
    if (!localState.formview) return
    state.mVal = localState.formview.set_editable(state.record)
    state.values = {}
    state.editable = true
  }

  // 取消按钮触发
  function onClickCancel() {
    if (props.resId) {
      state.editable = false
      state.mVal = {}
      state.values = {}
    } else {
      // // 新增页面 , 点击取消, 返回列表页面

      const rounteVal = ctx.router.currentRoute.value
      const { query, path } = rounteVal
      const { menu } = query
      const query2 = { menu, view_type: 'tree' }
      ctx.router.push({ path, query: query2 })
    }
  }

  // 保存按钮触发
  function onClickSave() {
    //   console.log('onclickSubmit')

    handelCommit()
  }

  // 新增按钮触发
  function onClickNew() {
    const rounteVal = ctx.router.currentRoute.value
    const { query, path } = rounteVal
    const { menu } = query
    const query2 = { menu, view_type: 'form' }
    ctx.router.push({ path, query: query2 })
  }

  // 删除按钮触发
  async function onClickDel() {
    if (!localState.formview) return
    await localState.formview.unlink(state.record.id)
    const rounteVal = ctx.router.currentRoute.value
    const { query, path } = rounteVal
    const { menu } = query
    const query2 = { menu, view_type: 'tree' }
    ctx.router.replace({ path, query: query2 })
  }

  function onClickBack() {
    if (!state.editable) {
      const rounteVal = ctx.router.currentRoute.value
      const { query, path } = rounteVal
      const { menu } = query
      const query2 = { menu, view_type: 'tree' }
      ctx.router.push({ path, query: query2 })
    }
  }

  function onClickCRUD(btn) {
    const btn_fns = {
      back: onClickBack,
      new: onClickNew,
      edit: onClickEdit,
      save: onClickSave,
      cancel: onClickCancel,
      del: onClickDel,
      //
      unlink: 'onClickDel',
      copy: 'handleOnCopy',
      archive: 'handleOnArchive',
      unarchive: 'handleOnUnarchive'
    }

    btn_fns[btn]()
  }

  function onLoadReation(fieldName, relation_info) {
    // console.log('onLoadReation', fieldName, relation_info)
    if (!localState.formview) return

    localState.formview.load_relations_done({
      [fieldName]: [relation_info, state.viewInfo]
    })
  }

  return {
    mVal: computed(() => state.mVal),
    fields: computed(() => state.fields), // 自定义页面需要
    sheet: sheet,
    formInfo: computed(() => {
      return {
        viewInfo: toRaw(state.viewInfo),
        fields: toRaw(state.fields),
        record: toRaw(state.record),
        values: toRaw(state.values),
        editable: state.editable
      }
    }),
    buttons,
    currentState,
    statusbarVisible,
    getRules,
    getLabel,
    getInvisible,
    onChange,
    onClickCRUD,
    onLoadReation
  }
}

// old 代码
//

// hasActive() {
//   // 判断 存档和取消存档 菜单是否显示
//   const active = this.fields.active
//   return active ? true : false
// }

// async handleBtnClicked(btn) {
//   if (this.editable) {
//     return
//   }

//   const { error, result } = await try_call(async () => {
//     return await this.view.button_clicked({
//       ...btn,
//       record: this.record
//     })
//   })

//   if (error) {
//     console.log('btn click2 error', [error, result])
//     this.$error({ title: '用户错误', content: error.data.message })
//   } else {
//     if (!result) {
//       const res_id = this.record.id
//       this.load_data(res_id)
//     } else {
//       // action name, string
//       console.log('todo ret action', result)
//       const actionId = result

//       this.wizardAction = actionId
//       this.wizardVisible = true

//       //
//       // this._action_return(result)
//     }
//   }
// },

// handleWizardDone() {
//   console.log('handleWizardDone')
// },

// async handleOnUnarchive() {
//   const res_id = this.res_id
//   await this.view.unarchive(res_id)
//   await this.load_data(res_id)
// },

// async handleOnArchive() {
//   const res_id = this.res_id
//   await this.view.archive(res_id)
//   await this.load_data(res_id)
// },

// async handleOnCopy() {
//   const res_id = await this.view.copy(this.res_id)
//   const menu = this.$route.query.menu
//   const query = { menu, view_type: 'form', id: res_id }
//   const path = this.$route.path
//   this.$route.meta.editable = true
//   this.$router.push({ path, query })
// }

// // form wizard
// import { try_call } from '@/odoorpc/tools'
// title() {
//   if (this.view) {
//     const action_info = this.view.action_info
//     return action_info.name
//   } else {
//     return ''
//   }
// },

// arch_buttons() {
//   if (!this.view) {
//     return []
//   }

//   return this.view.arch_buttons(this.record, this.values)
// }

// async init() {
//   // api
//   console.log('init', this.action, this.actionIds)

//   const view = api.env.wizardview(this.action, {
//     active_ids: this.actionIds
//   })
//   this.view = view
//   console.log('init', view)

//   this.fields = await view.load_fields()
//   console.log('init', this.fields, view)
//   this.viewInfo = view.view_info

//   await sleep(10)

//   await this.load_relation()

//   const dataInfo = await view.onchange_new()
//   const { values } = dataInfo

//   this.formValues = values
//   this.record = {}
//   this.values = values

//   await sleep(10)

//   const res = await this.load_relation_data(true)
//   console.log('wizard, init, load rel data:', res, view)
//   this.editable = true
// },

// async button_click(btn) {
//   console.log(btn)

//   // await sleep(1000)

//   const { error, result } = await try_call(async () => {
//     return await this.view.wizard_button_clicked({
//       ...btn
//     })
//   })

//   if (error) {
//     console.log('btn click2 error', [error, result])
//     this.$error({ title: '用户错误', content: error.data.message })
//   } else {
//     // if (!result) {
//     //   const res_id = this.record.id
//     //   this.load_data(res_id)
//     // } else {
//     //   console.log('todo ret action')
//     //   // this._action_return(result)
//     // }
//   }
// },
