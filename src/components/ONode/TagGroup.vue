<template>
  <a-row>
    <template v-for="node2 in node.children || {}" :key="node2.nodename">
      <a-col :span="node.col || 12">
        <template v-if="node2.tag && node2.tag === 'group'">
          <TagGroupSub
            :model="model2"
            :node="node2"
            :form-info="formInfo"
            @change="onChange"
            @load-relation="onLoadReation"
          />
        </template>
        <template v-else>
          <TagNode
            :model="model2"
            :node="node2"
            :form-info="formInfo"
            @change="onChange"
            @load-relation="onLoadReation"
          />
        </template>
      </a-col>
    </template>
  </a-row>
</template>

<script setup>
import TagGroupSub from '@/components/ONode/TagGroupSub.vue'
import TagNode from '@/components/ONode/TagNode.vue'
import { useTag } from '@/components/useApi/useTag.js'

const props = defineProps(['model', 'formInfo', 'node'])
const emit = defineEmits(['change', 'load-relation'])
const { model2, onChange, onLoadReation } = useTag(props, { emit })
</script>

<style type="text/css"></style>
