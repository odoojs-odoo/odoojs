export default {
  product_normal_form_view_inherit_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_normal_form_view',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box'
          },
          _button_action_view_po: {
            _attr: {
              name: 'action_view_po',
              groups: 'purchase.group_purchase_user',
              attrs: {
                invisible: "[('purchase_ok', '=', False)]"
              },
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
                purchased_product_qty: {
                  widget: 'statinfo',
                  class: 'mr4'
                },
                uom_name: {}
              },
              _span_390: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Purchased'
                }
              }
            }
          }
        }
      }
    }
  }
}
