<template>
  <span>
    <!-- {{ [readonly, treeRecords] }} -->

    <O2mTree
      :readonly="readonly"
      :records="treeRecords"
      :relation-info="relationInfo"
      :parent-form-info="formInfo"
      @row-click="onRowClick"
      @row-new="onOpenRowNew"
    />

    <!-- {{ modalVisible }}
    {{ currentRow }} -->

    <O2mForm
      v-model:visible="modalVisible"
      :readonly="readonly"
      :record="currentRow"
      :relation-info="relationInfo"
      :parent-form-info="formInfo"
      @row-commit="onRowCommit"
      @row-remove="onRowRemove"
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

const emit = defineEmits(['update:modelValue', 'change', 'load-relation'])

const useData = useFO2m(props, { emit })

const { readonly, relationInfo, treeRecords } = useData
const { rowPick, rowRemove, rowCommit } = useData

const modalVisible = ref(false)
const currentRow = ref({})

function onRowClick(record) {
  // console.log('onOpenRowView', record)
  // { ...record }
  currentRow.value = rowPick(record)

  modalVisible.value = true
}

async function onOpenRowNew() {
  // console.log('onOpenRowNew', record)
  currentRow.value = {}
  modalVisible.value = true
}

function onRowRemove(record) {
  const tree_value = rowRemove(record)
  console.log('rowRemove', tree_value)
  emit('change', tree_value)
}

function onRowCommit(record, value) {
  const tree_value = rowCommit(record, value)
  console.log('onRowCommit', tree_value)
  emit('change', tree_value)
}
</script>

<style type="text/css"></style>
