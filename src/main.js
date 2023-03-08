import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as antIcons from '@ant-design/icons-vue'

import rpc from './odoorpc'

import { baseURL, timeout, messageError } from './config/config'

import { addons_list, web_fields_list, web_models_list } from './config/config'

rpc.init({
  baseURL,
  timeout,
  messageError,
  addons_list,
  web_fields_list,
  web_models_list
})

const app = createApp(App)

// 注册组件
Object.keys(antIcons).forEach(key => {
  app.component(key, antIcons[key])
})
// 添加到全局
app.config.globalProperties.$antIcons = antIcons
app.use(Antd)

app.use(router)

app.mount('#app')

// createApp(App).mount('#app')
