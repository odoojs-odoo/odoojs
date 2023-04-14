<template>
  <div>
    <a-tabs type="card">
      <a-tab-pane
        v-for="page in node.children || {}"
        :key="page.nodename"
        :tab="page.string"
      >
        <template v-for="node2 in page.children || {}" :key="node2.nodename">
          <template v-if="node2.tag && node2.tag === 'group'">
            <TagGroup
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
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import TagGroup from '@/components/ONode/TagGroup.vue'
import TagNode from '@/components/ONode/TagNode.vue'

import { useTag } from '@/components/useApi/useTag.js'

const props = defineProps(['model', 'formInfo', 'node'])
const emit = defineEmits(['change', 'load-relation'])

const { model2, onChange, onLoadReation } = useTag(props, { emit })
</script>

<style type="text/css"></style>
