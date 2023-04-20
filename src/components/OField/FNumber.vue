<template>
  <span>
    <template v-if="fieldInfo.widget === 'sometiong'">
      todo: {{ [fieldInfo.type, fieldInfo.widget, dVal] }}
    </template>

    <template
      v-else-if="fieldInfo.widget && !widget_nodo.includes(fieldInfo.widget)"
    >
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>

    <template v-else>
      <template v-if="readonly"> {{ dVal }} </template>

      <template v-else>
        <!-- edit: {{ [fieldName, mVal, dVal, onChange] }} -->
        <OInputNumber
          v-model="mVal"
          :width="width"
          :placeholder="fieldInfo.string"
          @change="onChange"
        />
      </template>
    </template>
  </span>
</template>

<script setup>
import { useFNumber } from './FNumberApi'

import OInputNumber from '@/components/OInput/OInputNumber.vue'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])

const widget_nodo = [
  'monetary',
  'statinfo',
  'color_picker',
  'handle',
  'forecast_widget'
]

const { mVal, dVal, readonly, onChange } = useFNumber(props, { emit })
</script>

<style type="text/css"></style>
