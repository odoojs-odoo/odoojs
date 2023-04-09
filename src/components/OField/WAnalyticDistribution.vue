<template>
  <span>
    <template v-if="readonly || !readonly">
      {{ dVal }}
    </template>

    <template v-else> edit: {{ [fieldName, mVal, dVal] }} </template>
  </span>
</template>

<script setup>
import { useField } from './FieldApi'
const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])

const { mVal, dVal, readonly } = useField(props, { emit })
</script>

<style type="text/css"></style>
