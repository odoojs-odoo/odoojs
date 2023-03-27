<template>
  <span>
    <template v-if="readonly">
      <a-button v-if="dVal" @click="onDownload">
        <template #icon><download-outlined /></template>

        {{ dVal }}
      </a-button>
    </template>

    <template v-else>
      <!-- edit: {{ [fieldName, mVal, dVal] }} -->
      <template v-if="!dVal">
        <a-button type="primary" @click="onUpload"> 上传你的文件 </a-button>
      </template>
      <template v-else>
        {{ dVal }}
        <a-button type="primary" @click="onUpload"> 重新上传你的文件 </a-button>
      </template>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { DownloadOutlined } from '@ant-design/icons-vue'

import { useWAttachment } from './WAttachApi'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])

const { mVal, dVal, readonly, onUpload, onDownload } = useWAttachment(props, {
  emit
})
</script>

<style type="text/css"></style>
