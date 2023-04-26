<template>
  <div>
    <div>Home page</div>
    <div></div>

    <!-- <a-button type="primary" class="button-box-button">
      <div>注销再登录1</div>
      <div>注销再登录2</div>
    </a-button> -->

    <!-- <TestChart2 />

    <div>-----</div>

    <TestChart /> -->
    <div>-----</div>

    <a-button type="primary" @click="onLogout">注销再登录</a-button>

    <div>odoo version: {{ version_info.server_version }}</div>
  </div>
</template>

<script>
import api from '@/odoorpc'
import TestChart from '@/components/TestChart.vue'
import TestChart2 from '@/components/TestChart2.vue'

export default {
  name: 'HomePage',
  // components: { TestChart, TestChart2 },

  data() {
    return {
      version_info: {}
    }
  },
  computed: {},
  async created() {
    // this.version_info = await api.web.webclient.version_info()
  },

  methods: {
    async onLogout() {
      await api.web.logout()
      this.$router.replace({ path: '/user/login' })
    }
  }
}
</script>

<style type="text/css" scoped></style>
