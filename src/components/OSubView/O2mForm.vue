<template>
  <span>
    <a-modal v-model:visible="visible2" :title="modalTitle" width="600px">
      <!-- readonly: {{ [readonly, visible] }} -->

      <a-form
        ref="editRef"
        :model="mVal"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        autocomplete="off"
      >
        <!-- o2m form -->
        <div></div>

        <template v-for="meta in fields">
          <template v-if="checkInvisible(meta)">
            invisible: {{ meta.name }}: {{ record[meta.name] }}
          </template>
          <template v-else>
            <a-form-item
              :key="meta.name"
              :name="meta.name"
              :label="meta.string"
              :rules="getRules(meta)"
              style="margin-bottom: 0px"
            >
              <div>
                <!-- In O2mForm: {{ meta.name }}:
                {{ [record[meta.name], formInfo.values] }} -->
              </div>

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
        </template>
      </a-form>

      <template #footer>
        <a-space v-if="!readonly">
          <a-button size="small" @click="onCommit"> 保存 </a-button>
          <a-button size="small" @click="onRollback"> 丢弃 </a-button>
          <a-button v-if="record.id" size="small" @click="onRemove">
            移出
          </a-button>
        </a-space>

        <a-space v-else>
          <a-button size="small" @click="() => (visible2 = false)">
            关闭
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useO2mForm } from './o2mFormApi'
import OField from '@/components/OField/OField.vue'

const props = defineProps([
  'visible',
  'readonly',
  'record',
  'relationInfo',
  'parentFormInfo'
])

const emit = defineEmits(['update:visible', 'row-commit'])
const modalTitle = props.record.id ? props.record.displayname : '新增'

const editRef = ref()

const {
  visible2,
  mVal,
  fields,
  formInfo,
  checkInvisible,
  getRules,
  onChange,
  onRollback,
  onRemove,
  onCommit
} = useO2mForm(props, { emit, editRef })

const labelCol = { span: 4 }
const wrapperCol = { span: 18 }
</script>

<style type="text/css"></style>
