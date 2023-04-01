<template>
  <span>
    <template v-if="fieldInfo.widget === 'some thing'">
      <!-- todo: {{ [fieldInfo.type, fieldInfo.widget, dVal] }} -->
    </template>

    <template v-else-if="fieldInfo.widget === 'analytic_distribution'">
      <WAnalyticDistribution
        :width="width"
        :field-name="fieldName"
        :field-info="fieldInfo"
        :form-info="formInfo"
      />
    </template>

    <template
      v-else-if="fieldInfo.widget && !widget_nodo.includes(fieldInfo.widget)"
    >
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>

    <template v-else>
      <template v-if="readonly"> {{ dVal }} </template>

      <template v-else> {{ dVal }} </template>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useField } from './FieldApi'

import WAnalyticDistribution from './WAnalyticDistribution.vue'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])
const widget_nodo = []
const { mVal, dVal, readonly, onChange } = useField(props, { emit })
</script>

<style type="text/css"></style>
