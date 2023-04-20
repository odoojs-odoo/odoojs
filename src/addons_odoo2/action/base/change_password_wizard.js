export default {
  change_password_wizard_view: {
    _odoo_model: 'ir.ui.view',
    model: 'change.password.wizard',
    type: 'form',
    arch: {
      sheet: {
        user_ids: {},
        _footer: {
          _button_change_password_button: {
            _attr: {
              name: 'change_password_button',
              type: 'object',
              string: 'Change Password',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  change_password_wizard_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Change Password',
    res_model: 'change.password.wizard',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
