export default {
  change_password_own_form: {
    _odoo_model: 'ir.ui.view',
    model: 'change.password.own',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          new_password: {},
          confirm_password: {}
        },
        _footer: {
          _button_change_password: {
            _attr: {
              name: 'change_password',
              string: 'Change Password',
              class: 'btn-primary',
              type: 'object'
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
  }
}
