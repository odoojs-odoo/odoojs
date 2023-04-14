import { computed } from 'vue'

export function useTag(props, ctx) {
  const { emit } = ctx || {}
  const model2 = computed({
    get() {
      return props.model
    },

    // eslint-disable-next-line no-unused-vars
    set(val) {
      // state.mVal = {...}
    }
  })

  async function onChange(fname, ...args) {
    emit('change', fname, ...args)
  }

  async function onLoadReation(fieldName, relation_info) {
    emit('load-relation', fieldName, relation_info)
  }

  return { model2, onChange, onLoadReation }
}
