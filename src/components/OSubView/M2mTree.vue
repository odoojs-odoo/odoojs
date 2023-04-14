<template>
  <span>
    <!-- readonly: {{ readonly }} -->

    <a-table
      :dataSource="records"
      :columns="columns"
      :customRow="tableCustomRow"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <OField
          :field-name="column.dataIndex"
          :field-info="column._meta"
          :form-info="{ record }"
        />
      </template>
    </a-table>

    <template v-if="!readonly">
      <a-button size="small" @click="onCreate"> 添加 </a-button>
    </template>
  </span>
</template>

<script setup>
import { useM2mTree } from './m2mTreeApi'
import OField from '@/components/OField/OField.vue'

const props = defineProps([
  'readonly',
  'records',
  'relationInfo',
  'parentFormInfo'
])

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
