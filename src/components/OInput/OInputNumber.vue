<template>
  <a-input-number
    v-model:value="mVal"
    :style="compute_style"
    :placeholder="placeholder"
    @change="onInputChange"
    @pressEnter="onInputEnter"
    @blur="onInputBlur"
  />
</template>

<script setup>
import { computed, reactive } from 'vue'
const props = defineProps(['modelValue', 'width', 'placeholder'])
const emit = defineEmits(['update:modelValue', 'change'])

const state = reactive({ changed: false, value_changed: undefined })

const compute_style = computed(() =>
  props.width ? `width: ${props.width}` : undefined
)

const mVal = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

function onInputChange(value) {
  state.value_changed = value
  state.changed = true
}

function onInputEnter(event) {
  _onInputEnterAndBlur(event)
}
function onInputBlur(event) {
  _onInputEnterAndBlur(event)
}

// eslint-disable-next-line no-unused-vars
function _onInputEnterAndBlur(event) {
  if (state.changed) {
    state.changed = false
    handleChange(state.value_changed)
  }
}

function handleChange(value) {
  emit('change', value)
}
</script>

<style scoped></style>
