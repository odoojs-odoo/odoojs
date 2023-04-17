export default {
  res_config_installer: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.installer',
    type: 'form',
    arch: {
      sheet: {
        _separator: {
          _attr: {
            string: 'title'
          }
        },
        _footer: {
          _button_action_next: {
            _attr: {
              name: 'action_next',
              string: 'Install Apps',
              class: 'btn-primary',
              type: 'object'
            }
          },
          _button: {
            _attr: {
              string: 'Skip',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
