<template>
  <a-select
    v-model:value="mVal"
    label-in-value
    show-search
    :filter-option="filterOption"
    :options="selectOptions"
    :placeholder="placeholder"
    :style="compute_style"
    @change="handleChange"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
const props = defineProps(['modelValue', 'options', 'width', 'placeholder'])
const emit = defineEmits(['update:modelValue', 'change'])

const selectOptions = computed(() =>
  props.options.map(item => {
    return { value: item[0], label: item[1] }
  })
)

function filterOption(input, option) {
  return option.label.indexOf(input) >= 0
}

const compute_style = computed(() =>
  props.width ? `width: ${props.width}` : undefined
)

const mVal = computed({
  get() {
    return props.modelValue
      ? { value: props.modelValue[0], label: props.modelValue[1] }
      : { value: 0, label: '' }
  },
  set(val) {
    const { value, label } = val
    const label2 = label.trim()
    emit('update:modelValue', [value, label2])
  }
})

function handleChange(value) {
  const { key, label } = value
  const label2 = label.trim()
  emit('change', [key, label2])
}
</script>

<style scoped></style>
