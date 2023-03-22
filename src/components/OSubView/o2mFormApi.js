import { computed, reactive, watch, toRaw } from 'vue'

import api from '@/odoorpc'
import { useL10n } from '@/components/tools/useL10n'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export function useO2mForm(props, ctx) {
  const { tr } = useL10n()

  const localState = { formview: null }

  const state = reactive({
    formviewReady: false,
    mVal: {},
    values: {}
  })

  const sheet = computed(() => {
    return state.formviewReady
      ? localState.formview.view_sheet()
      : { children: {} }
  })

  function getRules(fieldInfo) {
    if (props.readonly) return undefined
    if (!fieldInfo.required) return undefined

    function required_get() {
      if (state.formviewReady && localState.formview) {
        // console.log(record2)
      }

      if (typeof fieldInfo.required !== 'function') {
        return fieldInfo.required
      }

      if (state.formviewReady && localState.formview) {
        const view = localState.formview
        const record = view.merge_to_modifiers(props.record, state.values, {
          record: props.parentFormInfo.record,
          values: props.parentFormInfo.values
        })
        return fieldInfo.required({ record })
      }

      return false
    }

    const required = required_get()

    if (!required) return undefined
    return [{ required: true, message: `请输入${tr(fieldInfo.string)}!` }]
  }

  // load relationInfo
  watch(
    () => props.relationInfo,
    // eslint-disable-next-line no-unused-vars
    (newVal, oldVal) => {
      // console.log(newVal, oldVal)

      if (newVal) {
        const rel = api.env.relation(newVal, {
          parent: props.parentFormInfo.viewInfo
        })
        localState.formview = rel.form
        state.formviewReady = true
      }
    },
    { immediate: true }
  )

  // load visible
  watch(
    () => props.visible,
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      // console.log(newVal, oldVal)

      // o2mform 关闭. 复原数据. 下次打开时, 确保是显示新的数据
      if (oldVal && !newVal) {
        // console.log('clear')
        state.formviewReady = false
        state.mVal = {}
        state.values = {}
        return
      }

      // o2mform 关闭.
      if (!newVal) {
        return
      }

      // o2mform 打开 , 检查 formview
      if (!state.formviewReady) {
        if (!props.relationInfo) return
        const rel = api.env.relation(props.relationInfo, {
          parent: props.parentFormInfo.viewInfo
        })
        localState.formview = rel.form
        state.formviewReady = true
      }

      // o2mform 打开 , 只读
      if (props.readonly) {
        return
      }

      // o2mform 打开 , 编辑
      if (props.record.id) {
        // edit
        const formview = localState.formview
        const values = formview.set_editable(props.record, {
          record: props.parentFormInfo.record,
          values: props.parentFormInfo.values
        })
        // console.log('values', values)
        state.values = {}
        state.mVal = { ...values }
      }

      // o2mform 打开 , 新增
      else {
        // console.log('o2m form new ')
        const formview = localState.formview
        const dataInfo = await formview.onchange_new({
          record: toRaw(props.parentFormInfo.record),
          values: toRaw(props.parentFormInfo.values)
        })
        const { values } = dataInfo

        // console.log('o2m form new, ok ', values)

        state.mVal = values
        state.values = values
      }
    },
    { immediate: true }
  )

  function formview_get() {
    // 页面  relation load 之后, 更新 主表的 formview
    // 主表 formview info 重新加载, 并通过参数 更新到 o2mform
    // 此函数, 更新 x2mform 的信息
    if (!state.formviewReady) return
    const formview = localState.formview

    formview.update_info(toRaw(props.relationInfo), {
      parent: toRaw(props.parentFormInfo.viewInfo)
    })

    return formview
  }

  async function onChange(fname, value) {
    const formview = formview_get()
    if (!formview) return

    const result = await formview.onchange(fname, value)
    // console.log('o2m handleChange ok', fname, value, result)
    const { values: values2 = {} } = result
    state.values = values2
    state.mVal = { ...state.mVal, ...values2 }
    // onchange 使用 form 自身的校验, 仅仅校验刚刚编辑的字段
    // 无需全部校验
    // 在提交时, 应做一次校验
    // ctx.editRef.value.validate()
  }

  async function commit() {
    // console.log('commit subform')
    const formview = formview_get()
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

  // const fields = computed(() => {
  //   return state.formviewReady ? localState.formview.fields : {}
  // })

  return {
    sheet,
    formInfo: computed(() => {
      // console.log('o2m, props:', toRaw(props), toRaw(localState.formview))
      const parentFormInfo = toRaw(props.parentFormInfo)
      return {
        parentData: {
          record: parentFormInfo.record,
          values: parentFormInfo.values
        },
        relationInfo: {
          relation: toRaw(props.relationInfo),
          parent: parentFormInfo.viewInfo
        },
        record: toRaw(props.record),
        values: toRaw(state.values),
        editable: !props.readonly
      }
    }),

    mVal: computed(() => state.mVal),
    getRules,
    onChange,
    commit
  }
}
