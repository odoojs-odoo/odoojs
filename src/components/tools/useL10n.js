import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export function useL10n() {
  const i18n = useI18n()

  const lang = computed(() => {
    const code = i18n.locale.value

    const langs = {
      zh: 'zh_CN',
      zh_CN: 'zh_CN', // 页面 的 提供两种 语言 之一
      zh_TW: 'zh_TW',
      zh_HK: 'zh_HK',
      en: 'en_US',
      en_US: 'en_US', // 页面 的 提供两种 语言 之一
      en_GB: 'en_GB'
    }

    const langCode = langs[code]

    return langCode
  })

  function _t(str) {
    if (typeof str === 'string') return str
    else {
      const str2 = str || {}

      const val = str2[lang.value]

      if (val) {
        return val
      }

      const langs = {
        zh: 'zh_CN',
        zh_CN: 'zh_CN',
        zh_TW: 'zh_CN',
        zh_HK: 'zh_CN',
        en: 'en_US',
        en_US: 'en_US',
        en_GB: 'en_US'
      }

      const lang_replace = langs[lang.value]

      return str2[lang_replace] || str2.en_US
    }
  }

  return { lang, _t }
}
