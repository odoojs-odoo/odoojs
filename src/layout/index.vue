<template>
  <div>
    <Layout>
      <Header class="layout-header-bar">
        <Row>
          <Col span="12"> <span>欢迎使用 odoojs</span></Col>
          <Col span="12">
            <span>
              <Dropdown @on-click="onClickUser">
                <a href="javascript:void(0)">
                  {{ session_info.name }}
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>姓名: {{ session_info.name }}</DropdownItem>
                  <DropdownItem>数据库: {{ session_info.db }}</DropdownItem>
                  <DropdownItem
                    >语言:
                    {{ (session_info.user_context || {}).lang }}</DropdownItem
                  >
                  <DropdownItem
                    >服务版本: {{ session_info.server_version }}</DropdownItem
                  >
                  <DropdownItem
                    >公司:
                    {{
                      ((session_info.user_companies || {}).current_company || [
                        null,
                        null
                      ])[1]
                    }}</DropdownItem
                  >
                  <DropdownItem
                    >多公司:
                    {{
                      (
                        (session_info.user_companies || {}).allowed_companies ||
                        []
                      )
                        .map(item => item[1])
                        .join(',')
                    }}</DropdownItem
                  >
                  <DropdownItem name="logout" divided>{{
                    session_info.uid ? '注销' : '登录'
                  }}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider hide-trigger class="layout-sider">
          <Menu width="auto" accordion @on-select="selectMenu">
            <span>
              <MenuItem name="home">
                <Icon type="ios-home" />
                <span>首页</span>
              </MenuItem>
            </span>
          </Menu>

          <Menu width="auto" accordion @on-select="selectMenu">
            <SubmenuItem
              v-for="submenu in menus"
              :key="submenu.name"
              :menu-data="submenu"
            />
          </Menu>
        </Sider>
        <Content>
          <router-view />
        </Content>
      </Layout>
      <Footer> odoowww@163.com </Footer>
    </Layout>
  </div>
</template>

<script>
import api from '@/api'
import { menus as local_menus } from './menu'

import SubmenuItem from './SubmenuItem'

const HOME_PATH = '/'

export default {
  name: 'Base',
  components: { SubmenuItem },
  mixins: [],
  data() {
    return {
      currentMenu: '',
      menus: []
    }
  },

  computed: {
    session_info() {
      return { ...api.session_info }
    }
  },

  async created() {
    // console.log('created.  , ', this.$route)
    const odoojs_menus = api.menu.menus
    // console.log('created. odoojs_menus , ', odoojs_menus)
    // console.log('created. local_menus , ', local_menus)
    this.menus = [...local_menus, ...odoojs_menus]

    // console.log(this.menus)
  },

  methods: {
    async onClickUser(name) {
      console.log('onClickUser.  , ', name)
      if (name === 'logout') {
        await api.logout()
        this.$router.replace({ path: '/user/login' })
      }
    },

    selectMenu(name) {
      // console.log('selectMenu.  , ', this.currentMenu, name)

      // if (this.currentMenu === name) {
      //   return
      // }

      // this.currentMenu = name

      if (name === 'home') {
        this.$router.push({ path: HOME_PATH })
      } else {
        // name 为 action_ref
        // path 为 /web/action_ref/list
        const path = `/web/${name}/list`
        this.$router.push({ path })
      }
    }
  }
}
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-width: 1200px;
}

.layout-header-bar {
  height: 10vh;
  color: #fff;
  background: blue;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.layout-sider {
  height: 82vh;
  background: #fff;
  background: #2d8cf0;
}
</style>
