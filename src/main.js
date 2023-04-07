import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as antIcons from '@ant-design/icons-vue'
import i18n from '@/i18n'

const app = createApp(App)

// 注册组件
Object.keys(antIcons).forEach(key => {
  app.component(key, antIcons[key])
})
// 添加到全局
app.config.globalProperties.$antIcons = antIcons
app.use(Antd)

app.use(router)

app.use(i18n)

app.mount('#app')

// createApp(App).mount('#app')
