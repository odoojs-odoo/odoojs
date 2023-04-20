import { provide, computed, reactive, toRaw, watch, ref } from 'vue'
import api from '@/odoorpc'
import { useLang } from '@/components/useApi/useLang'

import { useGlobalConfig } from '@/components/useApi/useGlobalConfig'

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
  const { viewActions } = useGlobalConfig()
  const { lang } = useLang()
  const localState = {
    formview: null
  }

  const data_changed = ref(1)
  provide('data_changed', data_changed)

  const edit_cancel = ref(1)
  provide('edit_cancel', edit_cancel)

  const state = reactive({
    formviewReady: false,
    formviewFieldReady: false,

    lang_changed: 1,
    view_changed: 1,

    mVal: {},

    record: {},
    editable: false,
    values: {}
  })

  function check_lang() {
    return state.lang_changed
  }

  function view_get() {
    check_lang()
    return state.formviewFieldReady ? localState.formview : undefined
  }

  function check_view_changed() {
    return state.view_changed
  }

  const formInfo = computed(() => {
    check_view_changed()

    const info = {
      lang_changed: toRaw(state.lang_changed),
      record: toRaw(state.record),
      values: toRaw(state.values),
      editable: toRaw(state.editable)
    }

    const view = view_get()
    const viewInfo = view ? view.view_info : {}
    const fields = view ? view.fields : {}

    return { viewInfo, fields, ...info }
  })

  async function langChange(lg) {
    const view = view_get()
    if (!view) return false
    await view.set_lang(lg)
    state.lang_changed += 1

    const res_id = state.record.id
    loadData(res_id)
  }

  // watch lang
  watch(
    lang,
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      // console.log(newVal, oldVal)
      langChange(newVal)
    },
    { immediate: true }
  )

  const buttons = computed(() => {
    const view = view_get()
    return view ? view.buttons : {}
  })

  const hasActive = computed(() => {
    // 判断 存档和取消存档 菜单是否显示
    const view = view_get()
    if (!view) return false
    const active = view.fields.active
    return active ? true : false
  })

  const headerButtons = computed(() => {
    const view = view_get()
    if (!view) return []
    return view.header_buttons(formInfo.value)
  })

  // const archButtons = computed(() => {
  //   if (!(state.formviewReady && localState.formview)) {
  //     return []
  //   } else {
  //     return localState.formview.arch_buttons(state.record, state.values)
  //   }
  // })

  const currentState = computed(() => {
    const view = view_get()
    if (!view) return ''
    const record = { ...state.record, ...state.values }
    return record[view.state_field_name] || ''
  })

  const statusbarVisible = computed(() => {
    const view = view_get()
    if (!view) return []
    return view.header_statusbar_visible(currentState.value)
  })

  async function onLoadReation(fieldName, relation_info) {
    const view = view_get()
    if (!view) return

    view.load_relations_done({ [fieldName]: relation_info })

    await sleep(100)
    state.view_changed += 1

    await sleep(100)
  }

  async function loadData(res_id) {
    const view = view_get()
    if (!view) return

    const record = await view.read(res_id)

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
        await formview.load_fields()
        state.view_changed += 1

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
    const view = view_get()
    if (!view) return

    const formview = view

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
    const view = view_get()
    if (!view) return

    const id_ret = await view.commit(async done => {
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
        const record = await view.read(id_ret)
        state.record = record
        state.values = {}
        data_changed.value += 1
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
    const view = view_get()
    if (!view) return

    state.mVal = view.set_editable(state.record)
    state.values = {}
    state.editable = true
  }

  // 取消按钮触发
  function onClickCancel() {
    if (props.resId) {
      state.editable = false

      state.mVal = {}
      state.values = {}
      edit_cancel.value += 1
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
    const view = view_get()
    if (!view) return

    await view.unlink(state.record.id)
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
    const view = view_get()
    if (!view) return

    const res_id = state.record.id
    await view.unarchive(res_id)
    await loadData(res_id)
  }

  async function onArchive() {
    if (state.editable) {
      return
    }
    const view = view_get()
    if (!view) return

    const res_id = state.record.id
    await view.archive(res_id)
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
    const view = view_get()
    if (!view) return

    const { error, result } = await try_call(async () => {
      const res = await view.button_clicked({ ...btn, record: state.record })

      return res
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

  return {
    mVal: computed({
      get() {
        return state.mVal
      },

      // eslint-disable-next-line no-unused-vars
      set(val) {
        // state.mVal = {...}
      }
    }),
    viewActions,
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
