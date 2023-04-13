<template>
  <div v-if="!Object.keys(node.children || {}).length"></div>
  <div v-else class="oe_button_box">
    <template v-for="item in node.children || {}" :key="item.nodename">
      <StatButton :node="item" :form-info="{ ...formInfo, editable: false }" />
    </template>
  </div>
</template>

<script setup>
import StatButton from '@/components/ONode/StatButton.vue'
defineProps(['formInfo', 'node'])
</script>

<style scoped>
.oe_button_box {
  height: 80px;
}
</style>
