<template>
  <span>
    <template v-if="fieldInfo.widget === 'radio'">
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
      <!-- <WRadio
        v-model="value"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        @change="onChange"
      /> -->
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
          @change="onChange"
        >
          <a-select-option
            v-for="op in fieldInfo.selection || []"
            :key="op[0]"
            :value="op[0]"
          >
            {{tr(op[1])}}
          </a-select-option>
        </a-select>
      </template>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useFSelection } from './FSelectionApi'
import { useL10n } from '@/components/tools/useL10n';
const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const {tr} = useL10n()
const emit = defineEmits(['update:modelValue', 'change'])

const { mVal, dVal, readonly, onChange } = useFSelection(props, { emit })

const compute_style = computed(() =>
  props.width ? `width: ${props.width}` : undefined
)
</script>

<style type="text/css"></style>
