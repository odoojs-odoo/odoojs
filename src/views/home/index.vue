<template>
  <div>
    <div>Home page</div>
    <div></div>

    <div>-----</div>
    <!-- <test-table /> -->

    <a-button type="primary" @click="onLogout">注销再登录</a-button>

    <div>odoo version: {{ version_info.server_version }}</div>
    <div>odoo version: {{ version_info.server_version }}</div>
  </div>
</template>

<script>
import api from '@/odooapi'

// import TestTable from './testTable.vue'

export default {
  name: 'Home',
  // components: { TestTable },
  mixins: [],

  data() {
    return {
      version_info: {},

      open: false
    }
  },
  computed: {},
  async created() {
    this.version_info = await api.web.webclient.version_info()
  },

  methods: {
    async onLogout() {
      await api.web.logout()
      this.$router.replace({ path: '/user/login' })
    }
  }
}
</script>

<style type="text/css"></style>
