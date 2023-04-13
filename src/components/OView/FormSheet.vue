<template>
  <a-form :model="model2" ref="editRef" autocomplete="off">
    <template v-for="node in sheet.children || {}" :key="node.nodename">
      <template v-if="node.tag && node.tag === 'notebook'">
        <a-tabs type="card">
          <a-tab-pane
            v-for="page in node.children || {}"
            :key="page.nodename"
            :tab="page.string"
          >
            <template
              v-for="node2 in page.children || {}"
              :key="node2.nodename"
            >
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
      </template>

      <template v-else-if="node.tag && node.tag === 'group'">
        <TagGroup
          :model="model2"
          :node="node"
          :form-info="formInfo"
          @change="onChange"
          @load-relation="onLoadReation"
        />
      </template>

      <template v-else-if="node.tag && node.nodename === '_div_title'">
        <template v-for="item in node.children || {}" :key="item.nodename">
          <TagNode
            :model="model2"
            :node="item"
            :form-info="formInfo"
            @change="onChange"
            @load-relation="onLoadReation"
          />
        </template>
      </template>

      <template v-else-if="node.tag && node.nodename === '_div_button_box'">
        <ButtonBox :node="node" :form-info="formInfo" />
      </template>

      <template v-else>
        <TagNode
          :model="model2"
          :node="node"
          :form-info="formInfo"
          @change="onChange"
          @load-relation="onLoadReation"
        />
      </template>
    </template>
  </a-form>
</template>

<script setup>
import { computed, ref } from 'vue'

import { useFormSheet } from './formSheetApi'

import ButtonBox from '@/components/ONode/ButtonBox.vue'
import TagNode from '@/components/ONode/TagNode.vue'
import TagGroup from '@/components/ONode/TagGroup.vue'

const editRef = ref()
function validate() {
  return editRef.value.validate()
}

const props = defineProps(['model', 'formInfo'])
const emit = defineEmits(['change', 'load-relation'])
defineExpose({ validate })

const model2 = computed({
  get() {
    return props.model
  },

  // eslint-disable-next-line no-unused-vars
  set(val) {
    // state.mVal = {...}
  }
})

const { sheet } = useFormSheet(props)

async function onChange(fname, ...args) {
  emit('change', fname, ...args)
}

async function onLoadReation(fieldName, relation_info) {
  emit('load-relation', fieldName, relation_info)
}
</script>

<style type="text/css"></style>
