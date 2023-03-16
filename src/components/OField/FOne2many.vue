<template>
  <span>
    <!-- {{ [readonly, relationInfo] }} -->

    <O2mTree
      :readonly="readonly"
      :records="treeRecords"
      :relation-info="relationInfo"
      :parent-form-info="formInfo"
      @row-click="onRowClick"
      @row-new="onOpenRowNew"
    />

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
const { rowRemove, rowCommit } = useData
const { openO2mNew } = useData

const modalVisible = ref(false)
// const newModalVisible = ref(false)
const currentRow = ref({})

function onRowClick(record) {
  // console.log('onOpenRowView', record)
  currentRow.value = { ...record }
  modalVisible.value = true
}

async function onOpenRowNew() {
  // console.log('onOpenRowNew', record)
  currentRow.value = await openO2mNew()
  modalVisible.value = true
}

function onRowRemove(record) {
  const values_onchange = rowRemove(record)
  emit('change', values_onchange)
}

function onRowCommit(record, value) {
  const values_onchange = rowCommit(record, value)
  emit('change', values_onchange)
}
</script>

<style type="text/css"></style>
