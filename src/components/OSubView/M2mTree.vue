<template>
  <span>
    <!-- readonly: {{ readonly }} -->

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
      <a-button size="small" @click="onCreate"> 添加 </a-button>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

import { useM2mTree } from './m2mTreeApi'

const props = defineProps(['readonly', 'records', 'relationInfo'])

const emit = defineEmits(['row-click', 'row-new'])

const { columns } = useM2mTree(props)

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
