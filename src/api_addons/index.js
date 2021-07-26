const AddonsFiles = require.context('./addons', true, /\.js$/)
const AddonsModels = AddonsFiles.keys().reduce((models, modulePath) => {
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = AddonsFiles(modulePath)
  models = { ...models, ...value.default }
  return models
}, {})

const addons = { ...AddonsModels }

// 这里保留 利用 event 模型做的 预约处理
// 同时也做为一个例子, 示例 如何扩展模型


// 以下为 如何引用 odoorpc 及 odoojs
// ODOORPC 是 odoo 的基础接口
// ODOOJS 是 odoo 扩展接口
// ODOORPC 可以单独使用
// ODOOJS 必须依赖 ODOORPC才能使用


import { ODOO as ODOORPC } from '@/odoorpc'
import { ODOO as ODOOJS } from '@/odoojs'

// const baseURL = 'http://192.168.56.103:8069'
// const baseURL = 'http://192.168.56.103/odoo'
const baseURL = process.env.VUE_APP_BASE_API
const menuLoad = process.env.VUE_APP_MENU_LOAD

export const api = new ODOOJS({ baseURL, menuLoad, ODOORPC, addons })
export const ODOO = ODOOJS

export default api
