import { message } from 'ant-design-vue'

export const baseURL = process.env.VUE_APP_BASE_API
export const timeout = 50000

export function messageError(error) {
  message.config({
    top: document.body.clientHeight / 2 + 'px'
  })
  message.error(error.data.message)
}

const odoo_action = require.context('@/odoorpc/addons/action', true, /\.js$/)
const odoo_fields = require.context('@/odoorpc/addons/fields', true, /\.js$/)

const fapiao_action = require.context('@/addons_fapiao/action', true, /\.js$/)
const fapiao_fields = require.context('@/addons_fapiao/fields', true, /\.js$/)
const fapiao_models = require.context('@/addons_fapiao/model', true, /\.js$/)

export const addons_list = [odoo_action, fapiao_action]
export const web_fields_list = [fapiao_fields, odoo_fields]

// model 的合并 有先后顺序.
// 这里如果 有重名的  model 构成继承关系, 则必须 按照顺序. 后者覆盖前者
// todo. 考虑 用其他方法, 搞定继承关系. 从而这里不要求顺序
export const web_models_list = [fapiao_models]
