<!--
 * @Author: Nxf
 * @Date: 2023-02-04 22:18:39
 * @LastEditors: Nxf
 * @LastEditTime: 2023-02-04 23:25:42
 * @Descripttion: 
-->
<template>
  <div>
    <!-- SpaceLayout -->
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SpaceLayout',

  setup() {
    return {}
  }
})
</script>

<style scoped></style>
