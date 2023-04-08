export default {
  menu_web_root: {
    _odoo_model: 'ir.ui.menu',
    name: 'MuMenu',
    sequence: 10
  },

  menu_setting: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Setting',
    sequence: 10
  },

  menu_master: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Master Data',
    sequence: 20
  }
}
