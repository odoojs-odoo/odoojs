// todo

export default {
  menu_board_root: {
    _odoo_model: 'ir.ui.menu',
    name: 'Dashboards',
    //   icon: 'shopping',
    //   theme: 'twoTone',
    active: false,
    sequence: 260
  },

  menu_administration: {
    _odoo_model: 'ir.ui.menu',
    name: '设置',
    sequence: 550
  },

  menu_users: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_administration',
    name: '用户和公司',
    sequence: 1
  },

  menu_management: {
    _odoo_model: 'ir.ui.menu',
    name: '模块',
    sequence: 500
  }
}
