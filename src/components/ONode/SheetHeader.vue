<template>
  <div>
    <StatusBar :currentState="currentState" :states="states" />
    <template v-if="!formInfo.editable">
      <a-space
        style="
          float: right;
          margin-right: 10px;
          margin-top: 5px;
          margin-bottom: 20px;
        "
      >
        <template v-for="btn in headerButtons" :key="btn.name">
          <a-button size="small" :type="btn.btn_type" @click="onBtnClick(btn)">
            {{ btn.string }}
          </a-button>
        </template>
      </a-space>
    </template>
  </div>
</template>

<script setup>
import StatusBar from './StatusBar.vue'

defineProps(['formInfo', 'headerButtons', 'states', 'currentState'])
const emit = defineEmits(['button-click'])

async function onBtnClick(btn) {
  emit('button-click', btn)
}
</script>

<style type="text/css"></style>
