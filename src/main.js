import Vue from 'vue'
import router from './router'

import App from './App.vue'

import 'font-awesome/css/font-awesome.min.css'
import './assets/index.less'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import api from './odooapi'
api.Action.init_xml({
  base: ['res.partner1'],
  contacts: ['res.partner'],
  sale: ['sale']
})

import rpc from './odoorpc'

const baseURL = process.env.VUE_APP_BASE_API
const timeout = 50000

rpc.init({ baseURL, timeout })

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router, // router
  render: h => h(App)
}).$mount('#app')
