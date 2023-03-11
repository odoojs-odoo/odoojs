<!--
 * @Author: Nxf
 * @Date: 2023-02-12 14:50:37
 * @LastEditors: Nxf
 * @LastEditTime: 2023-02-15 20:11:23
 * @Descripttion: 
-->
<template>
  <span>
    <template v-if="readonly">
      <!-- {{ dVal }} -->
      <template v-for="tag in dVal" :key="tag[0]">
        <a-tag>{{ tag[1] }}</a-tag>
      </template>
    </template>

    <template v-else>
      <!-- edit: {{ [fieldName, mVal, dVal, options] }} -->

      {{ options.length }}
      <a-select
        mode="multiple"
        v-model:value="mVal"
        label-in-value
        :options="selectOptions"
        :style="compute_style"
        placeholder="请选择"
        @change="onSelectChange"
      >
        <template #dropdownRender="{ menuNode: menu }">
          <v-nodes :vnodes="menu" />
          <template v-if="options.length > 7">
            <a-divider style="margin: 4px 0" />
            <div
              style="padding: 4px 8px; cursor: pointer"
              @mousedown="e => e.preventDefault()"
              @click="searchMore"
            >
              <search-outlined />
              搜索更多
            </div>
          </template>
        </template>
      </a-select>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useFM2mTags } from './FM2mTagsApi'

function VNodes(_, { attrs }) {
  return attrs.vnodes
}

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])

const { mVal, dVal, readonly, options, onSelectChange, searchMore } =
  useFM2mTags(props, { emit })

const compute_style = computed(() =>
  props.width ? `width: ${props.width}` : undefined
)

const selectOptions = computed(() =>
  options.value.slice(0, 7).map(item => {
    return { value: item[0], label: item[1] }
  })
)
</script>

<style type="text/css"></style>
