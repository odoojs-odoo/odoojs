import { inject, computed } from 'vue'
import api from '@/odoorpc'

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

  const session_info = computed(() => {
    return api.web.session.session_info || {}
  })

  return {
    lang,
    global_config,
    viewActions,
    mainTitle,
    session_info
  }
}
