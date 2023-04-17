export default {
  res_config_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            class: 'o_setting_container'
          },
          _div: {
            _attr: {
              class: 'settings'
            }
          }
        }
      }
    }
  },

  res_config_setting_act_window: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
