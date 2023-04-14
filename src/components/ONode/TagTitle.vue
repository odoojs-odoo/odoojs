<template>
  <div>
    <template v-for="item in node.children || {}" :key="item.nodename">
      <TagNode
        :model="model2"
        :node="item"
        :form-info="formInfo"
        @change="onChange"
      />
    </template>
  </div>
</template>

<script setup>
import TagNode from '@/components/ONode/TagNode.vue'
import { useTag } from '@/components/useApi/useTag.js'

const props = defineProps(['model', 'formInfo', 'node'])
const emit = defineEmits(['change'])

const { model2, onChange } = useTag(props, { emit })
</script>

<style scoped type="text/css"></style>
