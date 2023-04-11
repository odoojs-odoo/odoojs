import { inject, computed } from 'vue'
import api from '@/odoorpc'

import { menus_tree_get, menus_data_get } from '@/config/menu'

export function useGlobalConfig() {
  const lang = inject('lang')

  // 页面刷新时, 首次进入 . 初始化语言
  // 页面跳转时, 不加载菜单.
  lang.value = api.env.lang

  function check_lang() {
    return lang.value
  }

  const global_config = computed(() => {
    check_lang()
    return api.global_config
  })

  const mainTitle = computed(() => {
    return global_config.value.main
  })

  const viewActions = computed(() => {
    return global_config.value.view.actions
  })

  // 将语言 用在计算函数中, 使语言变化 重新读取菜单
  // 实际上 接口函数中 会自行获取语言
  const menus_tree = computed(() => menus_tree_get(lang.value))
  const menus_data = computed(() => menus_data_get(lang.value))

  return { lang, global_config, viewActions, mainTitle, menus_tree, menus_data }
}
