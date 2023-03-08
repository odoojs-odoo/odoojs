<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <a-config-provider :locale="locale">
    <router-view />
    <!-- <TestAPI /> -->
  </a-config-provider>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TestAPI from '@/components/TestAPI.vue'

import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

export default {
  name: 'App',
  data() {
    return {
      locale: zhCN
    }
  },
  components: {
    // HelloWorld
    // TestAPI
  }
}
</script>

<style></style>
