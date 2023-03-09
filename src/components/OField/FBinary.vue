<template>
  <span>
    <template v-if="fieldInfo.widget === 'image'">
      todo widget === image
      <!-- <WImage
        v-model="value"
        :editable="editable"
        :field-info="fieldInfo"
        :view-info="viewInfo"
        :data-info="dataInfo"
        @change="(fname, value) => handleChange(value)"
      /> -->
    </template>
    <template v-else-if="fieldInfo.widget">
      todo: {{ fieldInfo.widget }}
    </template>

    <template v-else>
      <template v-if="readonly">
        // todo
        <!-- <van-field :label="fieldInfo.string" readonly :value="value_display" /> -->
      </template>

      <template v-else> // todo</template>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useField } from './FieldApi'

// import WImage from './WImage.vue'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])

const { mVal, dVal, readonly, onChange } = useField(props, { emit })
</script>

<style type="text/css"></style>
