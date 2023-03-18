import api from '@/odoorpc'

import { useL10n } from '@/components/tools/useL10n'

export const odoo_menus_tree_get = () => {
  const { tr } = useL10n()

  const menu_data = api.env.menus
  const menus = [...(menu_data.children || [])]
  // console.log('menus', menu_data)

  const menus_tree = [
    {
      id: 'odoo.menu_root',
      icon: 'shopping',
      theme: 'twoTone',
      name: tr({ zh_CN: '官方菜单', en_US: 'Odoo Menus' }),
      children: menus
    }
  ]

  return menus_tree
}

export const odoo_menus_data_get = () => {
  return api.env.menus_list
}
