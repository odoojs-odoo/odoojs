export default {
  change_password_wizard_user_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'change.password.user',
    type: 'tree',
    arch: {
      sheet: {
        user_id: {
          invisible: '1'
        },
        user_login: {},
        new_passwd: {}
      }
    }
  }
}
