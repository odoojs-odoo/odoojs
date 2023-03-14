<template>
  <span>
    <M2mTree
      :readonly="readonly"
      :records="recordsDisplay"
      :relation-info="relationInfo"
      :parent-view-info="formInfo.viewInfo"
      @row-click="onRowClick"
      @row-new="onRowCreate"
    />

    <M2mForm
      v-model:visible="modalVisible"
      :readonly="readonly"
      :record="currentRow"
      :relation-info="relationInfo"
      :parent-form-info="formInfo"
      @row-remove="onRowRemove"
    />

    <!-- 
   
      <M2mNew
        ref="subNew"
        :relationInfo="relationInfo"
        :parentViewInfo="parentViewInfo"
        @on-commit="handleOnCommit"
      /> -->
  </span>
</template>

<script setup>
import M2mTree from '@/components/OSubView/M2mTree.vue'
import M2mForm from '@/components/OSubView/M2mForm.vue'

import { defineProps, defineEmits, ref } from 'vue'

import { useFM2m } from './FM2mApi'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])

const useData = useFM2m(props, { emit })

const { readonly, relationInfo, recordsDisplay } = useData
const { removeRow } = useData

const modalVisible = ref(false)
const currentRow = ref({})

function onRowClick(record) {
  console.log('click row ', record)
  currentRow.value = { ...record }
  modalVisible.value = true
}

async function onRowRemove() {
  console.log('onRowRemove ')
  removeRow(currentRow.value)
}

async function onRowCreate() {
  console.log('onRowCreate ')
}
</script>

<style type="text/css" scoped></style>
