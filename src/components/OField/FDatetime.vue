<template>
  <span>
    <template v-if="fieldInfo.widget === 'some widget'">
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
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

        <ODatePicker
          v-model="mVal"
          :width="width"
          :placeholder="fieldInfo.string"
          :show-time="fieldInfo.widget === 'date' ? true : false"
          @change="onChange"
        />
      </template>
    </template>
  </span>
</template>

<script setup>
import { useFDatetime } from './FDatetimeApi'
import ODatePicker from '@/components/OInput/ODatePicker.vue'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])
const widget_nodo = ['date', 'remaining_days']
const { mVal, dVal, readonly, onChange } = useFDatetime(props, { emit })
</script>

<style type="text/css"></style>
