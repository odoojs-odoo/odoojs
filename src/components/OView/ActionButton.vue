<!--
 * @Author: Nxf
 * @Date: 2023-03-25 10:46:18
 * @LastEditors: Nxf
 * @LastEditTime: 2023-03-26 16:27:51
 * @Descripttion: 
-->
<template>
  <a-dropdown>
    <a-button
      size="small"
    >
      <setting-outlined />
      操作
    </a-button>

    <template #overlay>
      <a-menu @click="onMenuClick">
        <!-- TBD 导出功能 暂时屏蔽 -->
        <!-- <a-menu-item key="export"> 导出 </a-menu-item> -->
        <a-menu-item v-if="hasDelete" key="unlink"> 删除 </a-menu-item>
        <a-menu-item key="archive" v-if="hasActive"> 存档 </a-menu-item>
        <a-menu-item key="unarchive" v-if="hasActive"> 取消存档 </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['hasDelete', 'hasActive'])
const emit = defineEmits(['button-click'])

function onMenuClick({ key }) {
  console.log(key)
  if (typeof key === 'string') handleActionString(key)
  if (typeof key === 'number') handleActionBtn(key)
}

function handleActionString(key) {
  console.log('string', key)
  emit('button-click', key)
}

function handleActionBtn(key) {
  console.log('handleActionBtn', key)
  // const action = this.actionBtns.find(item => item.id === key)
  // if (this.viewType === 'list') {
  //   this.$emit('on-event', 'on-list-event', 'on-action', action)
  // } else if (this.viewType === 'form') {
  //   this.$emit('on-event', 'on-form-event', 'on-action', action)
  // }
}
</script>

<style type="text/css"></style>
