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

const addons_odoo = require.context('@/addons_odoo', true, /\.js$/)
const addons_l10n_zh_CN_odoo = require.context(
  '@/addons_l10n_zh_CN_odoo',
  true,
  /\.js$/
)

const addons_fapiao = require.context('@/addons_fapiao', true, /\.js$/)

const addons_global_minierp = require.context(
  '@/addons_global_minierp',
  true,
  /\.js$/
)

const addons_l10n_zh_CN_global_minierp = require.context(
  '@/addons_l10n_zh_CN_global_minierp',
  true,
  /\.js$/
)

const addons_global_odoodemo = require.context('@/addons_global', true, /\.js$/)
const addons_l10n_zh_CN_global_odoodemo = require.context(
  '@/addons_l10n_zh_CN_global',
  true,
  /\.js$/
)

// const addons_global_selected = 'minierp'
const addons_global_selected = 'odoodemo'

const addons_globals =
  addons_global_selected === 'odoodemo'
    ? {
        addons_global: addons_global_odoodemo,
        addons_l10n_zh_CN_global: addons_l10n_zh_CN_global_odoodemo
      }
    : {
        addons_global: addons_global_minierp,
        addons_l10n_zh_CN_global: addons_l10n_zh_CN_global_minierp
      }

export const addons_dict = {
  addons_odoo,
  addons_l10n_zh_CN_odoo,
  addons_fapiao,
  ...addons_globals
}

export const modules_installed = [
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
