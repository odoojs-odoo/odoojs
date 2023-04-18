export default {
  sale_order_inherited_form_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    inherit_id: 'sale.view_order_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          _button_action_view_purchase_orders: {
            _attr: {
              name: 'action_view_purchase_orders',
              groups: 'purchase.group_purchase_user',
              invisible: [['purchase_order_count', '=', 0]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-credit-card'
            },
            _div: {
              _attr: {
                class: 'o_field_widget o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_value'
                },
                purchase_order_count: {}
              },
              _span_910: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Purchase'
                }
              }
            }
          }
        }
      }
    }
  }
}
