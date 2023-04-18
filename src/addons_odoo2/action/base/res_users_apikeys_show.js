export default {
  form_res_users_key_show: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users.apikeys.show',
    type: 'form',
    arch: {
      sheet: {
        _h3: {
          _attr: {
            class: 'fw-bold',
            text: 'Write down your key'
          }
        },
        _p: 'Here is your new API key, use it instead of a password for RPC access.\n                            Your login is still necessary for interactive usage.',
        _p_708: {
          _code: {
            key: {}
          }
        },
        _p_800: {
          _attr: {
            class: 'alert alert-warning'
          },
          _strong: 'Important:',
          _b: 'full access'
        },
        _footer: {
          _button: {
            _attr: {
              string: 'Done!'
            }
          }
        }
      }
    }
  }
}
