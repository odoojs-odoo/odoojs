<template>
  <span>
    <!-- readonly: {{ readonly }} -->
    <TreeTable
      :dataSource="records"
      :columns="columns"
      :pagination="false"
      @row-click="onRowClick"
    />

    <template v-if="!readonly">
      <a-button size="small" @click="onCreate"> 添加 </a-button>
    </template>
  </span>
</template>

<script setup>
import { useM2mTree } from './m2mTreeApi'
import TreeTable from '@/components/ONode/TreeTable.vue'

const props = defineProps([
  'readonly',
  'records',
  'relationInfo',
  'parentFormInfo'
])

const emit = defineEmits(['row-click', 'row-new'])

const { columns } = useM2mTree(props)

function onRowClick(record) {
  emit('row-click', record)
}

function onCreate() {
  emit('row-new')
}
</script>

<style type="text/css"></style>
