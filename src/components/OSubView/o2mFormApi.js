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
        const record2 = view.get_values_merged(props.record, state.values, {
          record: props.parentFormInfo.record,
          values: props.parentFormInfo.values
        })

        const record = view.to_modifiers(record2)
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
      if (oldVal && !newVal) {
        // console.log('clear')
        state.formviewReady = false
        //       state.mVal = {}
        //       state.values = {}
        return
      }
      if (!state.formviewReady) {
        if (!props.relationInfo) return
        const rel = api.env.relation(props.relationInfo, {
          parent: props.parentFormInfo.viewInfo
        })
        localState.formview = rel.form
        state.formviewReady = true
      }
      if (props.record.id) {
        if (!props.readonly) {
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
      }

      // 新增
      else {
        // console.log('o2m form new ')
        const formview = localState.formview
        const dataInfo = await formview.onchange_new({
          record: toRaw(props.parentFormInfo.record),
          values: toRaw(props.parentFormInfo.values)
        })
        const { values } = dataInfo
        state.mVal = values
        state.values = values
      }
    },
    { immediate: true }
  )

  async function onChange(fname, value) {
    // console.log('onChange in o2m', fname, value)
    if (!state.formviewReady) return
    const validate = async (done, { formValues, values }) => {
      state.mVal = { ...state.mVal, ...formValues }
      state.values = { ...state.values, ...values }
      await sleep(100)
      ctx.editRef.value.validate().then(
        () => done(true),
        () => done(false)
      )
    }
    const formview = localState.formview
    const result = await formview.onchange(fname, { value, validate })
    // console.log('o2m handleChange ok', fname, value, result)
    const { values: values2 = {} } = result
    state.values = values2
    state.mVal = { ...state.mVal, ...values2 }
  }

  async function commit() {
    // console.log('commit subform')

    const validate = async done => {
      await sleep(100)
      ctx.editRef.value.validate().then(
        () => done(true),
        () => done(false)
      )
    }
    if (!state.formviewReady) return
    const formview = localState.formview

    // o2m form commit:
    // 1. 排队进队列, 等待其他的 onchange 完成
    // 2. 返回最新的 value 数据
    // 3. 判断是 create 还是 write
    // 4. 现在是 直接 返回tuple: [ 0/1, res_id, values]
    //
    // const result2 = await formview.commit({ validate })
    // console.log('old', result2)
    // return result
    // 修改为
    // 1. 排队进队列, 等待其他的 onchange 完成
    // 2. 直接返回 value 数据
    // 3. 页面里 判断 create 还是 write
    // 4. 最后 emit
    //
    const result = await formview.commit_for_o2m({ validate })

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
