import { message } from 'ant-design-vue'

export const baseURL = process.env.VUE_APP_BASE_API
export const timeout = 50000

export function messageError(error) {
  message.config({ top: document.body.clientHeight / 2 + 'px' })
  message.error(error.data.message)
}

// model 的合并 有先后顺序.
// 这里如果 有重名的  model 构成继承关系, 则必须 按照顺序. 后者覆盖前者
// todo. 考虑 用其他方法, 搞定继承关系. 从而这里不要求顺序
// actions 和 fields 的处理 无先后顺序
// odoo_addons 必须提供? todo check why

const odoo_addons = require.context('@/addons_odoo', true, /\.js$/)
const fapiao_addons = require.context('@/addons_fapiao', true, /\.js$/)
const dict_addons_for_model = { odoo_addons, fapiao_addons }

const minierp_addons = require.context('@/addons_minierp', true, /\.js$/)
const odoodemo_addons = require.context('@/addons_global', true, /\.js$/)

const all_menus = {
  minierp_addons,
  odoodemo_addons
}

const switch_menus_addons = 'minierp_addons'
// const switch_menus_addons = 'odoodemo_addons'

const addons_for_extend = all_menus[switch_menus_addons]

export const addons_dict = { ...dict_addons_for_model, addons_for_extend }

const modules_installed_odoo = [
  'base',
  'contacts',
  'fapiao_base',
  'fapiao_bill',
  'fapiao_invoice',
  'uom',
  'product',
  'analytic',
  'account',
  'account_wizard',
  'sales_team',
  'sale',
  'purchase',
  'stock',
  'stock_wizard',
  'stock_sms',
  'hr',
  'hr_contract',
  'hr_expense'
  //
]

const modules_extend = ['_base', '_product']

export const modules_installed = [...modules_installed_odoo, ...modules_extend]
