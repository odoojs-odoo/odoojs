<template>
  <!-- :label-col="labelCol"
    :wrapper-col="wrapperCol"
    style="background-color: white; margin-top: 5px; padding: 5px"
 -->

  <a-form :model="model2" ref="editRef" autocomplete="off">
    <a-descriptions
      :column="2"
      style="background-color: white; padding: 5px; margin-top: 5px"
      size="small"
    >
      <template #title>
        <template v-for="meta in sheet.title" :key="meta.name">
          <div v-if="!getInvisible(meta)">
            {{ { ...formInfo.record, ...formInfo.values }[meta.name] }}
          </div>
        </template>
      </template>
      <!-- 
      <a-descriptions-item :span="2">
      </a-descriptions-item> 
      -->
      <template v-for="group in sheet.children" :key="group.name">
        <a-descriptions-item v-if="group.html" :span="group.span">
          <template v-if="getInvisible(group)"></template>
          <a-descriptions v-else :column="1">
            <template v-for="(item, index) in group.children" :key="index">
              <template v-if="getInvisible(item)"></template>

              <a-descriptions-item v-else>
                {{ html_get(item) }}
              </a-descriptions-item>
            </template>
          </a-descriptions>
        </a-descriptions-item>

        <a-descriptions-item v-else :span="group.span">
          <template v-if="!getInvisible(group)">
            <a-descriptions :column="1">
              <template v-for="meta in group.children" :key="meta.name">
                <template v-if="getInvisible(meta) || !meta.type" />
                <template v-else>
                  <a-descriptions-item v-if="meta.label">
                    <b> {{ meta.label }}</b>
                  </a-descriptions-item>
                  <a-descriptions-item>
                    <a-form-item
                      :name="meta.name"
                      :label="getLabel(meta)"
                      :labelCol="{ style: 'fontWeight:bold' }"
                      :rules="getRules(meta)"
                      style="margin-bottom: 5px"
                    >
                      <OField
                        v-model="model2[meta.name]"
                        width="270px"
                        :field-name="meta.name"
                        :field-info="meta"
                        :form-info="formInfo"
                        @change="(...args) => onChange(meta.name, ...args)"
                        @load-relation="onLoadReation"
                      />
                    </a-form-item>
                  </a-descriptions-item>
                </template>
              </template>
            </a-descriptions>
          </template>
        </a-descriptions-item>
      </template>
    </a-descriptions>
  </a-form>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose, computed, ref } from 'vue'

import { useFormSheet } from './formSheetApi'
import OField from '@/components/OField/OField.vue'

const props = defineProps(['model', 'formInfo'])
const emit = defineEmits(['change', 'load-relation'])

const model2 = computed({
  get() {
    return props.model
  },

  // eslint-disable-next-line no-unused-vars
  set(val) {
    // state.mVal = {...}
  }
})

const editRef = ref()
function validate() {
  return editRef.value.validate()
}

defineExpose({ validate })

const useData = useFormSheet(props)

const { sheet, html_get, getInvisible, getLabel, getRules } = useData

async function onChange(fname, ...args) {
  emit('change', fname, ...args)
}

async function onLoadReation(fieldName, relation_info) {
  emit('load-relation', fieldName, relation_info)
}

// const labelCol = { span: 8 }
// const wrapperCol = { span: 14 }
</script>

<style type="text/css"></style>
