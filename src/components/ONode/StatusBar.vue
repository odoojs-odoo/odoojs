<template>
  <span
    style="
      float: right;
      margin-right: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
    "
  >
    <info-circle-outlined v-if="states.length" />
    <a-radio-group :value="currentState" button-style="solid" size="small">
      <template v-for="btn in states" :key="btn[0]">
        <a-radio-button style="pointer-events: none" :value="btn[0]">
          {{ btn[1] }}
        </a-radio-button>
      </template>
    </a-radio-group>
    <info-circle-outlined v-if="states.length" />
  </span>
</template>

<script setup>
defineProps(['states', 'currentState'])
</script>

<style type="text/css"></style>
