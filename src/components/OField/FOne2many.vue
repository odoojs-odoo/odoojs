<template>
  <span>
    <!-- {{ [readonly, relationInfo] }} -->

    <O2mTree
      :readonly="readonly"
      :records="treeRecords"
      :relation-info="relationInfo"
      :parent-form-info="formInfo"
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
import { defineProps, defineEmits, ref } from 'vue'
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

const { readonly, relationInfo, treeRecords, onRowCommit } = useData

// const { modalVisible, currentRow } = useData

const modalVisible = ref(false)
// const newModalVisible = ref(false)
const currentRow = ref({})

function onRowClick(record) {
  // console.log('click row ', record)
  currentRow.value = { ...record }
  modalVisible.value = true
}

async function onRowCreate() {
  console.log('onRowCreate ')

  // openRowSelect()

  // newModalVisible.value = true
}
</script>

<style type="text/css"></style>
