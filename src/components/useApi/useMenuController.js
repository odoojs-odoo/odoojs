import { inject, ref, computed } from 'vue'
import api from '@/odoorpc'

import { menus_tree_get, menus_data_get } from '@/config/menu'

export function useMenuController({ router }) {
  const lang = inject('lang')

  const selectedKeys = ref([])
  const openKeys = ref([])

  // 将语言 用在计算函数中, 使语言变化 重新读取菜单
  // 实际上 接口函数中 会自行获取语言
  //   const menus_tree = computed(() => menus_tree_get(lang.value))
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
    const action_id = menu.action || name
    const action = api.env.action_info_get(action_id)

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

    const xml_id = action.xml_id
    const path = ['', 'web', ...xml_id.split('.')].join('/')
    const query = { view_type: 'tree', menu: name }

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
    selectedKeys,
    openKeys,
    setMenuByInit,
    onMenuSelect,
    onOpenChange
  }
}
