export default {
  res_config_settings_view_form_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'stock.res_config_settings_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='module_stock_sms']",
            position: 'replace'
          },
          stock_move_sms_validation: {}
        },
        _xpath_101: {
          _attr: {
            expr: "//label[@for='module_stock_sms']",
            position: 'replace'
          },
          _label_stock_move_sms_validation: {
            for: 'stock_move_sms_validation',
            string: 'SMS Confirmation'
          }
        },
        _xpath_175: {
          _attr: {
            expr: "//div[@id='stock_confirmation_sms']",
            position: 'replace'
          },
          _div: {
            _attr: {
              invisible: [['stock_move_sms_validation', '=', false]],
              class: 'row mt16'
            },
            _label_stock_sms_confirmation_template_id: {
              for: 'stock_sms_confirmation_template_id',
              string: 'SMS Template',
              class: 'col-lg-4 o_light_label'
            },
            stock_sms_confirmation_template_id: {
              required: [['stock_move_sms_validation', '=', true]],
              context: { default_model: 'stock.picking' },
              class: 'oe_inline'
            }
          },
          _widget_iap_buy_more_credits: {
            _attr: {
              name: 'iap_buy_more_credits',
              invisible: [['stock_move_sms_validation', '=', false]]
            }
          }
        }
      }
    }
  }
}
