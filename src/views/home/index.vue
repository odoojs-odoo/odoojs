<template>
  <div>
    <div>Home page</div>
    <div></div>

    <div>-----</div>

    <a-button type="primary" @click="onLogout">注销再登录</a-button>

    <div>odoo version: {{ version_info.server_version }}</div>
    <div>odoo version: {{ version_info.server_version }}</div>

    <a-form>
      <a-descriptions title="" :column="2">
        <a-descriptions-item :span="1">
          <a-form-item label="UserName" class="formItem">
            Zhou Maomao
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item>
          <a-descriptions :column="1">
            <a-descriptions-item>
              <a-form-item label="UserName" class="formItem">
                Zhou Maomao
              </a-form-item>
            </a-descriptions-item>

            <a-descriptions-item>
              <a-form-item label="UserName" class="formItem">
                Zhou Maomao
              </a-form-item>
            </a-descriptions-item>
          </a-descriptions>
        </a-descriptions-item>
        <a-descriptions-item label=""> no lable</a-descriptions-item>
        <a-descriptions-item label="">
          <a-form-item label="Telephone" class="formItem">
            1810000000
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="Live"
          >Hangzhou, Zhejiang</a-descriptions-item
        >
        <a-descriptions-item label="Remark">empty</a-descriptions-item>
        <a-descriptions-item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </a-descriptions-item>
      </a-descriptions>
    </a-form>
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
