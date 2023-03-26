<template>
  <span>
    <template v-if="fieldInfo.widget === 'radio'">
      <!-- todo: {{ [fieldInfo.type, fieldInfo.widget] }} -->

      <template v-if="readonly">
        {{ dVal }}
      </template>

      <template v-else>
        <!-- {{ mVal }} -->
        <a-radio-group
          v-model:value="mVal"
          :options="options"
          @change="onChangeRadio"
        />
      </template>
    </template>
    <template v-else-if="fieldInfo.widget">
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>

    <template v-else>
      <template v-if="readonly">
        {{ dVal }}
      </template>

      <template v-else>
        <!-- edit: {{ [fieldName, mVal, dVal, onChange] }} -->

        <a-select
          v-model:value="mVal"
          :style="compute_style"
          :options="options"
          @change="onChange"
        >
        </a-select>
      </template>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useFSelection } from './FSelectionApi'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])

const { mVal, dVal, readonly, options, onChange } = useFSelection(props, {
  emit
})

function onChangeRadio(e) {
  onChange(e.target.value)
}

const compute_style = computed(() =>
  props.width ? `width: ${props.width}` : undefined
)
</script>

<style type="text/css"></style>
