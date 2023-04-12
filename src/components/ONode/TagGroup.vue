<template>
  <a-row>
    <template v-for="node2 in node.children || {}" :key="node2.nodename">
      <a-col :span="node.col || 12">
        <template v-if="node2.tag && node2.tag === 'group'">
          <template v-if="node2.string">
            <h1>
              <i>{{ node2.string }}</i>
            </h1>
          </template>

          <template v-for="item in node2.children || {}" :key="item.nodename">
            <TagNode
              :model="model2"
              :node="item"
              :form-info="formInfo"
              @change="onChange"
              @load-relation="onLoadReation"
            />
          </template>
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
import { computed } from 'vue'
import TagNode from '@/components/ONode/TagNode.vue'

const props = defineProps(['model', 'formInfo', 'node'])
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

async function onChange(fname, ...args) {
  emit('change', fname, ...args)
}

async function onLoadReation(fieldName, relation_info) {
  emit('load-relation', fieldName, relation_info)
}
</script>

<style type="text/css"></style>
