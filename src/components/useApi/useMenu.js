import { inject, computed } from 'vue'
import api from '@/odoorpc'
import { menus_tree_get, menus_data_get } from '@/config/menu'

export function useMenu() {
  const lang = inject('lang')

  // 页面刷新时, 首次进入 . 初始化语言
  // 页面跳转时, 不加载菜单.
  lang.value = api.env.lang

  // 将语言 用在计算函数中, 使语言变化 重新读取菜单
  // 实际上 接口函数中 会自行获取语言
  const menus_tree = computed(() => menus_tree_get(lang.value))
  const menus_data = computed(() => menus_data_get(lang.value))
  const global_config = computed(() => api.global_config)

  return { lang, menus_tree, menus_data, global_config }
}