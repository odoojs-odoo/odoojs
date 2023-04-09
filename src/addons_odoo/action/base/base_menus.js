// todo

export default {
  menu_odoo_root: {
    _odoo_model: 'ir.ui.menu',
    name: 'OdooMenu',
    sequence: 100
  },

  menu_board_root: {
    _odoo_model: 'ir.ui.menu',
    name: 'Dashboards',
    parent: 'menu_odoo_root',
    //   icon: 'shopping',
    //   theme: 'twoTone',
    active: false,
    sequence: 260
  },

  menu_administration: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_odoo_root',
    name: 'Setting',
    sequence: 550
  },

  menu_users: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_administration',
    name: 'User And Company',
    sequence: 1
  },

  menu_management: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_odoo_root',
    name: 'Apps',
    sequence: 500
  }
}
