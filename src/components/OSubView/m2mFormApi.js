import { computed, reactive, toRaw, watch } from 'vue'
import api from '@/odoorpc'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export function useM2mForm(props, ctx) {
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
    formviewReady: false
    // mVal: {},
    // values: {}
  })

  const sheet = computed(() => {
    return state.formviewReady
      ? localState.formview.view_sheet()
      : { children: {} }
  })

  //   const viewInfo = computed(() => {
  //     console.log(localState.formview)
  //     return state.formviewReady ? localState.formview.viewInfo : {}
  //   })

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
    }
  )

  return {
    visible2,
    sheet,
    formInfo: computed(() => {
      return {
        relationInfo: toRaw(props.relationInfo),
        record: toRaw(props.record),
        values: {},
        editable: false
      }
    })
  }
}
