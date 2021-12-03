<template>
  <!-- <div>
    <router-view />
  </div> -->

  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['home']"
        @click="selectMenu"
      >
        <a-menu-item key="home">
          <a-icon type="home" />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="test">
          <a-icon type="video-camera" />
          <span>Test</span>
        </a-menu-item>

        <template v-for="item in menus">
          <a-menu-item v-if="item.action" :key="item.id">
            <!-- <a-icon type="home" /> -->

            <span v-if="item.web_icon">
              <!-- :src="`data:image/png;base64,${item.web_icon_data}`" -->

              <img
                :src="`/dev-api/mail/static/description/icon.png`"
                alt=""
                width="12"
              />
            </span>
            <span> {{ item.name }} </span>
          </a-menu-item>

          <a-sub-menu v-else :key="item.id">
            <span slot="title">
              <!-- <a-icon type="home" /> -->
              <span v-if="item.web_icon">
                <!-- :src="`data:image/png;base64,${item.web_icon_data}`" -->
                <!-- `/dev-api/mail/static/description/icon.png` -->
                <img :src="img_url(item.web_icon)" alt="" width="12" />
              </span>
              <span> {{ item.name }} </span>
            </span>
            <template v-for="submenu in item.children">
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
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row>
          <a-col :span="3">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
          </a-col>

          <a-col :span="8">
            <span>欢迎使用 odoojs</span>
          </a-col>

          <a-col :span="7">
            <CompanySelect />
          </a-col>

          <a-col :span="6">
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                {{ session_info.name }} <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <div>姓名: {{ session_info.name }}</div>
                </a-menu-item>
                <a-menu-item>
                  <div>数据库: {{ session_info.db }}</div>
                </a-menu-item>
                <a-menu-item>
                  <div>语言: {{ (session_info.user_context || {}).lang }}</div>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">
                    服务版本: {{ session_info.server_version }}
                  </a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">
                    公司:
                    {{
                      ((session_info.user_companies || {}).current_company || [
                        null,
                        null
                      ])[1]
                    }}
                  </a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">
                    多公司:
                    {{
                      (
                        (session_info.user_companies || {}).allowed_companies ||
                        []
                      )
                        .map(item => item[1])
                        .join(',')
                    }}
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
        <!-- <img
          :src="`data:image/png;base64,${menus[0].web_icon_data}`"
          alt=""
          width="20"
        /> -->

        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        antd-odoojs ©2021 Created by odoowww@163.com
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import api from '@/api'

import SubMenu from './SubMenu'
import CompanySelect from './CompanySelect.vue'

const HOME_PATH = '/'

export default {
  name: 'Base',
  components: { SubMenu, CompanySelect },
  mixins: [],
  data() {
    return {
      collapsed: false,

      currentMenu: 'home',
      menus: [],
      current_company: 0,
      allowed_companies: []
    }
  },

  computed: {
    session_info() {
      return { ...api.session_info }
    }
  },

  created() {
    const menu_data = api.menu_data
    // console.log('created. menu_data , ', menu_data)

    this.menus = [...(menu_data.children || [])]

    // (session_info.user_companies || {}).allowed_companies ||   []
    const { user_companies = {} } = api.session_info || {}
    const { allowed_companies = [], current_company = [0, ''] } = user_companies
    console.log(user_companies)

    this.allowed_companies = allowed_companies
    this.current_company = current_company[0]
  },

  methods: {
    img_url(web_icon) {
      const base_api = process.env.VUE_APP_BASE_API
      const url = web_icon.split(',').join('/')
      return `${base_api}/${url}`
    },

    async onLogout() {
      //   this.$router.push({ path: '/user/login' })

      console.log('xxxxx')

      await api.logout()
      this.$router.replace({ path: '/user/login' })
    },

    selectMenu(e) {
      // console.log('selectMenu.  , ', e, e.key)
      const name = e.key
      // if (this.currentMenu === name) {
      //   return
      // }
      this.currentMenu = name
      if (name === 'home') {
        this.$router.push({ path: HOME_PATH })
      } else if (name === 'test') {
        this.$router.push({ path: '/test' })
      } else {
        // name 为 action_ref
        // path 为 /web/action_ref/list
        const keyPath = e.keyPath
        // console.log('menu,id,', keyPath, this.menus)

        const menu = keyPath.reverse().reduce(
          (acc, cur) => {
            const child = acc.children.find(item => item.id === cur)
            return child || { children: [] }
          },
          { children: this.menus }
        )
        // console.log('menu,id,', keyPath, menu)
        // const [action_model, action_id] = menu.action.split(',')
        // if (action_model === 'ir.actions.act_window') {
        // }

        const action_id = menu.action.split(',')[1]
        this.$router.push({ path: '/web', query: { action: action_id } })
      }
    }
  }
}
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
