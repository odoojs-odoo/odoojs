<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <a-config-provider :locale="ant_langs[lang]">
    <router-view />
    <!-- <TestAPI /> -->
  </a-config-provider>
</template>

<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TestAPI from '@/components/TestAPI.vue'

import { provide, ref, watch } from 'vue'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import en_US from 'ant-design-vue/es/locale/en_US'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import api from '@/odoorpc'

const ant_langs = { zh_CN, en_US }

const api_lang = api.env.lang
const lang = ref(api_lang)
console.log(lang)
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
