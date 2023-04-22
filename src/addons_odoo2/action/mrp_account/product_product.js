export default {
  product_product_view_form_normal_inherit_extended: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_normal_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@name='standard_price_uom']",
            position: 'inside'
          },
          _t: {
            _attr: { groups: 'mrp.group_mrp_manager' },
            bom_count: { invisible: '1' },
            cost_method: { invisible: '1' },
            valuation: { invisible: '1' },
            _button_button_bom_cost: {
              _attr: {
                name: 'button_bom_cost',
                type: 'object',
                string: 'Compute Price from BoM',
                help: 'Compute the price of the product using products and operations of related bill of materials, for manufactured products only.',
                invisible: ['|', ['bom_count', '=', 0], '&', ['valuation', '=', 'real_time'], ['cost_method', '=', 'fifo']],
                class: 'oe_link pt-0'
              }
            }
          }
        }
      }
    }
  },

  product_variant_easy_edit_view_bom_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_variant_easy_edit_view',
    arch: {
      sheet: {
        _data: {
          _xpath: {
            _attr: {
              expr: "//field[@name='standard_price']",
              position: 'after'
            },
            _t: {
              _attr: { groups: 'mrp.group_mrp_manager' },
              bom_count: { invisible: '1' },
              cost_method: { invisible: '1' },
              valuation: { invisible: '1' },
              _button_button_bom_cost: {
                _attr: {
                  name: 'button_bom_cost',
                  type: 'object',
                  string: 'Compute Price from BoM',
                  help: 'Compute the price of the product using products and operations of related bill of materials, for manufactured products only.',
                  invisible: ['|', ['bom_count', '=', 0], '&', ['valuation', '=', 'real_time'], ['cost_method', '=', 'fifo']],
                  class: 'oe_link pt-0'
                }
              }
            }
          }
        }
      }
    }
  },

  action_compute_price_bom_product: {
    _odoo_model: 'ir.actions.server',
    model_id: 'product.model_product_product',
    model: 'product_product'
  }
}
