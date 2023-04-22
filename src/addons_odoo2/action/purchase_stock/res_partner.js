export default {
  res_partner_view_purchase_buttons_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'purchase.res_partner_view_purchase_buttons',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='purchase_order_count']/..",
            position: 'after'
          },
          _button_action_purchase_vendor_delay_report: {
            _attr: {
              name: 'action_purchase_vendor_delay_report',
              type: 'action',
              icon: 'fa-truck',
              groups: 'purchase.group_purchase_user',
              context: { search_default_partner_id: 'todo===id' },
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_form_field o_stat_info' },
              _div: {
                _attr: {
                  invisible: [['on_time_rate', '<', 0]],
                  class: 'o_row'
                },
                _span: {
                  _attr: { class: 'o_stat_value' },
                  on_time_rate: {
                    string: 'On-time Rate',
                    widget: 'integer'
                  }
                },
                _span_421: {
                  _attr: {
                    class: 'o_stat_value',
                    text: '%'
                  }
                }
              },
              _div_619: {
                _attr: {
                  invisible: [['on_time_rate', '>=', 0]],
                  class: 'o_stat_value',
                  text: 'No data yet'
                }
              },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'On-time Rate'
                }
              }
            }
          }
        }
      }
    }
  }
}
