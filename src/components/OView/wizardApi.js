import { computed, reactive, toRaw, watch } from 'vue'
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

export function useWizardForm(props, ctx) {
  const localState = {
    formview: null
  }

  const state = reactive({
    formviewReady: false,
    formviewFieldReady: false,
    fields: {},
    viewInfo: {},
    mVal: {},
    values: {}
  })

  // watch actionId, and get formview, load field
  watch(
    () => props.actionId,
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      if (newVal) {
        const formview = api.env.wizardview(newVal)
        // await sleep(1000)
        localState.formview = formview
        state.formviewReady = true
        // await sleep(1000)
        state.fields = await formview.load_fields()
        state.viewInfo = formview.view_info
        state.formviewFieldReady = true
        await sleep(100)
        const dataInfo = await formview.onchange_new()
        const { values } = dataInfo
        state.mVal = { ...values }
        state.values = { ...values }
      }
    },
    { immediate: true }
  )

  const archButtons = computed(() => {
    if (!(state.formviewReady && localState.formview)) {
      return []
    } else {
      return localState.formview.arch_buttons({}, state.values)
    }
  })

  async function button_click(btn) {
    // await sleep(1000)

    const { error, result } = await try_call(async () => {
      return await localState.formview.wizard_button_clicked(
        btn,
        async done => {
          await sleep(100)
          // 在提交函数中执行 校验.
          // 提交函数 会进行排队. 等待 以前的 onchange 全部完成.
          // 以确保 当前页面中的 数据是 onchange 后的最新数据
          // 这里再等待100ms 是为了确保 前端页面完全刷新
          ctx.editRef.value.validate().then(
            () => done(true),
            () => done(false)
          )
        }
      )
    })

    if (error) {
      console.log('btn click2 error', [error, result])
      return error
      //   throw error
      //   this.$error({ title: '用户错误', content: error.data.message })
    } else {
      // if (!result) {
      //   const res_id = this.record.id
      //   this.load_data(res_id)
      // } else {
      //   console.log('todo ret action')
      //   // this._action_return(result)
      // }
    }
  }

  const formInfo = computed(() => {
    return {
      viewInfo: toRaw(state.viewInfo),
      fields: toRaw(state.fields),
      record: {},
      values: toRaw(state.values),
      editable: true
    }
  })

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

  async function onLoadReation(fieldName, relation_info) {
    // console.log('onLoadReation', fieldName, relation_info)
    if (!localState.formview) return

    localState.formview.load_relations_done({ [fieldName]: relation_info })

    await sleep(100)
    state.fields = localState.formview.fields
    state.viewInfo = localState.formview.view_info
    await sleep(100)
  }

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
    onChange,
    onLoadReation,
    archButtons,
    button_click
  }
}
