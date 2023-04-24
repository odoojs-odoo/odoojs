export default {
  menu_web_root: {
    _odoo_model: 'ir.ui.menu',
    name: 'MuMenu',
    sequence: 10
  },

  menu_base: {
    name: '系统配置',
    children: {
      menu_action_res_users: { name: '用户' }
    }
  }
}
