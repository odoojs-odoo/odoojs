<template>
  <div>
    <SearchView
      :search-items="searchItems"
      :search-values="searchValues"
      :actionId="props.actionId"
      @change="onSearchChange"
    />

    <CPTree
      :viewActions="viewActions"
      :activeIds="activeIds"
      :buttons="buttons"
      :hasActive="hasActive"
      @button-click="onClickCRUD"
    />
    <TreeTable
      style="margin-top: 5px"
      :dataSource="records"
      :columns="columns"
      :pagination="pagination"
      :row-selection="{
        selectedRowKeys: activeIds,
        onChange: onSelectChange
      }"
      :scroll="widthAndHeight"
      @change="onTableChange"
      @row-click="onRowClick"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'
import { useTreeView } from './treeApi'

import SearchView from '@/components/OSearch/SearchView.vue'
import CPTree from '@/components/ONode/CPTree.vue'
import TreeTable from '@/components/ONode/TreeTable.vue'

const router = useRouter()

const props = defineProps(['actionId'])
const emit = defineEmits(['search-change'])

const useData = useTreeView(props, { emit, router })
const { records, columns, pagination } = useData
const { viewActions, buttons, hasActive } = useData
const { searchValues, searchItems, onSearchChange } = useData
const { onTableChange, activeIds, onSelectChange } = useData
const { onClickCRUD, onRowClick } = useData

const tableHeight = ref(0)
onMounted(() => {
  tableHeight.value = document.body.scrollHeight - 345
  window.onresize = () => {
    tableHeight.value = document.body.scrollHeight - 345
  }
})

const widthAndHeight = computed(() => {
  return { x: 600, y: tableHeight.value }
})
</script>

<style type="text/css" scoped></style>
