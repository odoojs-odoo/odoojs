<template>
  <span>
    <template v-if="fieldInfo.widget === 'some widget'">
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>

    <template v-else-if="fieldInfo.widget === 'boolean_toggle'">
      <template v-if="readonly">
        <a-form-item-rest>
          <a-checkbox :checked="dVal" disabled
        /></a-form-item-rest>
      </template>

      <template v-else>
        <a-checkbox v-model:checked="mVal" @change="onCheckChange" />
      </template>
    </template>

    <template v-else-if="fieldInfo.widget === 'web_ribbon'">
      <template v-if="readonly">
        <a-form-item-rest>
          <a-checkbox :checked="dVal" disabled
        /></a-form-item-rest>
      </template>

      <template v-else>
        <a-checkbox v-model:checked="mVal" @change="onCheckChange" />
      </template>
    </template>

    <template
      v-else-if="fieldInfo.widget && !widget_nodo.includes(fieldInfo.widget)"
    >
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>

    <template v-else>
      <template v-if="readonly">
        <a-form-item-rest>
          <a-checkbox :checked="dVal" disabled
        /></a-form-item-rest>
      </template>

      <template v-else>
        <a-checkbox v-model:checked="mVal" @change="onCheckChange" />
      </template>
    </template>
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

const { mVal, dVal, readonly, onChange } = useField(props, { emit })
const widget_nodo = []

function onCheckChange(e) {
  const value = e.target.checked
  onChange(value)
}
</script>

<style type="text/css"></style>
