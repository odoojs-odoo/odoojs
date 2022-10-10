import api from '@/odoorpc'

export const odoo_menus_tree_get = () => {
  const menu_data = api.env.menus
  const menus = [...(menu_data.children || [])]
  // console.log('menus', menu_data)

  const menus_tree = [
    {
      id: 'odoo.menu_root',
      icon: 'appstore',
      theme: 'twoTone',
      name: '官方菜单',
      children: menus
    }
  ]

  return menus_tree
}

export const odoo_menus_list_get = () => {
  return api.env.menus_list
}
