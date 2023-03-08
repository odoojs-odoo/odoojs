<!--
 * @Author: Nxf
 * @Date: 2023-02-12 14:50:37
 * @LastEditors: Nxf
 * @LastEditTime: 2023-02-15 20:11:23
 * @Descripttion: 
-->
<template>
  <span>
    <template v-if="readonly">
      <!-- {{ dVal }} -->
      <template v-for="tag in dVal" :key="tag[0]">
        <a-tag>{{ tag[1] }}</a-tag>
      </template>
    </template>

    <template v-else>
      <!-- edit: {{ [fieldName, mVal, dVal, options] }} -->
      <a-select
        mode="multiple"
        v-model:value="mVal"
        label-in-value
        :options="selectOptions"
        :style="compute_style"
        placeholder="请选择"
        @change="onSelectChange"
      />
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useFM2mTags } from './FM2mTagsApi'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])

const { mVal, dVal, readonly, options } = useFM2mTags(props, { emit })

const compute_style = computed(() =>
  props.width ? `width: ${props.width}` : undefined
)

const selectOptions = computed(() =>
  options.value.map(item => {
    return { value: item[0], label: item[1] }
  })
)

async function onSelectChange(value) {
  const value2 = value.map(item => item.value)
  console.log(value, value2)
  emit('change', [[6, false, value2]])
}
</script>

<style type="text/css"></style>
