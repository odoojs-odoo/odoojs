<template>
  <template v-if="node.tag">
    <template v-if="node.tag === 'label'">
      <b>{{ node.string }}</b>
    </template>

    <!--     
    <template v-if="node.tag === 'separator'">
      <b>{{ node.string }}</b>
    </template> -->

    <template v-else-if="nodeTag">
      <component :is="nodeTag">
        <template v-if="node.text"> {{ node.text }} </template>
        <template v-for="sub in node.children || {}" :key="sub.name">
          <TagNode
            :model="model"
            :node="sub"
            :form-info="formInfo"
            @change="onChange"
            @load-relation="onLoadReation"
          />
        </template>
      </component>
    </template>
    <template v-else-if="node.tag === 'field'">
      <a-form-item
        :name="node.label.for"
        :label="tr(node.label.string)"
        :rules="getRules(node.label.fieldInfo)"
        :labelCol="{ style: 'fontWeight:bold' }"
        style="margin-bottom: 5px"
      >
        <div class="o_row">
          <template v-for="sub in node.children" :key="sub.name">
            <TagNode
              :model="model"
              :nolabel="1"
              :node="sub"
              :form-info="formInfo"
              @change="onChange"
              @load-relation="onLoadReation"
            />
          </template>
        </div>
      </a-form-item>
    </template>

    <template v-else>
      <template v-if="['widget'].includes(node.tag)"> </template>

      <template v-else> todo:{{ [node.name, node.tag] }} </template>
    </template>
  </template>

  <template v-else>
    <template v-if="nolabel">
      <OField
        v-model="model2[node.name]"
        width="270px"
        :field-name="node.name"
        :field-info="node"
        :form-info="formInfo"
        @change="(...args) => onChange(node.name, ...args)"
        @load-relation="onLoadReation"
      />
    </template>

    <template v-else>
      <a-form-item
        :name="node.name"
        :label="!node.nolabel ? tr(node.string) : undefined"
        :rules="getRules(node)"
        :labelCol="{ style: 'fontWeight:bold' }"
        style="margin-bottom: 5px"
      >
        <OField
          v-model="model2[node.name]"
          width="270px"
          :field-name="node.name"
          :field-info="node"
          :form-info="formInfo"
          @change="(...args) => onChange(node.name, ...args)"
          @load-relation="onLoadReation"
        />
      </a-form-item>
    </template>
  </template>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import OField from '@/components/OField/OField.vue'
import { useL10n } from '@/components/tools/useL10n'
import { object } from 'vue-types'
const tags_h = { h1: 1, h2: 1, h3: 1, h6: 1, b: 1, strong: 1 }
const tags_div = { div: 1, span: 1, hr: 1 }
const tags_other = { p: 1, separator: 1 }

const tags_done = { ...tags_h, ...tags_div, ...tags_other }

const { tr } = useL10n()

const props = defineProps(['model', 'formInfo', 'node', 'nolabel'])
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

const nodeTag = computed(() => {
  const tag = props.node.tag
  return tag in tags_done ? tag : null
})

function getRules(fieldInfo) {
  if (!fieldInfo.required) return undefined
  return [{ required: true, message: `请输入${tr(fieldInfo.string)}!` }]
}

async function onChange(fname, ...args) {
  emit('change', fname, ...args)
}

async function onLoadReation(fieldName, relation_info) {
  emit('load-relation', fieldName, relation_info)
}
</script>

<style type="text/css"></style>
