export default {
  res_config_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'base_setup.res_config_settings_view_form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            id: 'sms_settings',
            position: 'inside'
          },
          _widget_iap_buy_more_credits: {
            _attr: { name: 'iap_buy_more_credits' }
          }
        }
      }
    }
  }
}
