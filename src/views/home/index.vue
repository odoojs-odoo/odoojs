<template>
  <div>
    <div>Home page</div>
    <div></div>

    <a-button type="primary" @click="onTest">Test</a-button>

    <div>-----</div>

    <a-button type="primary" @click="onLogout">注销再登录</a-button>

    <div>odoo version: {{ version_info.server_version }}</div>
    <div>odoo version: {{ version_info.server_version }}</div>
  </div>
</template>

<script>
import api from '@/odoorpc'

export default {
  name: 'Home',
  components: {},
  mixins: [],

  data() {
    return {
      version_info: {}
    }
  },
  computed: {},
  async created() {
    this.version_info = await api.web.webclient.version_info()
  },

  methods: {
    onTest() {
      //
      this.$router.push({ path: '/test' })
    },
    async onLogout() {
      await api.web.logout()
      this.$router.replace({ path: '/user/login' })
    }
  }
}
</script>

<style type="text/css"></style>
