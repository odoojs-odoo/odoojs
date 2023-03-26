<!--
 * @Author: Nxf
 * @Date: 2023-03-18 08:53:52
 * @LastEditors: Nxf
 * @LastEditTime: 2023-03-26 17:11:28
 * @Descripttion: 
-->
<template>
  <span>
    <span v-if="title"> 
      <b>
        {{ title }}: 
      </b>
    </span>

    <b>
      <a-checkbox-group
      v-model:value="state.mVal"
      name="checkboxgroup"
      :options="options2"
      @change="handleChange"
    />
    </b>
   
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed, reactive, watch } from 'vue'
import { useL10n } from '@/components/tools/useL10n'
const { tr } = useL10n()

const props = defineProps(['value', 'title', 'placeholder', 'options'])
const emit = defineEmits(['change'])

const state = reactive({ mVal: [] })

const options2 = computed(() =>
  props.options.map(item => {
    return { value: item[0], label: tr(item[1]) }
  })
)

watch(
  () => props.value,
  // eslint-disable-next-line no-unused-vars
  (newVal, oldVal) => {
    // console.log([newVal, oldVal])
    state.mVal = newVal.map(item => item.name)
  },
  { immediate: true }
)

function handleChange(value) {
  // console.log(value)
  emit('change', value)
}
</script>

<style type="text/css"></style>
