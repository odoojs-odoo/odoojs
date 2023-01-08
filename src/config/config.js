import { addons_list as addons_list2 } from './menus'
import { web_models_list as web_models_list2 } from './menus'

import { components_for_router } from './menus'
import { menus_tree_get as menus_tree_get2 } from './menus'
import { menus_list_get as menus_list_get2 } from './menus'

export const baseURL = process.env.VUE_APP_BASE_API
export const timeout = 50000

export const web_models_list = web_models_list2
export const addons_list = addons_list2
export const components = components_for_router

export const menus_tree_get = () => {
  const odoo_menus = menus_tree_get2()
  return odoo_menus
}

export const menus_list_get = () => {
  const odoo_menus_list = menus_list_get2()
  return odoo_menus_list
}

export const app_title = '欢迎使用 odoojs'
export const app_footer = 'odoojs ©2021 北京斑马线科技有限公司'
