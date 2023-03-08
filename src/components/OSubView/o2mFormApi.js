import { computed, reactive, watch, ref } from 'vue'
import api from '@/odoorpc'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export function useO2mForm(props, ctx) {
  const visible2 = computed({
    get() {
      return props.visible
    },
    set(val) {
      ctx.emit('update:visible', val)
    }
  })

  const localState = { formview: null }

  const state = reactive({
    formviewReady: false,
    mVal: {},
    values: {}
  })

  const fields = computed(() => {
    return state.formviewReady ? localState.formview.fields : {}
  })

  const viewInfo = computed(() => {
    return state.formviewReady ? localState.formview.viewInfo : {}
  })

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

  watch(
    () => props.visible,
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      // console.log(newVal, oldVal)

      if (oldVal && !newVal) {
        // console.log('clear')
        state.formviewReady = false
        state.mVal = {}
        state.values = {}
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
          state.values = {}
          state.mVal = { ...values }
        }
      } else {
        // console.log('o2m form new ')
        const formview = localState.formview
        const dataInfo = await formview.onchange_new({
          record: props.parentFormInfo.record,
          values: props.parentFormInfo.values
        })

        const { values } = dataInfo
        state.mVal = values
        state.values = values
      }
    },
    { immediate: true }
  )

  function checkInvisible(fieldInfo) {
    return typeof fieldInfo.invisible === 'function'
      ? fieldInfo.invisible({
          record: { ...props.record, ...state.values }
        })
      : fieldInfo.invisible
  }

  function getRules(fieldInfo) {
    if (!fieldInfo.required) return undefined
    const required =
      typeof fieldInfo.required === 'function'
        ? fieldInfo.required({ record: { ...props.record, ...state.values } })
        : fieldInfo.required

    if (!required) return undefined
    return [{ required: true, message: `请输入${fieldInfo.string}!` }]
  }

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

  function onRollback() {
    visible2.value = false
  }

  async function onRemove() {
    // console.log('onRemove', props.record)
    const value = [2, props.record.id, false]
    ctx.emit('row-commit', value)
    visible2.value = false
  }

  async function onCommit() {
    console.log('onCommit subform')

    const validate = async done => {
      await sleep(100)
      ctx.editRef.value.validate().then(
        () => done(true),
        () => done(false)
      )
    }
    if (!state.formviewReady) return
    const formview = localState.formview

    const result = await formview.commit({ validate })
    // console.log('onCommit form ', result)

    if (result) {
      ctx.emit('row-commit', result)
      visible2.value = false
    }
  }

  return {
    visible2,
    mVal: computed(() => state.mVal),
    fields: fields,
    formInfo: computed(() => {
      return {
        formType: 'o2mForm',
        viewInfo: viewInfo.value,
        record: props.record,
        values: state.values,
        editable: !props.readonly
      }
    }),
    checkInvisible,
    getRules,
    onChange,
    onRemove,
    onRollback,
    onCommit
  }
}
