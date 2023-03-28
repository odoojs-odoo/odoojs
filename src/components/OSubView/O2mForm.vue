<template>
  <span>
    <a-modal v-model:visible="visible2" :title="modalTitle" width="600px">
      <!-- @load-relation="onLoadReation" -->
      <FormSheet
        ref="editRef"
        :model="mVal"
        :formInfo="formInfo"
        style="background-color: white; margin-top: 5px; padding: 5px"
        @change="onChange"
      />

      <template #footer>
        <a-space v-if="readonly">
          <a-button size="small" @click="visible2 = false"> 关闭 </a-button>
        </a-space>

        <a-space v-else>
          <a-button size="small" @click="onCommit"> 保存 </a-button>
          <a-button size="small" @click="onRollback"> 丢弃 </a-button>
          <a-button v-if="record.id" size="small" @click="onRemove">
            移出
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import { useO2mForm } from './o2mFormApi'
import FormSheet from '@/components/OView/FormSheet.vue'

const props = defineProps([
  'visible',
  'readonly',
  'record',
  'values',
  'relationInfo',
  'parentFormInfo'
])

const emit = defineEmits(['update:visible', 'row-commit', 'row-remove'])
const modalTitle = computed(
  () => ({ ...props.record, ...props.values }.display_name || '新增')
)

const visible2 = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

const editRef = ref()
const useData = useO2mForm(props, { emit, editRef })
const { mVal, formInfo } = useData

const { onChange, commit } = useData

function onRollback() {
  visible2.value = false
}

async function onRemove() {
  // console.log('onRemove', props.record)
  emit('row-remove', props.record)
  visible2.value = false
}

async function onCommit() {
  const result = await commit()
  if (result) {
    // console.log('onCommit form ', props.record, result)
    emit('row-commit', props.record, result)
    visible2.value = false
  }
}
</script>

<style type="text/css"></style>
