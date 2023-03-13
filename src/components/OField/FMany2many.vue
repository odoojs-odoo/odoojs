<template>
  <span>
    <!-- {{ readonly }}  -->

    <M2mTree
      :readonly="readonly"
      :records="recordsDisplay"
      :relation-info="relationInfo"
      :parent-view-info="formInfo.viewInfo"
      @row-click="onRowClick"
      @row-new="onRowCreate"
    />

    <!-- {{ [modalVisible, currentRow] }} -->
    <!-- @row-commit="onRowCommit" -->
    <M2mForm
      v-model:visible="modalVisible"
      :readonly="readonly"
      :record="currentRow"
      :relation-info="relationInfo"
      :relation-sheet="relationSheet"
      :parent-form-info="formInfo"
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

import { defineProps, defineEmits } from 'vue'

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

const { readonly, relationInfo, relationSheet, recordsDisplay } = useData
const { onRowClick, onRowCreate } = useData

const { modalVisible, currentRow } = useData

//
//
</script>

<style type="text/css" scoped></style>
