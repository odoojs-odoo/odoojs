import { computed, reactive, toRaw, watch, ref } from 'vue'
import api from '@/odoorpc'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

let global_debug = 0
global_debug = 1

export const try_call = async fn => {
  // console.log('try_call')
  if (global_debug) return { result: await fn() }
  try {
    return { result: await fn() }
  } catch (error) {
    return { error }
  }
}

export function useForm(props, ctx) {
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

  const headerButtons = computed(() => {
    return state.formviewReady && localState.formview
      ? // ? localState.formview.header_buttons(state.record, state.values)
        localState.formview.header_buttons(formInfo.value)
      : []
  })

  // const archButtons = computed(() => {
  //   if (!(state.formviewReady && localState.formview)) {
  //     return []
  //   } else {
  //     return localState.formview.arch_buttons(state.record, state.values)
  //   }
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

  const hasActive = computed(() => {
    // 判断 存档和取消存档 菜单是否显示
    const active = state.fields.active
    return active ? true : false
  })

  async function onLoadReation(fieldName, relation_info) {
    if (!localState.formview) return

    localState.formview.load_relations_done({ [fieldName]: relation_info })

    await sleep(100)
    state.fields = localState.formview.fields
    state.viewInfo = localState.formview.view_info
    await sleep(100)
  }

  async function loadData(res_id) {
    if (!localState.formview) return
    const record = await localState.formview.read(res_id)
    state.record = record
  }

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
        await loadData(Number(resId))
        state.mVal = {}
        state.values = {}
        state.editable = false
      } else {
        const dataInfo = await localState.formview.onchange_new()
        const { values } = dataInfo
        state.mVal = { ...values }
        state.record = {}
        state.values = { ...values }
        state.editable = true
      }
    },
    { immediate: true }
  )

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
        state.editable = false
        const record = await localState.formview.read(id_ret)
        state.record = record
        state.values = {}
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

  async function onUnarchive() {
    if (state.editable) {
      return
    }
    if (!localState.formview) return

    const res_id = state.record.id
    await localState.formview.unarchive(res_id)
    await loadData(res_id)
  }

  async function onArchive() {
    if (state.editable) {
      return
    }
    if (!localState.formview) return

    const res_id = state.record.id
    await localState.formview.archive(res_id)
    await loadData(res_id)
  }

  // async handleOnCopy() {
  //   const res_id = await this.view.copy(this.res_id)
  //   const menu = this.$route.query.menu
  //   const query = { menu, view_type: 'form', id: res_id }
  //   const path = this.$route.path
  //   this.$route.meta.editable = true
  //   this.$router.push({ path, query })
  // }

  function onClickCRUD(btn) {
    const btn_fns = {
      back: onClickBack,
      new: onClickNew,
      edit: onClickEdit,
      save: onClickSave,
      cancel: onClickCancel,
      del: onClickDel,
      //
      archive: onArchive,
      unarchive: onUnarchive,
      copy: 'handleOnCopy',
      unlink: 'onClickDel',
      unlink_multi: '',
      export: 'handleOnExport'
    }

    btn_fns[btn]()
  }

  const wizardVisible = ref(false)
  const wizardAction = ref(null)

  async function onBtnClick(btn) {
    if (state.editable) {
      return
    }
    if (!localState.formview) return

    const { error, result } = await try_call(async () => {
      return await localState.formview.button_clicked({
        ...btn,
        record: state.record
      })
    })

    if (error) {
      console.log('btn click2 error', [error, result])
      throw error
      // this.$error({ title: '用户错误', content: error.data.message })
    } else {
      if (!result) {
        const res_id = state.record.id
        await loadData(res_id)
      } else {
        // action name, string
        console.log('todo ret action', result)
        wizardAction.value = result
        wizardVisible.value = true
      }
    }
  }

  async function onWizardDone() {
    console.log('onWizardDone')
    const res_id = state.record.id
    await loadData(res_id)
  }

  const formInfo = computed(() => {
    return {
      viewInfo: toRaw(state.viewInfo),
      fields: toRaw(state.fields),
      record: toRaw(state.record),
      values: toRaw(state.values),
      editable: state.editable
    }
  })

  return {
    fields: computed(() => state.fields), // 自定义页面需要
    mVal: computed({
      get() {
        return state.mVal
      },

      // eslint-disable-next-line no-unused-vars
      set(val) {
        // state.mVal = {...}
      }
    }),

    formInfo,
    buttons,
    headerButtons,
    hasActive,
    currentState,
    statusbarVisible,

    onChange,
    onClickCRUD,
    onLoadReation,
    onBtnClick,
    wizardVisible,
    wizardAction,
    onWizardDone
  }
}
