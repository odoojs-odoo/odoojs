<template>
  <a-radio-group
    :value="currentState"
    button-style="solid"
    size="small"
    style="
      float: right;
      margin-right: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
    "
  >
    <template v-for="btn in states" :key="btn[0]">
      <a-radio-button style="pointer-events: none" :value="btn[0]">
        {{ tr(btn[1]) }}
      </a-radio-button>
    </template>
  </a-radio-group>
</template>

<script setup>
import { defineProps } from 'vue'

import { useL10n } from '@/components/tools/useL10n'
const { tr } = useL10n()

defineProps(['states', 'currentState'])
</script>

<style type="text/css"></style>
