export default {
  enable_profiling_wizard: {
    _odoo_model: 'ir.ui.view',
    model: 'base.enable.profiling.wizard',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: { class: 'alert alert-warning' },
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
