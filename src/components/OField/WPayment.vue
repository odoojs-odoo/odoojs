<template>
  <span>
    <template v-if="readonly || !readonly">
      <!-- {{ dVal }} -->

      <div v-for="(item, index) in (dVal || {}).content || []" :key="index">
        <!-- {{ item }} -->

        <a-tooltip color="#2db7f5" placement="left">
          <template #title>
            <a-descriptions :column="1" title="收付款信息">
              <a-descriptions-item label="金额">
                {{ item.amount_company_currency }}
              </a-descriptions-item>
              <a-descriptions-item label="收付单号">
                {{ item.ref }}
              </a-descriptions-item>
              <a-descriptions-item label="日期">
                {{ item.date }}
              </a-descriptions-item>
              <a-descriptions-item label="收付方式">
                {{ `${item.journal_name}(${item.payment_method_name})` }}
              </a-descriptions-item>
            </a-descriptions>
          </template>
          <info-circle-outlined />
        </a-tooltip>

        {{ `支付于 ${item.date} ${item.amount_company_currency}` }}
      </div>
    </template>

    <!-- <template v-else> edit: {{ [fieldName, mVal, dVal] }} </template> -->
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
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
</script>

<style type="text/css"></style>
