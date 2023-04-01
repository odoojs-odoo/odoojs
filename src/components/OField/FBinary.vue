<template>
  <span>
    <template v-if="fieldInfo.widget === 'image'">
      <!-- todo widget === image -->
      <WImage
        :width="width"
        :field-name="fieldName"
        :field-info="fieldInfo"
        :form-info="formInfo"
      />
    </template>

    <template v-else-if="fieldInfo.widget === 'account-tax-totals-field'">
      <!-- todo2s: {{ [fieldInfo.type, fieldInfo.widget] }} -->
      <WAccountTaxTotalsField
        :width="width"
        :field-name="fieldName"
        :field-info="fieldInfo"
        :form-info="formInfo"
      />
    </template>

    <template v-else-if="fieldInfo.widget === 'payment'">
      <!-- todo2qs: {{ [fieldInfo.type, fieldInfo.widget] }} -->
      <WPayment
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
      <template v-if="readonly"> // todo </template>

      <template v-else> // todo</template>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useField } from './FieldApi'

import WImage from './WImage.vue'
import WAccountTaxTotalsField from './WAccountTaxTotalsField.vue'
import WPayment from './WPayment.vue'

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
