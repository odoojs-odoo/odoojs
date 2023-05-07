export default {
  menu_web_root: {
    _odoo_model: 'ir.ui.menu',
    name: 'MuMenu',
    sequence: 10
  },

  menu_base: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Base',
    sequence: 10,
    children: {
      menu_open_module_tree: {
        name: 'Apps',
        action: 'base.open_module_tree'
      },
      menu_action_res_company_form: {
        name: 'Company',
        action: 'base.action_res_company_form'
      },
      menu_action_res_users: {
        name: 'User',
        action: 'base.action_res_users'
      }
    }
  }
}
