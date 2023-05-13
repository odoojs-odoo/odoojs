<template>
  <a-config-provider :locale="ant_langs[lang]">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { provide, ref, watch } from 'vue'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import en_US from 'ant-design-vue/es/locale/en_US'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import { lang_default } from '@/config/config'

const ant_langs = { zh_CN, en_US }

const api_lang = lang_default
const lang = ref(api_lang)
provide('lang', lang)

const dayjs_langs = { zh_CN: 'zh-cn', en_US: 'en' }

dayjs.locale(dayjs_langs[api_lang])
watch(lang, val => {
  dayjs.locale(dayjs_langs[val])
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
