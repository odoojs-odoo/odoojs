import { local_menus_tree } from './local_menus'

import { odoo_menus_tree_get, odoo_menus_data_get } from './odoo_menus'

const menus_get = mymenus => {
  // console.log('----menus mymenus ---',mymenus);
  return mymenus.reduce((acc, item) => {
    const item2 = { ...item }
    // console.log('----menus item2 ---',item2);

    delete item2.children
    acc[item.id] = item2
    acc = { ...acc, ...menus_get(item.children || []) }
    return acc
  }, {})
}

export const menus_data_get = () => {
  const local_menus_list = menus_get(local_menus_tree)
  const odoo_menus_list = odoo_menus_data_get()
  return { ...local_menus_list, ...odoo_menus_list }
}

export const menus_tree_get = () => {
  const local_tree = local_menus_tree
  const odoo_menus = odoo_menus_tree_get()
  return [...local_tree, ...odoo_menus]
}

export const app_title = '欢迎使用 odoojs'
export const app_footer = 'odoojs ©2021 北京斑马线科技有限公司'
