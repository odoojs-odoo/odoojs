import { computed, reactive, toRaw, watch } from 'vue'
import api from '@/odoorpc'

// function sleep(millisecond) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, millisecond)
//   })
// }

export function useM2mForm(props) {
  const localState = { formview: null }

  const state = reactive({
    formviewReady: false
  })

  const sheet = computed(() => {
    return state.formviewReady
      ? localState.formview.view_sheet()
      : { children: {} }
  })

  // load relationInfo
  watch(
    () => props.relationInfo,
    // eslint-disable-next-line no-unused-vars
    (newVal, oldVal) => {
      // console.log(newVal, oldVal)

      if (newVal) {
        const rel = api.env.relation(newVal)
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
        return
      }
      if (!state.formviewReady) {
        if (!props.relationInfo) return
        const rel = api.env.relation(props.relationInfo)
        localState.formview = rel.form
        state.formviewReady = true
      }
    }
  )

  return {
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
