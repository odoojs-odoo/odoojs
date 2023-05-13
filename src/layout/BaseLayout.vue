<template>
  <a-layout id="layoutMain">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      id="layoutSider"
    >
      <div id="logoPic">
        <img
          v-if="!collapsed"
          src="../assets/logo.png"
          alt="logo"
          width="70"
          height="70"
        />
        <img
          v-else
          src="../assets/logo.png"
          alt="miniLogo"
          width="40"
          height="70"
        />
      </div>
      <a-menu
        id="menuCompnt"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        @click="onMenuClick"
        @openChange="onOpenChange"
        mode="inline"
      >
        <a-menu-item key="home">
          <HomeTwoTone />
          <span>首页</span>
        </a-menu-item>
        <!-- <a-menu-item key="error">
          <span>error</span>
        </a-menu-item> -->

        <SubMenu :menu-data="menus_tree" :collapsed="collapsed" />
      </a-menu>
    </a-layout-sider>
    <a-layout id="layoutSiderRight">
      <a-layout-header id="layoutHeader">
        <MenuUnfoldOutlined
          class="triggerIcon"
          v-if="collapsed"
          @click="onMenuCollapsed"
        />
        <MenuFoldOutlined class="triggerIcon" v-else @click="onMenuCollapsed" />
        <div
          style="
            color: white;
            display: inline-block;
            font-size: x-large;
            font-weight: bold;
          "
        >
          {{ mainTitle.project }} {{ [lang] }}
        </div>
        <!-- 下拉 -->
        <Lang class="langSelect" :logoName="logoName" />
        <!-- 用户信息 -->
        <a-dropdown>
          <a class="userInfo" @click.prevent>
            {{ session_info.name || 'to login' }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu @click="onUserMenuClick">
              <a-menu-item key="user">
                <span>
                  <span style="font-weight: bolder">用户:</span>
                  {{ session_info.name || 'username' }}
                </span>
              </a-menu-item>
              <a-menu-item key="company">
                <span>
                  <span style="font-weight: bolder">公司:</span>
                  {{ session_info.user_companies.allowed_companies['1'].name }}
                </span>
              </a-menu-item>
              <a-menu-item key="logout" style="text-align: center">
                <a
                  href="javascript:;"
                  @click="onLogout"
                  style="font-weight: bolder"
                >
                  {{ session_info.uid ? '退 出' : '登 录' }}
                </a>
              </a-menu-item>

              <!-- <a-sub-menu key="company select" title="公司选择" >//@titleClick="onTitleClick"
                <a-menu-item key="comp1">公司1</a-menu-item>
                <a-menu-item key="comp2">公司2</a-menu-item>
              </a-sub-menu> -->
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content id="layoutContent">
        <a-tabs
          v-model:activeKey="activeKey"
          type="editable-card"
          hideAdd
          @edit="onTabsEdit"
          @change="onTabsChange"
          size="small"
        >
          <a-tab-pane
            v-for="pane in panes"
            :key="pane.key"
            :tab="pane.title"
            :closable="pane.closable"
          >
          </a-tab-pane>
        </a-tabs>
        <router-view />
      </a-layout-content>
      <a-layout-footer id="layoutFooter">
        {{ mainTitle.project }} {{ mainTitle.copyright }}
        {{ mainTitle.supplier }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Lang from '@/components/LangMenu.vue'
import SubMenu from './SubMenu'

import { useGlobalConfig } from '@/components/useApi/useGlobalConfig'
import { useMenuController } from '@/layout/useMenuController'
import { usePanesController } from '@/layout/useMenuController'

import api from '@/odoorpc'

const router = useRouter()

// global config
const useDataConfig = useGlobalConfig()
const { lang, mainTitle, session_info } = useDataConfig
let logoName = 'lang_white.png'

// menu collapsed controlle
const collapsed = ref(false)
function onMenuCollapsed() {
  collapsed.value = !collapsed.value
}
// menu controlle
const useDataMenu = useMenuController({ router })
const { selectedKeys, openKeys, menus_tree } = useDataMenu
const { onMenuSelect, onOpenChange, setMenuByInit } = useDataMenu

// panes controlle
const useDataPanes = usePanesController()
const { panes, activeKey, setPanesByMenu, removePane } = useDataPanes

// reload page. init menu and panes
onMounted(() => {
  const name = router.currentRoute.value.query.menu
  if (name) {
    const menu = setMenuByInit(name)
    setPanesByMenu(name, menu)
  }
})

// menu click
function onMenuClick(e) {
  const menu = onMenuSelect(e.key)
  if (menu) {
    setPanesByMenu(e.key, menu)
  }
}

// panes change
function onTabsEdit(targetKey, action) {
  if (action === 'remove') {
    const lastkey = removePane(targetKey)
    if (lastkey) {
      onMenuSelect(lastkey)
    }
  }
}

const onTabsChange = targetKey => {
  onMenuSelect(targetKey)
}

// user info downdrop

function onUserMenuClick(e) {
  console.log('==== onUserMenuClick =====', e)
}

// logout
async function onLogout() {
  await api.web.logout()
  router.replace({ path: '/user/login' })
}
</script>

<style scoped>
#logoPic {
  width: 100%;
  height: 70px;
  display: flex;
  /* Chrome、Safari */
  display: -webkit-flex;
  /* IE */
  display: -ms-flex;
  /* fireFox */
  display: -moz-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#menuCompnt {
  /* flex: 1; */
  height: 90vh;
  overflow-y: auto;
}
.triggerIcon {
  width: 40px;
}
:deep(.langSelect) {
  margin-left: auto;
  margin-right: 10px;
}
.userInfo {
  float: right;
  margin-right: 10px;
  color: white;
}
#layoutMain {
  height: 100vh;
  min-height: 100%;
  width: 100%;
  /* min-width: 1000px; */
}
#layoutSider {
  background: white;
  padding: 0;
  display: flex;
  /* Chrome、Safari */
  display: -webkit-flex;
  /* IE */
  display: -ms-flex;
  /* fireFox */
  display: -moz-flex;
  flex-direction: column;
}
#layoutSiderRight {
  display: flex;
  /* Chrome、Safari */
  display: -webkit-flex;
  /* IE */
  display: -ms-flex;
  /* fireFox */
  display: -moz-flex;
  flex-direction: column;
}
#layoutHeader {
  display: flex;
  /* Chrome、Safari */
  display: -webkit-flex;
  /* IE */
  display: -ms-flex;
  /* fireFox */
  display: -moz-flex;
  align-items: center;
  padding: 0;
  background-color: #1c86ee;
  height: 70px;
  line-height: 70px;
}
#layoutContent {
  padding: 10px 10px;
  flex: 1;
  overflow: auto;
}
#layoutFooter {
  height: 30px;
  line-height: 30px;
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
  padding: 0 8px !important;
}
:deep(.ant-tabs-tab-remove) {
  margin-left: 0px !important;
  padding: 2px 6px 1px !important;
}
:deep(.ant-tabs-tab div) {
  height: 30px !important;
  line-height: 30px !important;
  /* background: red; */
}
:deep(.ant-tabs-nav-container) {
  height: 30px !important;
}
</style>
