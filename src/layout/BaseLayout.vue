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
        <!-- <a-menu-item key="home">
          <HomeTwoTone />
          <span>首页</span>
        </a-menu-item> -->
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
          @edit="onEdit"
          @change="onChangeTabs"
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

<script>
import { menus_tree_get, menus_data_get } from '@/config/menu'

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeTwoTone,
  DownOutlined
} from '@ant-design/icons-vue'

import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  onMounted,
  toRaw
} from 'vue'
import { useRouter } from 'vue-router'
import Lang from '@/components/Lang.vue'
import SubMenu from './SubMenu'
import api from '@/odoorpc'

export default defineComponent({
  name: 'BaseLayout',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeTwoTone,
    DownOutlined,
    SubMenu,
    Lang
  },
  setup() {
    const router = useRouter()

    const menus_tree = computed(() => menus_tree_get())
    const menus_data = computed(() => menus_data_get())

    const global_config = computed(() => api.global_config)

    console.log(global_config)

    // console.log('menus_tree, ', menus_tree)
    const session_info = computed(() => {
      return api.web.session.session_info || {}
    })
    const panes = ref([{ title: '首页', key: 'home', closable: false }])
    const state = reactive({
      collapsed: false,
      menus_tree,
      menus_data,
      selectedKeys: [''],
      openKeys: [''],
      session_info
    })
    onMounted(() => {
      //
      const currentK = sessionStorage.getItem('currentMenuK')
      state.selectedKeys = [currentK]
      // console.log('===== sessionStorage currentMenuK =====',[currentK], state.selectedKeys);
      // console.log('===== openKeys =====',state.openKeys);
      const openK = sessionStorage.getItem('menuOpenKey')
      state.openKeys = [openK]
      //
      const name = router.currentRoute.value.query.menu
      console.log(
        '------=  currentRoute  =------',
        router.currentRoute.value,
        name
      )

      if (name) {
        const menu = menus_data.value[name]
        // console.log('------=  menu  =------', menu, '===', menus_data)
        const rawPanes = toRaw(panes.value)
        // console.log('------=  panes.value  =------',rawPanes)

        const old = rawPanes.find(item => item.key === name)
        // console.log('------=  old panes  =------',old);
        if (old == undefined) {
          // console.log('-=-==-=-=---- old == undefined');
          // panes.value = [...panes, { title: menu.name, key: name }]
          const newItem = { title: menu.name, key: name }
          panes.value.push(newItem)
          // console.log('------= new panes.value  =------',panes.value);
        }
        activeKey.value = name
      }
    })
    function onMenuClick(e) {
      // console.log('----- click -----', e)
      handleMenuClick({ state, router }, e.key)
    }
    //左侧菜单只显示一个打开的
    function onOpenChange(openKeys) {
      // const menus = menus_data.value || {}
      // console.log('==== menus =====', menus)
      //
      // console.log('==== openKeys =====', openKeys)
      // if (openKeys.length !== 0) {
      //   state.openKeys = [openKeys[1]]
      //   // console.log('==== openKeys !=0 =====', toRaw(state.openKeys))
      // } else {
      //   state.openKeys = ['']
      //   // console.log('==== openKeys =0 =====', toRaw(state.openKeys))
      // }
      // sessionStorage.setItem('menuOpenKey', state.openKeys)
    }
    function onMenuCollaosed() {
      // console.log('---- onMenuCollaosed -----',state.collapsed);
      state.collapsed = !state.collapsed
    }
    function onUserMenuClick(e) {
      console.log('==== onMenuClick =====', e)
    }
    async function onLogout() {
      // console.log('xxxxx, logout')
      await api.web.logout()
      this.$router.replace({ path: '/user/login' })
    }
    //
    const activeKey = ref(panes.value[0].key)

    const onEdit = (targetKey, action) => {
      console.log('===== edit ------', targetKey, action)

      if (action === 'remove') {
        const index = panes.value.findIndex(item => item.key === targetKey)
        if (index > 0) {
          const last = index - 1
          const lastkey = panes.value[last].key
          console.log('==== panes.value ====', panes.value)
          panes.value = panes.value.filter(item => item.key != targetKey)
          console.log('----- panes.value remove-----', panes.value)
          if (activeKey.value === targetKey) {
            handleMenuClick({ state, router }, lastkey)
          }
        }
      }
    }
    //.

    const onChangeTabs = targetKey => {
      console.log('------ changet tabs ----', targetKey)

      handleMenuClick({ state, router }, targetKey)
    }
    //

    const HOME_PATH = '/'

    function handleMenuClick({ state, router }, name) {
      // console.log(menus_tree_get(), menus_data_get())
      // console.log('------ router ----', router)

      const currentRoute = router.currentRoute

      const no_web_menus = ['home', 'error']

      if (no_web_menus.includes(name)) {
        if (currentRoute.value.name === name) {
          return
        }
        const path = `${HOME_PATH}${name}`
        router.push({ path, query: { menu: name } })
        return
      }

      // console.log('----- click web ------', name, state.menus_data)
      const menu = menus_data.value[name] || {}
      // console.log('---- layout menu ---', menu, [menu.id])
      state.selectedKeys = [menu.id]
      sessionStorage.setItem('currentMenuK', state.selectedKeys)
      // console.log(
      //   '===== sessionStorage setItem currentMenuK =====',
      //   state.selectedKeys,
      //   '=-=-=',
      //   sessionStorage.getItem('currentMenuK')
      // )
      //
      const menu_type = menu.type

      if (menu_type === 'no-action') {
        console.log('click no-action', name)
        // const action = menu.action
        // const path = ['', ...action.split('.')].join('/')
        // const query = { menu: name }
        // this.$router.push({ path, query })

        return
      }

      const action_id = menu.action || name
      // console.log('----- layout index action_id =====', action_id)

      const action = api.env.action_info_get(action_id)
      // console.log('-------- action ---------', action)

      if (!action) {
        // console.log('-------no- action ---------', action_id)
        return
      }

      const is_action_new =
        action.type === 'ir.actions.act_window' && action.target === 'new'

      if (is_action_new) {
        // console.log('----click window new ------', action_id)
        return
      }

      const xml_id = action.xml_id
      // console.log('-------- xml_id -------', xml_id)
      const path = ['', 'web', ...xml_id.split('.')].join('/')
      // console.log('-------- path ---------', path)

      const query = { view_type: 'tree', menu: name }

      const routeVal = currentRoute.value
      // console.log('----routeVal ------', routeVal)

      const is_me =
        routeVal.path === path &&
        routeVal.query.view_type === query.view_type &&
        routeVal.query.menu === query.menu &&
        Object.keys(routeVal.query).sort().toString() ==
          Object.keys(query).sort().toString()

      if (is_me) {
        // console.log('----click me------', action_id)
        return
      }

      // console.log('----goto ------', path, query)
      router.push({ path, query })
      // console.log('=========== path =========', path, '====', query)

      // ====== tabs panes ======
      // const name = router.currentRoute.value.query.menu
      // console.log('------=  currentRoute  =------', name)

      // console.log('------=  menu  =------', menu, '===', menus_data)
      const rawPanes = toRaw(panes.value)
      // console.log('------=  panes.value  =------', rawPanes)

      const old = rawPanes.find(item => item.key === name)
      // console.log('------=  old panes  =------', old);
      if (old == undefined) {
        // console.log('-=-==-=-=---- old == undefined');
        // panes.value = [...panes, { title: menu.name, key: name }]
        const newItem = { title: menu.name, key: name }
        panes.value.push(newItem)
        // console.log('------= new panes.value  =------', panes.value);
      }
      activeKey.value = name
    }
    return {
      state,
      ...toRefs(state),
      panes,
      activeKey,
      mainTitle: global_config.value.main,
      onChangeTabs,
      onEdit,
      onMenuClick,
      onOpenChange,
      onMenuCollaosed,
      onUserMenuClick,
      onLogout
    }
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
