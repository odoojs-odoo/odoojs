/*
 * @Author: Nxf
 * @Date: 2023-03-08 16:28:56
 * @LastEditors: Nxf
 * @LastEditTime: 2023-03-08 16:29:00
 * @Descripttion:
 */

import { createI18n } from 'vue-i18n'
import EN from './en'
import ZH from './zh'
const messages = {
  en: {
    ...EN
  },
  zh: {
    ...ZH
  }
}

const getCurrentLanguage = () => {
  const windowlang = navigator.language // zh-CN 当前浏览器语言
  const windowLangCode =
    windowlang.toLowerCase().indexOf('zh') !== -1 ? 'zh' : 'en'
  const localCode = localStorage.getItem('i18nLang')
  const langCode = localCode ? localCode : windowLangCode
  console.log('=== currentlang ===', windowlang, windowLangCode)
  return langCode

  // return localStorage.getItem('i18nLang')
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCurrentLanguage() || 'zh',
  messages: messages
})

export default i18n
