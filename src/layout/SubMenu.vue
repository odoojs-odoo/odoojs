<template functional>
  <a-sub-menu :key="props.menuData.id">
    <span slot="title">
      <span> {{ props.menuData.name }}</span>
    </span>

    <template v-for="submenu in props.menuData.children">
      <a-menu-item v-if="submenu.action" :key="submenu.id">
        <span> {{ submenu.name }} </span>
      </a-menu-item>

      <sub-menu
        v-else
        :key="submenu.id"
        :menu-data="submenu"
        :collapsed="collapsed"
      />
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  // name: 'Submenu',
  props: ['menuData', 'collapsed'],
  data() {
    return {}
  }
  // computed: {},

  // async created() {},
  // methods: {}
}
</script>

<style scoped></style>
