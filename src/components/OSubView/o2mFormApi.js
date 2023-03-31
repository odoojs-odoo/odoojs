import { computed, reactive, watch, toRaw } from 'vue'

import api from '@/odoorpc'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export function useO2mForm(props, ctx) {
  const state = reactive({
    formview: undefined,
    values: {},
    mVal: {}
  })

  function formview_edit_get() {
    if (state.formview) {
      return state.formview
    }
    const info = toRaw(props.relationInfo)
    const rel = api.env.relation(info)
    const formview = rel.form
    state.formview = formview
    return formview
  }

  // load visible, values
  watch(
    () => props.visible,
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      // console.log(newVal, oldVal, props)

      if (!newVal) {
        // o2mform 关闭.
        state.values = {}
      } else {
        await sleep(100)
        state.values = { ...props.values }
        await sleep(100)
        open_modal()
      }
    },
    { immediate: true }
  )

  function open_modal() {
    const res_id = computed(() => {
      if (props.values.id) {
        return props.values.id
      } else {
        return props.record.id
      }
    })
    if (res_id.value) {
      // 编辑
      set_editable()
    } else {
      // 新增
      onchange_new()
    }
  }

  function set_editable() {
    const formview = formview_edit_get()
    const vals = formview.set_editable(toRaw(props.record), toRaw(state.values))
    // console.log(props.record, state.values, vals)
    state.mVal = { ...vals }
  }

  async function onchange_new() {
    const formview = formview_edit_get()
    const vals = formview.set_editable({}, {})

    state.mVal = { ...vals }
    const parentFormInfo = toRaw(props.parentFormInfo)
    const result = await formview.onchange_new(parentFormInfo)
    // console.log('oncgange new ', result)
    const { values: values2 = {} } = result
    state.values = values2
    state.mVal = { ...state.mVal, ...values2 }
  }

  async function onChange(fname, value) {
    const formview = formview_edit_get()
    if (!formview) return

    const parentFormInfo = toRaw(props.parentFormInfo)
    const result = await formview.onchange(fname, value, parentFormInfo)

    const { values: values2 = {} } = result
    state.values = values2
    state.mVal = { ...state.mVal, ...values2 }
    // onchange 使用 form 自身的校验, 仅仅校验刚刚编辑的字段
    // 无需全部校验
    // 在提交时, 应做一次校验
    // ctx.editRef.value.validate()
  }

  async function commit() {
    const formview = formview_edit_get()
    if (!formview) return

    const result = await formview.commit(async done => {
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
    return result
  }

  const formInfo = computed(() => {
    const parentFormInfo = toRaw(props.parentFormInfo)
    return {
      parentFormInfo: toRaw(parentFormInfo),
      relationInfo: toRaw(props.relationInfo),
      record: toRaw(props.record),
      values: toRaw(state.values),
      editable: !props.readonly
    }
  })

  return { mVal: computed(() => state.mVal), formInfo, onChange, commit }
}
