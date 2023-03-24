<template>
  <div>
    <!-- <div class="actionZone"> -->

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
      v-if="buttons.create"
      size="small"
      type="primary"
      @click="onClickNew"
    >
      {{ $t('act.create') }}
    </a-button>

    <a-tooltip class="expBtn">
      <template #title>导出全部</template>
      <a-button size="small" @click="onExportAll">
        <template #icon>
          <download-outlined />
        </template>
      </a-button>
    </a-tooltip>
  </div>

  <a-table
    :dataSource="records"
    :columns="columns"
    :pagination="pagination"
    :customRow="tableCustomRow"
    @change="onTableChange"
    style="margin-top: 5px"
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
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useTreeView } from './treeApi'

import SearchView from '@/components/OSearch/SearchView.vue'
const router = useRouter()
const props = defineProps(['actionId'])
const emit = defineEmits(['search-change'])

const {
  records,
  columns,
  buttons,
  pagination,
  searchValues,
  searchItems,
  onTableChange,
  onSearchChange,
  onExportAll
} = useTreeView(props, { emit })

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
  background: green;
  margin: 5px 0px;
  padding: 5px;
  position: relative;
}
.createBtn {
  position: absolute;
  right: 10px;
  bottom: 5px;
}

.expBtn {
  position: absolute;
  right: 5px;
}
</style>
