import { inject, ref, computed, toRaw } from 'vue'
import api from '@/odoorpc'

import { menus_tree_get, menus_data_get } from '@/config/menu'

export function useMenuController({ router }) {
  const lang = inject('lang')

  const selectedKeys = ref([])
  const openKeys = ref([])

  // 将语言 用在计算函数中, 使语言变化 重新读取菜单
  // 实际上 接口函数中 会自行获取语言
  const menus_tree = computed(() => menus_tree_get(lang.value))
  const menus_data = computed(() => menus_data_get(lang.value))

  const HOME_PATH = '/'

  const no_web_menus = {
    home: { name: '首页' },
    error: { name: 'Error' }
  }

  function setMenuByInit(name) {
    if (name) {
      selectedKeys.value = [name]
      const menu = menus_data.value[name]
      return menu
    }
  }

  function onMenuSelect(menu) {
    const currentRoute = router.currentRoute.value
    // console.log(menu, currentRoute)

    if (menu in no_web_menus) {
      if (currentRoute.name === menu) {
        return
      }
      const path = `${HOME_PATH}${menu}`
      router.push({ path, query: { menu } })
      return no_web_menus[menu]
    }

    return webMenuSelect(menu)
  }

  function webMenuSelect(name) {
    const menu = menus_data.value[name]
    // console.log(name, menu, menus_data.value)
    if (menu.router) {
      return routerMenuSelect(menu)
    } else {
      return actionMenuSelect(menu)
    }
  }

  function routerMenuSelect(menu) {
    // console.log(menu, menus_data.value)
    const { path, action } = menu
    router.push({ path, query: { action } })
  }

  function actionMenuSelect(menu) {
    const action_id = menu.action
    // console.log('action_id', action_id)
    const action = api.env.action_info_get(action_id)
    // console.log('action_id2', action)

    if (!action) {
      return
    }

    const is_action_new =
      action.type === 'ir.actions.act_window' && action.target === 'new'

    if (is_action_new) {
      return
    }

    const currentRoute = router.currentRoute.value
    const routeVal = currentRoute
    // console.log(action)
    const view_type = action.view_type || 'tree'
    const xml_id = action.xml_id
    const path = ['', 'web', ...xml_id.split('.')].join('/')
    const query = { view_type, menu: menu.xml_id }

    const is_me =
      routeVal.path === path &&
      routeVal.query.view_type === query.view_type &&
      routeVal.query.menu === query.menu &&
      Object.keys(routeVal.query).sort().toString() ==
        Object.keys(query).sort().toString()

    if (is_me) {
      return
    }

    router.push({ path, query })

    return menu
  }

  //左侧菜单只显示一个打开的
  // eslint-disable-next-line no-unused-vars
  function onOpenChange(openKeys) {
    // console.log('openKeys', openKeys)
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

  return {
    lang,
    selectedKeys,
    openKeys,
    menus_tree,
    setMenuByInit,
    onMenuSelect,
    onOpenChange
  }
}

export function usePanesController() {
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
