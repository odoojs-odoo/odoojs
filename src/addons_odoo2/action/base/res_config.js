export default {
  res_config_view_base: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config',
    type: 'form',
    arch: {
      sheet: {
        _group_res_config_contents: {
          _attr: {
            name: 'res_config_contents'
          }
        },
        _footer: {
          _button_action_next: {
            _attr: {
              name: 'action_next',
              string: 'Apply',
              class: 'btn-primary',
              type: 'object'
            }
          },
          _button_action_skip: {
            _attr: {
              name: 'action_skip',
              string: 'Cancel',
              class: 'btn-secondary',
              type: 'object'
            }
          }
        }
      }
    }
  },

  action_run_ir_action_todo: {
    _odoo_model: 'ir.actions.server',
    type: 'ir.actions.server',
    model_id: 'model_res_config',
    model: 'res_config'
  }
}
