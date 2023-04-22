export default {
  product_product_ext_form_view2: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_only_form_view',
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

  action_compute_price_bom_template: {
    _odoo_model: 'ir.actions.server',
    model_id: 'product.model_product_template',
    model: 'product_template'
  }
}
