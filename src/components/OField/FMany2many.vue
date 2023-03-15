<template>
  <span>
    <M2mTree
      :readonly="readonly"
      :records="treeRecords"
      :relation-info="relationInfo"
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
    <a-form-item-rest>
      <M2mNew
        v-model:visible="newModalVisible"
        :records="treeOptionRecords"
        :relation-info="relationInfo"
        :parent-form-info="formInfo"
        @row-select="onRowSelect"
      />
    </a-form-item-rest>
  </span>
</template>

<script setup>
import M2mTree from '@/components/OSubView/M2mTree.vue'
import M2mForm from '@/components/OSubView/M2mForm.vue'
import M2mNew from '@/components/OSubView/M2mNew.vue'
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

const { readonly, relationInfo, treeRecords, treeOptionRecords } = useData

const { removeRow, openRowSelect, selectRow } = useData

const modalVisible = ref(false)
const newModalVisible = ref(false)
const currentRow = ref({})

function onRowClick(record) {
  // console.log('click row ', record)
  currentRow.value = { ...record }
  modalVisible.value = true
}

async function onRowCreate() {
  // console.log('onRowCreate ')

  openRowSelect()

  newModalVisible.value = true
}

async function onRowRemove() {
  // console.log('onRowRemove ')
  removeRow(currentRow.value)
}

async function onRowSelect(rows) {
  // console.log('onRowSelect ')
  selectRow(rows)
}
</script>

<style type="text/css" scoped></style>
