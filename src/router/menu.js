import api from '@/api'

/*
  这里是把 api 里的所有 model 全部定义了 路由
*/

export const get_menu = () => {
  const addons_menus = Object.keys(api.addons)
  // console.log('get_menu', addons_menus)

  return addons_menus.map(item => {
    const name = item
      .replace(/(\.|^)[a-z]/g, L => L.toUpperCase())
      .replace(/\./g, '')
      .replace(/( |^)[A-Z]/g, L => L.toLowerCase())

    const addon = api.addons[item]
    const title = addon.metadata.description

    // console.log('menu, ', item, addon)

    return {
      name, // 这是 $store.moduleName
      title: title, // 这是菜单名
      model: item, // 这是 api.modelName
      files: {
        list: 'odoo/listPage', // 这是 导入的组件文件 @/views/odoo/listPage.vue
        view: 'odoo/viewPage',
        form: 'odoo/formPage'
      },
      paths: {
        list: `/odoo/list/${name}`, // 这是 路由
        view: `/odoo/view/${name}`,
        form: `/odoo/form/${name}`
      }
    }
  })
}
