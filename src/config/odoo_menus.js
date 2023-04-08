import api from '@/odoorpc'

export const odoo_menus_tree_get = () => {
  const menu_data = api.env.menus
  const menus = [...(menu_data.children || [])]
  // console.log('menus', menu_data)

  const local_menus = menus.filter(
    item => item.id === 'modulename.menu_web_root'
  )

  const local_menus2 = local_menus[0].children

  const menus_tree = [...local_menus2]

  return menus_tree
}

export const odoo_menus_data_get = () => {
  return api.env.menus_list
}
