<template functional>
  <a-sub-menu :key="props.menuData.id">
    <span slot="title">
      <span> {{ props.menuData.name }}</span>
    </span>

    <template v-for="submenu in props.menuData.children">
      <template
        v-if="
          submenu.children &&
          Array.isArray(submenu.children) &&
          submenu.children.length
        "
      >
        <sub-menu
          :key="submenu.id"
          :menu-data="submenu"
          :collapsed="collapsed"
        />
      </template>

      <template v-else>
        <a-menu-item :key="submenu.id">
          <span> {{ submenu.name }} </span>
        </a-menu-item>
      </template>

      <!-- <template v-if="submenu.action">
        <a-menu-item :key="submenu.id">
          <span> {{ submenu.name }} </span>
        </a-menu-item>
      </template>

      <template v-else>
        <sub-menu
          :key="submenu.id"
          :menu-data="submenu"
          :collapsed="collapsed"
        />
      </template> -->
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
  // methods: {
  //   test(submenu) {
  //     console.log(submenu)
  //   }
  // }
}
</script>

<style scoped></style>
