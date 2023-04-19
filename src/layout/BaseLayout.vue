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
          @click="onMenuCollaosed"
        />
        <MenuFoldOutlined class="triggerIcon" v-else @click="onMenuCollaosed" />
        <div
          style="
            color: white;
            display: inline-block;
            font-size: x-large;
            font-weight: bold;
          "
        >
          {{ mainTitle.project }}
        </div>
        <!-- 下拉 -->
        <Lang class="langSelect" />
        <a-dropdown>
          <a class="userInfo" @click.prevent>
            {{ session_info.name }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu @click="onUserMenuClick">
              <a-menu-item key="user">
                <span>
                  <span style="font-weight: bolder">用户:</span>
                  {{ session_info.name }}
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
import { ref, onMounted, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import Lang from '@/components/LangMenu.vue'
import SubMenu from './SubMenu'
import api from '@/odoorpc'

import { useGlobalConfig } from '@/components/useApi/useGlobalConfig'
import { useMenuController } from '@/components/useApi/useMenuController'

function usePanesController() {
  const panes = ref([{ title: '首页', key: 'home', closable: false }])
  const activeKey = ref(panes.value[0].key)

  // call by menu click
  function setPanesByMenu(name, menu) {
    const rawPanes = toRaw(panes.value)
    const old = rawPanes.find(item => item.key === name)
    if (old == undefined) {
      const newItem = { title: menu.name, key: name }
      panes.value.push(newItem)
    }
    activeKey.value = name
  }

  function removePane(targetKey) {
    const index = panes.value.findIndex(item => item.key === targetKey)
    if (index > 0) {
      const last = index - 1
      const lastkey = panes.value[last].key
      panes.value = panes.value.filter(item => item.key != targetKey)
      if (activeKey.value === targetKey) {
        activeKey.value = lastkey
        return lastkey
      }
    }
  }

  return { panes, activeKey, setPanesByMenu, removePane }
}

const router = useRouter()

// global config
const useDataConfig = useGlobalConfig()
const { mainTitle, menus_tree, session_info } = useDataConfig

// menu collaosed controle
const collapsed = ref(false)
function onMenuCollaosed() {
  collapsed.value = !collapsed.value
}

const useDataMenu = useMenuController({ router })
const { selectedKeys, openKeys } = useDataMenu
const { onMenuSelect, onOpenChange, setMenuByInit } = useDataMenu

const useDataPanes = usePanesController()
const { panes, activeKey, setPanesByMenu, removePane } = useDataPanes

function onMenuClick(e) {
  const menu = onMenuSelect(e.key)
  if (menu) {
    setPanesByMenu(e.key, menu)
  }
}

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

function onUserMenuClick(e) {
  console.log('==== onUserMenuClick =====', e)
}

async function onLogout() {
  await api.web.logout()
  this.$router.replace({ path: '/user/login' })
}

onMounted(() => {
  const name = router.currentRoute.value.query.menu
  if (name) {
    const menu = setMenuByInit(name)
    setPanesByMenu(name, menu)
  }
})
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
