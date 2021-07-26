<template>
  <div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <div>Home page</div>
    <!-- <div>odoo version: {{ api.version_info.server_version }}</div> -->
    <div>odoo version: {{ version_info.server_version }}</div>

    <Card style="width:350px">
      <p slot="title">
        <Icon type="ios-contact" />
        当前登录用户
      </p>
      <div>姓名: {{ session_info.name }}</div>
      <div>数据库: {{ session_info.db }}</div>
      <div>语言: {{ (session_info.user_context || {}).lang }}</div>
      <div>服务版本: {{ session_info.server_version }}</div>
      <div>
        公司:
        {{
          ((session_info.user_companies || {}).current_company || [
            null,
            null
          ])[1]
        }}
      </div>
      <div>
        多公司:
        {{
          ((session_info.user_companies || {}).allowed_companies || [])
            .map(item => item[1])
            .join(',')
        }}
      </div>

      <Button @click="onLogout">{{
        session_info.uid ? '注销' : '登录'
      }}</Button>
    </Card>

    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <div>&nbsp;</div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Home',
  components: {},
  mixins: [],

  data() {
    return {
      api,
      version_info: {}
    }
  },
  computed: {
    session_info() {
      return { ...api.session_info }
    }
  },
  async created() {
    // this.version_info = await api.version_info_promise
  },

  methods: {
    async onLogout() {
      await api.logout()
      this.$router.replace({ path: '/user/login' })
    }
  }
}
</script>

<style type="text/css"></style>
