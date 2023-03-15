<template>
  <div>
    <!-- readonly: {{ [readonly, records, columns] }} -->

    <a-table
      :dataSource="records"
      :columns="columns"
      :customRow="tableCustomRow"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column._format">
          {{ column._format(record) }}
        </template>

        <template v-else>{{ record[column.dataIndex] }} </template>
      </template>
    </a-table>

    <template v-if="!readonly">
      <a-button size="small" @click="onCreate"> 新增行 </a-button>
    </template>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useO2mTree } from './o2mTreeApi'

const props = defineProps([
  'readonly',
  'records',
  'relationInfo',
  'parentFormInfo'
])
const emit = defineEmits(['row-click', 'row-new'])
// eslint-disable-next-line no-unused-vars

const { columns } = useO2mTree(props)

function tableCustomRow(record) {
  return {
    // eslint-disable-next-line no-unused-vars
    onClick: event => {
      // console.log('click row ', record)
      emit('row-click', record)
    }
  }
}

function onCreate() {
  emit('row-new')
}
</script>

<style type="text/css"></style>
