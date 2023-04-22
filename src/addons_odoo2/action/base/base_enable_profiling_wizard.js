export default {
  enable_profiling_wizard: {
    _odoo_model: 'ir.ui.view',
    model: 'base.enable.profiling.wizard',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            class: 'alert alert-warning',
            text: 'Profiling is a developer feature that should be used with caution on production database.\n                    It may add some load on the server, and potentially make it less responsive.\n                    Enabling the profiling here allows all users to activate profiling on their session.\n                    Profiling can be disabled at any moment in the settings.'
          },
          _h3: 'Profiling is currently disabled.'
        },
        _group: {
          duration: {},
          expiration: {}
        },
        _footer: {
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          },
          _button_submit: {
            _attr: {
              name: 'submit',
              type: 'object',
              string: 'Enable profiling',
              class: 'btn btn-primary'
            }
          }
        }
      }
    }
  }
}
