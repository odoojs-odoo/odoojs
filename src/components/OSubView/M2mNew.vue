<template>
  <span>
    <a-modal v-model:visible="visible2" :title="modalTitle" width="600px">
      <a-table
        row-key="id"
        :data-source="records"
        :columns="columns"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
      >
      </a-table>

      <template #footer>
        <a-space>
          <a-button size="small" key="commit" @click="onSelect">
            选择
          </a-button>

          <a-button size="small" key="back" @click="visible2 = false">
            取消
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, toRaw } from 'vue'
import { useM2mNew } from './m2mNewApi'

const props = defineProps([
  'visible',
  'readonly',
  'records',
  'relationInfo',
  'parentFormInfo'
])

const emit = defineEmits(['update:visible', 'row-select'])
const modalTitle = computed(() => '选择')

const visible2 = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

const selectedRowKeys = ref([])

const onSelectChange = keys => {
  // console.log('selectedRowKeys changed: ', keys)
  selectedRowKeys.value = keys
}

const useData = useM2mNew(props, { emit })
const { columns } = useData

function onSelect() {
  // console.log('onSelect')

  const ids = selectedRowKeys.value

  const vals = ids.map(item => {
    return toRaw(props.records.find(one => one.id === item))
  })

  emit('row-select', vals)
  visible2.value = false
}
</script>

<style type="text/css"></style>
