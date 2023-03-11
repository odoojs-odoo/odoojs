<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <a-config-provider :locale="currentLanguage === 'en' ? enUS : zhCN">
    <router-view />
    <!-- <TestAPI /> -->
  </a-config-provider>
</template>

<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TestAPI from '@/components/TestAPI.vue'

import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const i18n = useI18n()
const currentLanguage = computed(() => {
  if (i18n.locale.value === 'en') {
    return 'en'
  } else {
    return 'zh-cn'
  }
})

watch(currentLanguage, val => {
  dayjs.locale(val)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
