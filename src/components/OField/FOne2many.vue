<template>
  <span>
    <!-- editable: {{ [formInfo.editable, recordsDisplay] }} -->
    <O2mTree
      :readonly="readonly"
      :records="recordsDisplay"
      :relation-info="relationInfo"
      :parent-view-info="formInfo.viewInfo"
      @row-click="onRowClick"
      @row-new="onRowCreate"
    />

    <O2mForm
      v-model:visible="modalVisible"
      :readonly="readonly"
      :record="currentRow"
      :relation-info="relationInfo"
      :parent-form-info="formInfo"
      @row-commit="onRowCommit"
    />
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useFO2m } from './FO2mApi'

import O2mTree from '@/components/OSubView/O2mTree.vue'
import O2mForm from '@/components/OSubView/O2mForm.vue'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])

const useData = useFO2m(props, { emit })

const {
  readonly,
  relationInfo,
  recordsDisplay,
  onRowClick,
  onRowCreate,
  onRowCommit
} = useData

const { modalVisible, currentRow } = useData
</script>

<style type="text/css"></style>
