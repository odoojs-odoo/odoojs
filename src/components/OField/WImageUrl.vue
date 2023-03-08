<template>
  <span>
    <template v-if="readonly">
      <img :src="image_url" />
    </template>

    <template v-else> // </template>
  </span>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useField } from './FieldApi'

import api from '@/odoorpc'

const props = defineProps(['width', 'fieldName', 'fieldInfo', 'formInfo'])
const { dVal, readonly } = useField(props)

const image_url = computed(() => {
  if (dVal.value) {
    return `${api.baseURL}${dVal.value}`
  } else {
    return undefined
  }
})
</script>

<style type="text/css"></style>
