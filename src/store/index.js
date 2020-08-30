import Vue from 'vue'
import Vuex from 'vuex'

// import createPersistedState from 'vuex-persistedstate'

import getters from './getters'

import api from '@/api'
import moduleCreator from './moduleCreator'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// 这里导入的是 在 @/store/modules 中 明文定义的 moduels
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// console.log('store , modules', modules)

// 这里导入的是 在 @/api/addons 中 明文定义的 model 转化为 modules
// 转化规则, 原有的 res.partner 格式 自动转化为 resPartner
// 因此 需要注意, 在 @/store/modules 定义的 modules,
// 若名称是 resPartner , 则将覆盖 自动导入的 modules
const addons_modules = Object.keys(api.addons).reduce((acc, cur) => {
  //
  const moduleName = cur
    .replace(/(\.|^)[a-z]/g, (L) => L.toUpperCase())
    .replace(/\./g, '')
    .replace(/( |^)[A-Z]/g, (L) => L.toLowerCase())

  const Model = api.env(cur)

  // console.log('Model,cur', cur, Model)

  const config = {
    model: cur,
    ...Model.metadata
    // cur 是 模型名, 需要将配置文件加进去
  }
  acc[moduleName] = moduleCreator(config)

  return acc
}, {})

console.log('store , addons_modules', addons_modules)

const store = new Vuex.Store({
  // addons_modules 中是 自动生成的 模块
  // modules 中是 明文定义的 模块
  // 故而用后者 覆盖前者
  modules: { ...addons_modules, ...modules },
  getters

  // 永久存储, 刷新 不丢失
  //   plugins: [createPersistedState({
  //     paths: ['user']
  //   })]
})

// 2019-11-17 By Master Zhang
// console.log('store', modules, store)
// store 提供了 统一的状态数据
// 在任何页面中通过 this.$store.state 访问 状态

export default store
