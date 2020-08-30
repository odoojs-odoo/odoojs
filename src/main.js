import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

import './permission' // permission control

// 初始化 就有这句
Vue.config.productionTip = false

new Vue({
  store, // store by vuex
  router, // router
  render: (h) => h(App)
}).$mount('#app')

/*

@/utils 定义通用函数
@/api 定义了 接口
@/store 定义了 数据层
@/mixins 定义了, 页面处理的基础函数
@/router 定义路由
@/layout 定义 页面架子


*/
