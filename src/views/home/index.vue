<template>
  <div>
    <div>Home page</div>
    <div></div>
    <a-form>
      <a-form-item name="name" label="Name">
        <a-input />
        <a-input />
      </a-form-item>
    </a-form>
    <div>-----</div>

    <a-button type="primary" @click="onLogout">注销再登录</a-button>

    <div>odoo version: {{ version_info.server_version }}</div>
  </div>
</template>

<script>
import api from '@/odoorpc'

export default {
  name: 'HomePage',
  components: {},

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
    async onLogout() {
      await api.web.logout()
      this.$router.replace({ path: '/user/login' })
    }
  }
}
</script>

<style type="text/css" scoped>
.formItem {
  margin-bottom: 0px;
}
</style>
