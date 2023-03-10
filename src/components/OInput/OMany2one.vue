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
  >
    <template #dropdownRender="{ menuNode: menu }">
      <v-nodes :vnodes="menu" />
      <template v-if="options.length > 7">
        <a-divider style="margin: 4px 0" />
        <div
          style="padding: 4px 8px; cursor: pointer"
          @mousedown="e => e.preventDefault()"
          @click="searchMore"
        >
          <search-outlined />
          搜索更多
        </div>
      </template>
    </template>
  </a-select>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
// import { PlusOutlined } from '@ant-design/icons-vue'

// {/* <search-outlined /> */}

function VNodes(_, { attrs }) {
  return attrs.vnodes
}

const props = defineProps(['modelValue', 'options', 'width', 'placeholder'])
const emit = defineEmits(['update:modelValue', 'change', 'search-more'])

const selectOptions = computed(() =>
  props.options.slice(0, 7).map(item => {
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
  console.log('onchange m2o,', value)
  const { key, label } = value
  const label2 = label.trim()
  emit('change', [key, label2])
}

function searchMore() {
  emit('search-more')
}
</script>

<style scoped></style>
