<template>
  <div>
    <template v-if="node.string">
      <h1>
        <i>{{ node.string }}</i>
      </h1>
    </template>
    <template v-for="item in node.children || {}" :key="item.nodename">
      <template v-if="item.tag && item.tag === 'group'">
        <TagGroupSub
          :model="model2"
          :node="item"
          :form-info="formInfo"
          @change="onChange"
          @load-relation="onLoadReation"
        />
      </template>
      <template v-else>
        <TagNode
          :model="model2"
          :node="item"
          :form-info="formInfo"
          @change="onChange"
          @load-relation="onLoadReation"
        />
      </template>
    </template>
  </div>
</template>

<script setup>
import TagNode from '@/components/ONode/TagNode.vue'
import { useTag } from '@/components/useApi/useTag.js'

const props = defineProps(['model', 'formInfo', 'node'])
const emit = defineEmits(['change', 'load-relation'])
const { model2, onChange, onLoadReation } = useTag(props, { emit })
</script>

<style type="text/css"></style>
