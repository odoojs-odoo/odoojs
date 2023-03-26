<template>
  <span>
    <template v-if="fieldInfo.widget === 'radio2'">
      <!-- todo: {{ [fieldInfo.type, fieldInfo.widget] }} -->

      <template v-if="readonly">
        {{ dVal }}
      </template>

      <template v-else>
        {{ mVal }}
        <a-radio-group
          v-model:value="mVal"
          :options="options"
          @change="onChange"
        />
      </template>
    </template>
    <!-- <template v-else-if="fieldInfo.widget">
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template> -->

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
import { defineProps, defineEmits, computed, toRaw } from 'vue'
import { useFSelection } from './FSelectionApi'
import { useL10n } from '@/components/tools/useL10n'
const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const { tr } = useL10n()
const emit = defineEmits(['update:modelValue', 'change'])

const { mVal, dVal, readonly, onChange } = useFSelection(props, { emit })

const options = computed(() => {
  const info = toRaw(props.fieldInfo)
  const ops = info.selection || []

  return ops.map(item => {
    return {
      label: tr(item[1]),
      value: item[0]
    }
  })
})

const compute_style = computed(() =>
  props.width ? `width: ${props.width}` : undefined
)
</script>

<style type="text/css"></style>
