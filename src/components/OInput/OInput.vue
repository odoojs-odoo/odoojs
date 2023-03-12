<template>
  <a-input
    v-model:value="mVal"
    :style="compute_style"
    :placeholder="tr(placeholder)"
    @change="onInputChange"
    @pressEnter="onInputEnter"
    @blur="onInputBlur"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed, reactive } from 'vue'
import { useL10n } from '@/components/tools/useL10n'
const { tr } = useL10n()

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

function handleChange(e) {
  emit('change', e.target.value)
}
</script>

<style scoped></style>
