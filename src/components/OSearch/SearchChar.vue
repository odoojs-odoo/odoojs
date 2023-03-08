<!--
 * @Author: Nxf
 * @Date: 2023-02-11 22:39:08
 * @LastEditors: Nxf
 * @LastEditTime: 2023-02-12 11:31:40
 * @Descripttion: 
-->
<template>
  <span>
    <span> {{ title }}: </span>

    <a-select
      v-model:value="state.mVal"
      mode="tags"
      style="width: 200px;padding-right: 8px;"
      :placeholder="placeholder"
      size="small"
      @change="handleChange"
    >
    </a-select>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue'
const props = defineProps(['modelValue', 'title', 'placeholder'])
const emit = defineEmits(['change'])
const state = reactive({
  mVal: []
})

watch(
  () => props.modelValue,
  // eslint-disable-next-line no-unused-vars
  (newVal, oldVal) => {
    state.mVal = newVal
  }
)

function handleChange(value) {
  console.log(value)
  emit('change', value)
}
</script>

<style type="text/css"></style>
