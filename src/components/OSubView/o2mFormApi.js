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
      if (typeof fieldInfo.required !== 'function') {
        return fieldInfo.required
      }

      if (state.formviewReady && localState.formview) {
        const records_merged = localState.formview._get_values_for_modifiers(
          state.record,
          state.values
        )

        return fieldInfo.required({ record: records_merged })
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
      //  else {
      //       // console.log('o2m form new ')
      //       const formview = localState.formview
      //       const dataInfo = await formview.onchange_new({
      //         record: props.parentFormInfo.record,
      //         values: props.parentFormInfo.values
      //       })
      //       const { values } = dataInfo
      //       state.mVal = values
      //       state.values = values
      //     }
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

  // async function onRemove() {
  //   // console.log('onRemove', props.record)
  //   const value = [2, props.record.id, false]
  //   ctx.emit('row-commit', value)
  //   visible2.value = false
  // }

  async function commit() {
    console.log('commit subform')

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

    return result
  }

  // const fields = computed(() => {
  //   return state.formviewReady ? localState.formview.fields : {}
  // })

  return {
    sheet,
    formInfo: computed(() => {
      return {
        relationInfo: toRaw(props.relationInfo),
        record: toRaw(props.record),
        values: state.values,
        editable: !props.readonly
      }
    }),

    mVal: computed(() => state.mVal),
    getRules,
    onChange,
    commit

    // fields: fields,

    //

    //
  }
}
