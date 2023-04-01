<template>
  <span>
    <template v-if="readonly || !readonly">
      <div>------------------</div>
      <div v-for="(item, index) in subtotal" :key="index">
        <div>{{ item.name }}: {{ formatted_amount_untaxed }}</div>

        <div v-for="(it, k) in item.children" :key="k">
          {{ it.tax_group_name }}: {{ it.formatted_tax_group_amount }}
        </div>
      </div>

      <div>------------------</div>
      <div>含税合计: {{ formatted_amount_total }}</div>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed, toRaw } from 'vue'
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

const formatted_amount_untaxed = computed(() => {
  const recordMerged = { ...props.formInfo.record, ...props.formInfo.values }
  const val = toRaw(recordMerged[props.fieldName]) || {}
  return val.formatted_amount_untaxed
})

const formatted_amount_total = computed(() => {
  const recordMerged = { ...props.formInfo.record, ...props.formInfo.values }
  const val = toRaw(recordMerged[props.fieldName]) || {}
  return val.formatted_amount_total
})

const subtotal = computed(() => {
  const recordMerged = { ...props.formInfo.record, ...props.formInfo.values }
  const val = toRaw(recordMerged[props.fieldName]) || {}
  const sub1 = val.groups_by_subtotal || {}
  const keys = Object.keys(sub1)
  if (!keys.length) {
    return []
  }

  const sub2 = keys.map(item => {
    return { name: item, children: sub1[item] }
  })

  return sub2
})
</script>

<style type="text/css"></style>
