import Vue from 'vue'
import router from './router'

import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import rpc from './odoorpc'

import { baseURL, timeout, addons_list } from './config/config'

rpc.init({ baseURL, timeout, addons_list })

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
