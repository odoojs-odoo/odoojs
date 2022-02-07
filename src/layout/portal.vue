<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: 0">
      <a-row>
        <a-col :span="8">
          <div class="logo">Logo</div>
        </a-col>

        <a-col :span="8">
          <span>欢迎使用 odoojs</span>
        </a-col>

        <a-col :span="8">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ session_info.name }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="onChangePortal">
                  切换到管理页面
                </a>
              </a-menu-item>

              <a-menu-item>
                <a href="javascript:;" @click="onLogout">
                  {{ session_info.uid ? '注销' : '登录' }}
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content
      :style="{
        margin: '24px 16px',
        padding: '24px',
        background: '#fff',
        minHeight: '280px'
      }"
    >
      <router-view />

      <!-- @on-event="handleOnViewEvent" -->
      <!-- <template v-if="showWizard">
          <WizardForm :visible.sync="showWizard" :view-info="viewInfo" />
        </template> -->
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      antd-odoojs ©2021 Created by odoowww@163.com
    </a-layout-footer>
  </a-layout>
</template>

<script>
import api from '@/odooapi'

export default {
  name: 'Portal',
  components: {},
  mixins: [],
  data() {
    return {}
  },

  computed: {
    session_info() {
      return api.web.session.session_info || {}
    }
  },

  created() {},

  methods: {
    onChangePortal() {
      // this.$router.push({ path: '/my' })
    },

    async onLogout() {
      // console.log('xxxxx, logout')
      await api.web.logout()
      this.$router.replace({ path: '/user/login' })
    }
  }
}
</script>

<style scoped></style>
