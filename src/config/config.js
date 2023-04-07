import { message } from 'ant-design-vue'

export const baseURL = process.env.VUE_APP_BASE_API
export const timeout = 50000

export function messageError(error) {
  message.config({ top: document.body.clientHeight / 2 + 'px' })
  message.error(error.data.message)
}

const odoo_addons = require.context('@/odoorpc/addons', true, /\.js$/)
const fapiao_addons = require.context('@/addons_fapiao', true, /\.js$/)

// model 的合并 有先后顺序.
// 这里如果 有重名的  model 构成继承关系, 则必须 按照顺序. 后者覆盖前者
// todo. 考虑 用其他方法, 搞定继承关系. 从而这里不要求顺序
// actions 和 fields 的处理 无先后顺序

export const addons_dict = { odoo_addons, fapiao_addons }
