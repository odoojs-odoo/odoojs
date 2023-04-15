<template>
  <div>
    <!-- readonly: {{ [readonly, records, columns] }} -->

    <TreeTable
      :dataSource="records"
      :columns="columns"
      :pagination="false"
      @row-click="onRowClick"
    />

    <template v-if="!readonly">
      <a-button size="small" @click="onCreate"> 新增行 </a-button>
    </template>
  </div>
</template>

<script setup>
import { useO2mTree } from './o2mTreeApi'

import TreeTable from '@/components/ONode/TreeTable.vue'

const props = defineProps([
  'readonly',
  'records',
  'relationInfo',
  'parentFormInfo'
])
const emit = defineEmits(['row-click', 'row-new'])

const { columns } = useO2mTree(props)

function onRowClick(record) {
  emit('row-click', record)
}

function onCreate() {
  emit('row-new')
}
</script>

<style type="text/css"></style>
