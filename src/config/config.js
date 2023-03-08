import { message } from 'ant-design-vue'

export const baseURL = process.env.VUE_APP_BASE_API
export const timeout = 50000

export function messageError(error) {
  message.config({
    top: document.body.clientHeight / 2 + 'px'
  })
  message.error(error.data.message)
}

// 注册 odoo addons, 包括 预定义的 menus, actions, views
const odooAddons = require.context('@/odoorpc/addons', true, /\.js$/)

// 自定义的 addons, 也在这里注册
const localAddons = require.context('@/local_addons', true, /\.js$/)

export const addons_list = [odooAddons, localAddons]

const local_fields = require.context('@/local_addons_fields', true, /\.js$/)
const odoo_fields = require.context('@/odoorpc/addons_fields', true, /\.js$/)

export const web_fields_list = [local_fields, odoo_fields]

const localModels = require.context('@/local_addons_model', true, /\.js$/)
export const web_models_list = [localModels]

export const OViewComponents = {
  // 'base.action_res_users.form': ResUsers,
  // 'fp_setting.action_user.form': ResUsers
}
