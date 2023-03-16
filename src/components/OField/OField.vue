<template>
  <span>
    <template v-if="widgetName">
      <template v-if="widgetMap[widgetName]">
        <!-- <div>
          in OField: {{ [fieldName, formInfo.formType] }}:
          {{ [formInfo.record[fieldName], formInfo.values] }}
        </div> -->

        <component
          :is="widgetMap[widgetName]"
          v-model="mVal"
          :width="width"
          :field-name="fieldName"
          :field-info="fieldInfo"
          :form-info="formInfo"
          @click-many2one="onClickMany2one"
          @change="(...args) => onChange(...args, 'OField')"
          @load-relation="onLoadReation"
        />
      </template>

      <template v-else>
        todo2:{{ widgetName }},
        {{ [fieldInfo.name || 'nameError', fieldInfo.type, fieldInfo.widget] }}:
        {{ formInfo.record[fieldInfo.name] }}
      </template>
    </template>

    <template v-else>
      todo3:
      {{ [fieldInfo.name || 'name error', fieldInfo.type, fieldInfo.widget] }}:
      {{ formInfo.record[fieldInfo.name] }}
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useField } from './FieldApi'

import FSelection from '@/components/OField/FSelection.vue'
import FString from '@/components/OField/FString.vue'
import FNumber from '@/components/OField/FNumber.vue'
import FMany2one from '@/components/OField/FMany2one.vue'
import WAttachment from '@/components/OField/WAttachment.vue'
import FDate from '@/components/OField/FDate.vue'
import FDatetime from '@/components/OField/FDatetime.vue'

import FBoolean from '@/components/OField/FBoolean.vue'
import FM2mTags from '@/components/OField/FM2mTags.vue'
import FOne2many from '@/components/OField/FOne2many.vue'
import FMany2many from '@/components/OField/FMany2many.vue'
import FBinary from '@/components/OField/FBinary.vue'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change', 'load-relation'])

const widgetMap = {
  FString,
  FSelection,
  FNumber,
  FMany2one,
  WAttachment,
  FDate,
  FDatetime,
  FBoolean,
  FM2mTags,
  FOne2many,
  FMany2many,
  FBinary
}

const { widgetName, mVal, onChange } = useField(props, { emit })

function onClickMany2one(...args) {
  console.log('onClickMany2one', args)
}

function onLoadReation(...args) {
  // console.log('onLoadReation', args)
  emit('load-relation', ...args)
}
</script>

<style type="text/css"></style>
