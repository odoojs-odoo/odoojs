<template>
  <span>
    <template v-if="fieldInfo.widget === 'image_url'">
      <!-- todo: {{ [fieldInfo.type, fieldInfo.widget, dVal] }} -->
      <WImageUrl
        :width="width"
        :field-name="fieldName"
        :field-info="fieldInfo"
        :form-info="formInfo"
      />
    </template>
    <template
      v-else-if="
        fieldInfo.widget &&
        !['email', 'phone', 'url'].includes(fieldInfo.widget)
      "
    >
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>

    <template v-else>
      <template v-if="readonly">
        {{ dVal }}
      </template>

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

const { mVal, dVal, readonly, onChange } = useField(props, { emit })
</script>

<style type="text/css"></style>
