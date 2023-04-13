<template>
  <span>
    <!-- style -->
    <template v-if="readonly">
      <img :src="image_url" :style="style" />
    </template>

    <template v-else>
      <!-- todo upload img -->
      todo edit
      <img :src="image_url" style="width: 50%" />
    </template>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { useField } from './FieldApi'

const props = defineProps(['width', 'fieldName', 'fieldInfo', 'formInfo'])
const { dVal, readonly } = useField(props)

const image_url = computed(() => {
  if (dVal.value) {
    return `data:image/png;base64,${dVal.value}`
  } else {
    return undefined
  }
})

const style = computed(() => {
  if (props.fieldInfo.size === 'small') {
    return { width: 30 }
  } else {
    return { width: 60 }
  }
})
</script>

<style type="text/css"></style>
