<template>
  <span>
    <template v-if="fieldInfo.widget === 'image_url'">
      <WImageUrl
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
      <template v-if="fieldInfo.type === 'text'">
        <span v-html="full_text(dVal)"> </span>
      </template>

      <template v-else-if="fieldInfo.secret"> {{ 'xxxxxxxxxx' }} </template>

      <template v-else-if="readonly"> {{ dVal }} </template>

      <template v-else>
        <OInput
          v-model="mVal"
          :width="width"
          :placeholder="fieldInfo.placeholder || fieldInfo.string"
          @change="onChange"
        />
      </template>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useField } from './FieldApi'
import WImageUrl from './WImageUrl.vue'
import OInput from '@/components/OInput/OInput.vue'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])
const widget_nodo = [
  'email',
  'phone',
  'url',
  'section_and_note_text',
  'open_move_widget',
  'text'
]
const { mVal, dVal, readonly, onChange } = useField(props, { emit })

function full_text(txt) {
  if (!txt) return txt
  return txt.replace(/\n/g, '<br/>')
}
</script>

<style type="text/css"></style>
