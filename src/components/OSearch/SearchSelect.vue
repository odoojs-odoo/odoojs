<template>
  <span>
    <span v-if="title"> {{ title }}: </span>

    <a-checkbox-group
      v-model:value="state.mVal"
      name="checkboxgroup"
      :options="options2"
      @change="handleChange"
    />
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed, reactive, watch } from 'vue'
import { useL10n } from '@/components/tools/useL10n'
const { _t } = useL10n()

const props = defineProps(['modelValue', 'title', 'placeholder', 'options'])
const emit = defineEmits(['change'])

const state = reactive({ mVal: [] })

const options2 = computed(() =>
  props.options.map(item => {
    return { value: item[0], label: _t(item[1]) }
  })
)

watch(
  () => props.modelValue,
  // eslint-disable-next-line no-unused-vars
  (newVal, oldVal) => {
    // console.log([newVal, oldVal])
    state.mVal = newVal
  }
)

function handleChange(value) {
  // console.log(value)
  emit('change', value)
}
</script>

<style type="text/css"></style>
