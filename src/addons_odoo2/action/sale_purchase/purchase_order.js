export default {
  purchase_order_inherited_form_sale: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    inherit_id: 'purchase.purchase_order_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          _button_action_view_sale_orders: {
            _attr: {
              name: 'action_view_sale_orders',
              type: 'object',
              icon: 'fa-dollar',
              groups: 'sales_team.group_sale_salesman',
              invisible: [['sale_order_count', '=', 0]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                sale_order_count: {}
              },
              _span_850: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Sale'
                }
              }
            }
          }
        }
      }
    }
  }
}
