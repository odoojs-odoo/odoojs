<template>
  <span>
    <a-modal v-model:visible="visible2" :title="modalTitle" width="600px">
      <!-- readonly: {{ [readonly, visible2, relationData] }} -->

      <a-form
        ref="editRef"
        :model="mVal"
        autocomplete="off"
        style="background-color: white; margin-top: 5px; padding: 5px"
      >
        <a-descriptions
          :column="2"
          style="background-color: white; padding: 5px; margin-top: 5px"
          size="small"
        >
          <template v-for="group in sheet.children" :key="group.name">
            <a-descriptions-item :span="group.span">
              <a-descriptions :column="1">
                <template v-for="meta in group.children" :key="meta.name">
                  <a-descriptions-item v-if="!getInvisible(meta)">
                    <template v-if="meta.type">
                      <a-form-item
                        :name="meta.name"
                        :label="tr(meta.string)"
                        :rules="getRules(meta)"
                        style="margin-bottom: 5px"
                      >
                        <OField
                          width="270px"
                          v-model="mVal[meta.name]"
                          :field-name="meta.name"
                          :field-info="meta"
                          :form-info="formInfo"
                          @change="(...args) => onChange(meta.name, ...args)"
                        />
                      </a-form-item>
                    </template>
                  </a-descriptions-item>
                </template>
              </a-descriptions>
            </a-descriptions-item>
          </template>
        </a-descriptions>
      </a-form>
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
import OField from '@/components/OField/OField.vue'

import { useL10n } from '@/components/tools/useL10n'
const { tr } = useL10n()

const props = defineProps([
  'visible',
  'readonly',
  'record',
  'relationInfo',
  'parentFormInfo'
])

const emit = defineEmits(['update:visible', 'row-commit', 'row-remove'])
const modalTitle = computed(() =>
  props.record.id ? props.record.display_name : '新增'
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
const { sheet, formInfo, mVal, getInvisible } = useData

const { getRules, onChange, commit } = useData

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
    console.log('onCommit form ', props.record, result)
    emit('row-commit', props.record, result)
    visible2.value = false
  }
}
</script>

<style type="text/css"></style>
