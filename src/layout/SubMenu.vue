<!--
 * @Author: Nxf
 * @Date: 2023-02-05 15:40:56
 * @LastEditors: Nxf
 * @LastEditTime: 2023-02-06 11:33:52
 * @Descripttion: 
-->
<template>
  <!-- {{ [  collapsed] }} -->
  <template v-for="item in menuData">
    <template v-if="is_sub_menu(item)">
      <a-sub-menu :key="item.id">
        <template #icon>
          <component :is="$antIcons[item.icon]" />
        </template>
        <template #title>
          {{ item.name }}
        </template>

        <SubMenu
          :menu-data="item.children"
          :collapsed="collapsed"
          :key="item.id"
        />
      </a-sub-menu>
    </template>

    <template v-else>
      <a-menu-item :key="item.id">
        <component :is="$antIcons[item.icon]" />
        <span> {{ item.name }}</span>
      </a-menu-item>
    </template>
  </template>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'SubMenu',
  props: ['menuData', 'collapsed'],

  setup() {
    function is_sub_menu(menu) {
      const is_sub_menu =
        menu.children && Array.isArray(menu.children) && menu.children.length
      // console.log('------',$icons);
      return is_sub_menu || !menu.action
    }
    onMounted(() => {
      // console.log('------',);
    })
    return {
      is_sub_menu
    }
  }
})
</script>

<style scoped></style>
