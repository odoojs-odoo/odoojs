export default {
  product_product_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Product Variants',
    res_model: 'product.product',
    search_view_id: 'product.product_search_form_view',
    context: { search_default_filter_to_purchase: 1 },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  product_normal_form_view_inherit_purchase: {
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
          _button_action_view_po: {
            _attr: {
              name: 'action_view_po',
              type: 'object',
              icon: 'fa-credit-card',
              help: 'Purchased in the last 365 days',
              groups: 'purchase.group_purchase_user',
              invisible: [['purchase_ok', '=', false]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                purchased_product_qty: {
                  widget: 'statinfo',
                  class: 'mr4'
                },
                uom_name: {}
              },
              _span_586: {
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
