<template>
  <div class="actionZone">

    <!-- {{ columns }} -->
    <!-- {{ pagination }} -->

    <SearchView
      :search-items="searchItems"
      :search-values="searchValues"
      :actionId="props.actionId"
      @change="onSearchChange"
    />

    <div></div>
    <a-button
      class="createBtn"
      v-if="buttons.create"
      size="small"
      type="primary"
      @click="onClickNew"
    >
      {{ $t('act.create') }}
    </a-button>

    <a-tooltip class="expBtn">
      <template #title>{{ $t('act.exportAll') }}</template>
      <a-button size="small" @click="onExportAll">
        <template #icon>
          <download-outlined />
        </template>
      </a-button>
    </a-tooltip>

    <ActionButton
      class="actBtn"
      v-if="activeIds.length"
      :has-delete="buttons.delete"
      :has-active="hasActive"
      @button-click="onClickCRUD"
    />
  </div>

  <a-table
    row-key="id"
    :dataSource="records"
    :columns="columns"
    :pagination="pagination"
    :row-selection="{
      selectedRowKeys: activeIds,
      onChange: onSelectChange
    }"
    :customRow="tableCustomRow"
    @change="onTableChange"
    style="margin-top: 5px"
    :scroll="widthAndHeight"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column._format">
        {{ column._format(record) }}
      </template>

      <template v-else>{{ record[column.dataIndex] }} </template>
    </template>
  </a-table>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTreeView } from './treeApi'

import ActionButton from './ActionButton.vue'
import SearchView from '@/components/OSearch/SearchView.vue'
const router = useRouter()
const props = defineProps(['actionId'])
const emit = defineEmits(['search-change'])

const useData = useTreeView(props, { emit })

const { records, columns, pagination, buttons, hasActive } = useData

const { searchValues, searchItems, onSearchChange } = useData

const { onTableChange, activeIds, onSelectChange } = useData

const { onClickCRUD, onExportAll } = useData

const tableHeight = ref(0)
onMounted(() => {
  tableHeight.value = document.body.scrollHeight - 345
  window.onresize = () => {
    tableHeight.value = document.body.scrollHeight - 345
  }
})
function tableCustomRow(record) {
  const router = useRouter()
  return {
    // eslint-disable-next-line no-unused-vars
    onClick: event => {
      console.log('click row ', record)

      const rounteVal = router.currentRoute.value
      const { query, path } = rounteVal
      const { menu } = query

      const query2 = { menu, view_type: 'form', id: record.id }
      router.push({ path, query: query2 })
    }
  }
}

// 新增按钮触发
function onClickNew() {
  const rounteVal = router.currentRoute.value
  const { query, path } = rounteVal
  const { menu } = query
  const query2 = { menu, view_type: 'form' }
  router.push({ path, query: query2 })
}
//
const widthAndHeight = computed(() => {
  return { x: 1000, y: tableHeight.value }
})
</script>

<style type="text/css">
.ant-table-thead > tr > th {
  /* background: palegreen; */
  padding: 8px;
}
.ant-table-tbody > tr > td {
  /* background: palegreen; */
  padding: 5px;
}
.actionZone {
  /* background: green; */
  margin: 0px 0px 0px 0px;
  padding: 0px 5px 0px 5px;
  position: relative;
}
.createBtn {
  margin-left: 5px;
}

.expBtn {
  margin-left: 5px;
}
.actBtn{
  position: absolute;
  right: 5px;
}
</style>
