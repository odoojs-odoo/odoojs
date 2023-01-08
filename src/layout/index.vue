<template>
  <div>
    <a-layout
      style="height: 100vh; min-height: 100%; width: 100%; min-width: 1000px"
    >
      <a-layout-sider
        v-model="collapsed"
        :trigger="null"
        collapsible
        style="background: white; padding: 0"
      >
        <div id="logoPic">
          <img
            v-if="!collapsed"
            src="../assets/logo.png"
            alt="logo"
            width="70%"
            height="30px"
          />
          <img
            v-else
            src="../assets/miniLogo.png"
            alt="miniLogo"
            width="40%"
            height="30px"
          />
        </div>
        <div style="height: 92vh; overflow-y: auto">
          <a-menu
            theme="light"
            mode="inline"
            :default-selected-keys="['home']"
            @click="selectMenu"
          >
            <a-menu-item key="home">
              <a-icon type="home" theme="twoTone" />
              <span>首页</span>
            </a-menu-item>

            <!-- <a-menu-item key="test">
              <a-icon type="video-camera" />
              <span>Test</span>
            </a-menu-item> -->

            <template v-for="item in menus_tree">
              <template v-if="is_sub_menu(item)">
                <sub-menu
                  :key="item.id"
                  :menu-data="item"
                  :collapsed="collapsed"
                />
              </template>

              <template v-else>
                <a-menu-item :key="item.id">
                  <a-icon
                    v-if="item.icon"
                    :type="item.icon"
                    :theme="item.theme"
                  />
                  <span> {{ item.name }} </span>
                </a-menu-item>
              </template>
            </template>
          </a-menu>
        </div>
      </a-layout-sider>

      <a-layout>
        <a-layout-header
          style="
            position: relative;
            padding: 0;
            background-color: #1c86ee;
            height: 70px;
            line-height: 70px;
          "
        >
          <a-icon
            class="triggerIcon"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />

          <div
            style="
              color: white;
              display: inline-block;
              font-size: x-large;
              font-weight: bold;
            "
          >
            {{ app_title }}
          </div>

          <a-dropdown>
            <a class="userInfo" @click="e => e.preventDefault()">
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
                <a href="javascript:;" @click="onLogout">
                  {{ session_info.uid ? '退出' : '登录' }}
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

          <CompanySelect class="companySelect" />
        </a-layout-header>

        <a-layout-content
          style="padding: 10px 10px; height: 87vh; overflow: auto"
        >
          <!-- :style="{
            margin: '10px 8px',
            padding: '10px',
            background: '#fff',
            minHeight: '280px'
          }" -->

          <!-- <div class="breadcrumbs"></div> -->

          <a-tabs
            v-model="activeKey"
            type="editable-card"
            hideAdd
            @edit="onEdit"
            @change="onChangeTabs"
            size="small"
            style="height: 38px"
          >
            <a-tab-pane
              v-for="pane in panes"
              :key="pane.key"
              :tab="pane.title"
              :closable="pane.closable"
            >
            </a-tab-pane>
          </a-tabs>

          <!-- <router-view style="margin-left: 5px; margin-right: 5px" /> -->

          <router-view @change-menu="handleChangeMenu" />
        </a-layout-content>
        <a-layout-footer id="footer" style="text-align: center">
          {{ app_footer }}
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import api from '@/odoorpc'

import { menus_tree_get, menus_list_get } from '@/config/config'
import { app_title, app_footer } from '@/config/config'

import SubMenu from './SubMenu'
import CompanySelect from './CompanySelect.vue'

const HOME_PATH = '/'

export default {
  name: 'Base',
  components: { SubMenu, CompanySelect },
  mixins: [],
  data() {
    return {
      app_title,
      app_footer,

      collapsed: false,

      activeKey: 'home',
      panes: [{ title: '首页', key: 'home', closable: false }]
    }
  },

  computed: {
    session_info() {
      return api.web.session.session_info || {}
    },

    menus_list() {
      return menus_list_get()
    },

    menus_tree() {
      return menus_tree_get()
    }
  },

  created() {},

  mounted() {
    // console.log('layout mounted', this.$route.fullPath)

    const name = this.$route.query.menu

    if (name) {
      const menu = this.menus_list[name]
      const old = this.panes.find(item => item.key === name)
      if (!old) {
        this.panes = [...this.panes, { title: menu.name, key: name }]
      }
      this.activeKey = name
    }
  },

  methods: {
    is_sub_menu: menu => {
      const is_sub_menu =
        menu.children && Array.isArray(menu.children) && menu.children.length

      return is_sub_menu || !menu.action
    },

    async onLogout() {
      // console.log('xxxxx, logout')
      await api.web.logout()
      this.$router.replace({ path: '/user/login' })
    },

    selectMenu(e) {
      // console.log('---- layout selectMenu. ==== ', e, e.key, typeof e.key)
      const name = e.key

      this.clickMenu(name)
    },

    clickMenu(name, activeIds) {
      // if (this.currentMenu === name) {
      //   return
      // }

      if (name === 'home') {
        this.$router.push({ path: HOME_PATH, query: { menu: name } })
        // } else if (name === 'test') {
        //   this.$router.push({ path: '/test', query: { menu: name } })
      } else {
        // console.log('----- menus_list ------', this.menus_list)
        // console.log('----- layout name ------', name)

        const menu_get = () => {
          return this.menus_list[name] || {}
        }

        const menu = menu_get()
        // console.log('---- layout menu ---', menu)

        const menu_type = menu.type
        // console.log('---- layout menu_type ---', menu_type)

        if (menu_type === 'no-action') {
          const action = menu.action
          const path = ['', ...action.split('.')].join('/')
          const query = { menu: name }
          this.$router.push({ path, query })
        } else {
          const action_id_get = () => {
            return menu.action
          }

          const action_id = action_id_get() || name
          // console.log('----- layout index action_id =====', action_id)
          const action_get = () => {
            const action = api.env.action_info_get(action_id)
            return action
            // try {
            //   const action = api.env.action_info_get(action_id)
            //   //
            //   return action
            // } catch {
            //   console.log('action_id is error: ', name, action_id)
            //   return undefined
            // }
          }

          const action = action_get()

          if (!action) {
            const path = '/error'
            const query = { action: action_id, menu: name }
            this.$router.push({ path, query })
            return
          } else {
            const xml_id = action.xml_id
            const path = ['', 'web', ...xml_id.split('.')].join('/')

            if (
              action.type === 'ir.actions.act_window' &&
              action.target === 'new'
            ) {
              // console.log('new')
              // this.showWizard = true
              return
            } else {
              const query = { view_type: 'tree', menu: name }

              if (activeIds) {
                query.activeIds = activeIds
              }
              // console.log('===============path & query=====================')
              // console.log('this -->', this.$route.query)
              // console.log(path, '--', query)
              // console.log('===========', this.$route.name, '===', path)
              // console.log(
              //   '===========',
              //   Object.keys(this.$route.query) === Object.keys(query)
              // )

              if (
                this.$route.name === path &&
                this.$route.query.view_type === query.view_type &&
                this.$route.query.menu === query.menu &&
                Object.keys(this.$route.query).sort().toString() ==
                  Object.keys(query).sort().toString()
              ) {
                return
              } else {
                this.$router.push({ path, query })
              }
            }
          }
        }
      }

      // console.log('11')

      // sleep(100)
      // console.log('22')
      // sleep(100)
      // console.log('33')
      // sleep(100)
      // console.log('44')

      const menu = this.menus_list[name]
      const old = this.panes.find(item => item.key === name)
      if (!old) {
        this.panes = [...this.panes, { title: menu.name, key: name }]
      }

      this.activeKey = name
    },

    onChangeTabs(targetKey) {
      console.log('change', targetKey)
      this.clickMenu(targetKey)
    },

    // onTabClick(...ppp) {
    //   // console.log('tabClick', ppp)
    // },

    // onChangeTabs(...ppp) {
    //   console.log('change', ppp)
    // },

    onEdit(targetKey, action) {
      console.log('edit', targetKey, action)

      if (action === 'remove') {
        const index = this.panes.findIndex(item => item.key === targetKey)
        if (index > 0) {
          const last = index - 1
          const lastkey = this.panes[last].key
          this.panes = this.panes.filter(item => item.key !== targetKey)
          if (this.activeKey === targetKey) {
            this.clickMenu(lastkey)
          }
        }
      }
    },

    handleChangeMenu(menuName, activeIds) {
      // console.log(ss)
      this.clickMenu(menuName, activeIds)
    }
  }
}
</script>

<style scoped>
#logoPic {
  width: 100%;
  height: 8vh;
  text-align: center;
  padding-top: 20px;
}
.triggerIcon {
  width: 40px;
  position: relative;
  top: -5px;
}
.companySelect {
  /* float: right;
  margin-right: 10px;
  margin-top: 20px; */
  /* background-color: white; */
  border-width: 0px;
}
:deep(.companySelect .ant-select-selection) {
  /* color: red;   */
  border-width: 0px;
  border-radius: 0;
}
.userInfo {
  float: right;
  margin-right: 10px;
  color: white;
}
#footer {
  height: 5vh;
  line-height: 5vh;
  padding: 0px;
  text-align: center;
  font-size: 10px;
  font-weight: bolder;
  background-color: #1c86ee;
  color: white;
}
:deep(.ant-tabs-tab) {
  /* background-color: blue !important; */
  height: 30px !important;
}
:deep(.ant-tabs-tab div) {
  height: 30px !important;
  line-height: 30px !important;
}
:deep(.ant-tabs-nav-container) {
  height: 30px !important;
}
</style>
