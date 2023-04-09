<template>
  <a-select
    v-model:value="mVal"
    allowClear
    label-in-value
    :default-active-first-option="false"
    show-search
    :filter-option="false"
    :show-arrow="false"
    :options="selectOptions"
    :placeholder="placeholder"
    :style="compute_style"
    @search="handleSearch"
    @dropdownVisibleChange="dropdownVisibleChange"
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
import { computed } from 'vue'

function VNodes(_, { attrs }) {
  return attrs.vnodes
}

const props = defineProps(['modelValue', 'options', 'width', 'placeholder'])
const emit = defineEmits([
  'update:modelValue',
  'dropdown-visible-change',
  'search',
  'change',
  'search-more'
])

const selectOptions = computed(() =>
  props.options.slice(0, 7).map(item => {
    return { value: item[0], label: item[1] }
  })
)

const compute_style = computed(() =>
  props.width ? `width: ${props.width}` : undefined
)

const mVal = computed({
  get() {
    return props.modelValue
      ? { value: props.modelValue[0], label: props.modelValue[1] }
      : undefined
    // { value: undefined, label: undefined }
  },
  set(val) {
    if (val) {
      const { value, label } = val
      const label2 = label.trim()
      emit('update:modelValue', [value, label2])
    } else {
      emit('update:modelValue', false)
    }
  }
})

async function handleSearch(val) {
  emit('search', val)
}

function dropdownVisibleChange(open) {
  if (open) {
    emit('dropdown-visible-change', open)
  }
}

function handleChange(value) {
  if (value) {
    const { key, label } = value
    const label2 = label.trim()
    emit('change', [key, label2])
  } else {
    emit('change', false)
  }
}

function searchMore() {
  emit('search-more')
}
</script>

<style scoped></style>
