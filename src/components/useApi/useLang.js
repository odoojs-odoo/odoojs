import { inject, computed } from 'vue'
import api from '@/odoorpc'

export function useLang() {
  const lang = inject('lang')

  const currentLanguage = computed(() => {
    return lang.value || api.env.lang
  })

  async function onchange(val) {
    // 登录页面, 设置语言, 无法更新session
    // 需要直接设置 页面全局变量 lang
    const res = await api.env.set_lang(val)
    lang.value = res ? api.env.lang : val
  }

  return { lang, currentLanguage, onchange }
}
