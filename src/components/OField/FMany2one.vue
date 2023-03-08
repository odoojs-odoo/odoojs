<template>
  <span>
    <template v-if="fieldInfo.widget === 'some widget'">
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>
    <template v-if="fieldInfo.widget === 'many2one_view'">
      <a-button @click="onClickView"> {{ dVal }}</a-button>
    </template>

    <template v-else-if="fieldInfo.widget">
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>

    <template v-else>
      <template v-if="readonly">
        {{ dVal }}
      </template>

      <template v-else>
        <!-- edit: {{ [fieldName, mVal, dVal, options, onChange] }} -->

        <OMany2one
          v-model="mVal"
          :width="width"
          :placeholder="fieldInfo.string"
          :options="options"
          @change="onChange"
        />
      </template>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useFM2o } from './FM2oApi'
import OMany2one from '@/components/OInput/OMany2one.vue'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change', 'click-many2one'])

function onClickView() {
  const val = props.formInfo.record[props.fieldName]
  console.log('sdfsdf', val, val[0])
  // emit('click-many2one', props.fieldName, val)
}

const { mVal, dVal, readonly, options, onChange } = useFM2o(props, { emit })
</script>

<style type="text/css"></style>
