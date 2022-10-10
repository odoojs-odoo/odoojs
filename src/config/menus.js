import { odoo_menus_tree_get, odoo_menus_list_get } from './odoo_menus'
import { local_menus_tree } from './local_menus'
import { local_components_for_router } from './local_menus'

const to_load_odoo_menu = true

export const menus_tree_get = () => {
  const local_tree = local_menus_tree
  const odoo_menus = to_load_odoo_menu ? odoo_menus_tree_get() : []
  return [...local_tree, ...odoo_menus]
}

const menus_get = mymenus => {
  return mymenus.reduce((acc, item) => {
    const item2 = { ...item }
    delete item2.children
    acc[item.id] = item2
    acc = { ...acc, ...menus_get(item.children || []) }
    return acc
  }, {})
}

export const menus_list_get = () => {
  const local_menus_list = menus_get(local_menus_tree)
  const odoo_menus_list = to_load_odoo_menu ? odoo_menus_list_get() : []
  return { ...local_menus_list, ...odoo_menus_list }
}

// 注册 odoo addons, 包括 预定义的 menus, actions, views
// 自定义的 addons, 也在这里注册
const odooAddons = require.context('@/odoorpc/addons', true, /\.js$/)
const bmxAddons = require.context('@/bmx_addons', true, /\.js$/)

export const addons_list = [odooAddons, bmxAddons]

export const components_for_router = local_components_for_router
