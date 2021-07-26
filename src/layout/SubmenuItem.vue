<template>
  <span>
    <Submenu v-if="menuData.children" :name="menuData.name">
      <template slot="title">
        <Icon v-if="menuData.icon" :type="menuData.icon" />
        <span> {{ menuData.title }} </span>
      </template>

      <SubmenuItem
        v-for="submenu in menuData.children"
        :key="submenu.name"
        :menu-data="submenu"
      />
    </Submenu>

    <MenuItem
      v-else-if="!menuData.id || menuData.type === 'ir.actions.act_window'"
      :key="menuData.name"
      :name="menuData.name"
    >
      <Icon v-if="menuData.icon" :type="menuData.icon" />
      {{ menuData.title }}
    </MenuItem>
  </span>
</template>

<script>
export default {
  name: 'SubmenuItem',
  props: {
    menuData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},

  async created() {},
  methods: {}
}
</script>

<style scoped></style>
