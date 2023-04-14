<template>
  <a-form :model="model2" ref="editRef" autocomplete="off">
    <template v-for="node in sheet.children || {}" :key="node.nodename">
      <component
        :is="getTag(node)"
        :model="model2"
        :node="node"
        :form-info="formInfo"
        @change="onChange"
        @load-relation="onLoadReation"
      />
    </template>
  </a-form>
</template>

<script setup>
import ButtonBox from '@/components/ONode/ButtonBox.vue'
import TagNode from '@/components/ONode/TagNode.vue'
import TagGroup from '@/components/ONode/TagGroup.vue'
import TagWidget from '@/components/ONode/TagWidget.vue'
import TagTitle from '@/components/ONode/TagTitle.vue'
import TagNotebook from '@/components/ONode/TagNotebook.vue'

import { useFormSheet } from './formSheetApi'

import { ref } from 'vue'

const editRef = ref()
function validate() {
  return editRef.value.validate()
}

const props = defineProps(['model', 'formInfo'])
const emit = defineEmits(['change', 'load-relation'])
defineExpose({ validate })

const { sheet, model2, onChange, onLoadReation } = useFormSheet(props, { emit })

function getTag(node) {
  if (!node.tag) {
    return TagNode
  } else if (node.nodename === '_div_title') {
    return TagTitle
  } else if (node.nodename === '_div_button_box') {
    return ButtonBox
  } else if (node.tag === 'widget') {
    return TagWidget
  } else if (node.tag === 'group') {
    return TagGroup
  } else if (node.tag === 'notebook') {
    return TagNotebook
  } else {
    return TagNode
  }
}
</script>

<style type="text/css"></style>
