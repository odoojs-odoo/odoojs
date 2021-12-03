import Vue from 'vue'
import router from './router'

import App from './App.vue'

import 'font-awesome/css/font-awesome.min.css'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router, // router
  render: h => h(App)
}).$mount('#app')
