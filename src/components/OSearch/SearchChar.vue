<template>
  <span>
    <span v-if="title"> {{ title }}: </span>

    <a-select
      v-model:value="state.mVal"
      mode="tags"
      style="width: 200px; padding-right: 8px"
      :placeholder="placeholder"
      size="small"
      @change="handleChange"
    >
    </a-select>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue'
const props = defineProps(['value', 'title', 'placeholder'])
const emit = defineEmits(['change'])
const state = reactive({
  mVal: []
})

watch(
  () => props.value,
  // eslint-disable-next-line no-unused-vars
  (newVal, oldVal) => {
    state.mVal = (newVal || []).map(item => item.string)
  },
  { immediate: true }
)

function handleChange(value) {
  // console.log(value)
  emit('change', value)
}
</script>

<style type="text/css"></style>
