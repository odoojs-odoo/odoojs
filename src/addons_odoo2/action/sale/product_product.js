export default {
  product_form_view_sale_order_button: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_normal_form_view',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            position: 'inside'
          },
          _button_action_view_sales: {
            _attr: {
              name: 'action_view_sales',
              type: 'object',
              icon: 'fa-signal',
              help: 'Sold in the last 365 days',
              groups: 'sales_team.group_sale_salesman',
              invisible: [['sale_ok', '=', false]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                sales_count: {
                  widget: 'statinfo',
                  class: 'mr4'
                },
                uom_name: {}
              },
              _span_413: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Sold'
                }
              }
            }
          }
        },
        _group_description: {
          _attr: {
            name: 'description',
            position: 'after'
          },
          _t: {
            _attr: { groups: 'sales_team.group_sale_salesman' },
            _group: {
              _attr: {
                string: 'Warning when Selling this Product',
                groups: 'sale.group_warning_sale'
              },
              sale_line_warn: {},
              sale_line_warn_msg: {
                required: [['sale_line_warn', '!=', 'no-message']],
                readonly: [['sale_line_warn', '=', 'no-message']],
                placeholder: 'Type a message...'
              }
            }
          }
        }
      }
    }
  }
}
