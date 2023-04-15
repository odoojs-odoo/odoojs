<template>
  <div>
    <a-table
      row-key="id"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="pagination"
      :row-selection="rowSelection"
      :customRow="tableCustomRow"
      :scroll="widthAndHeight"
      @change="onTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column._meta.tag">
          todo: {{ column._meta.tag }}
        </template>
        <template v-else>
          <OField
            :field-name="column.dataIndex"
            :field-info="column._meta"
            :form-info="{ record }"
          />
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import OField from '@/components/OField/OField.vue'

defineProps([
  'dataSource',
  'columns',
  'pagination',
  'rowSelection',
  'widthAndHeight'
])
const emit = defineEmits(['row-click', 'change'])

function tableCustomRow(record) {
  return {
    // eslint-disable-next-line no-unused-vars
    onClick: event => {
      // console.log('click row ', record)
      emit('row-click', record)
    }
  }
}

async function onTableChange(pagination) {
  emit('change', pagination)
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
</style>
