export default {
  identity_check_wizard: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users.identitycheck',
    type: 'form',
    arch: {
      sheet: {
        _footer: {
          _button_run_check: {
            _attr: {
              name: 'run_check',
              type: 'object',
              string: 'Confirm Password',
              class: 'btn btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn btn-secondary'
            }
          }
        },
        _h3: { _strong: 'Please enter your password to confirm you own this account' },
        _br: {},
        _div: {
          password: {
            class: 'o_field_highlight col-10 col-md-6 px-0',
            required: 'True',
            placeholder: '************'
          }
        },
        _a: {
          _attr: {
            class: 'btn btn-link',
            text: 'Forgot password?'
          }
        }
      }
    }
  }
}
