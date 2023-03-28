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
    name: { en_US: 'Setting', zh_CN: '设置' },
    sequence: 550
  },

  menu_users: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_administration',
    name: { en_US: 'User And Company', zh_CN: '用户和公司' },
    sequence: 1
  },

  menu_management: {
    _odoo_model: 'ir.ui.menu',
    name: { en_US: 'Apps', zh_CN: '模块' },
    sequence: 500
  }
}
