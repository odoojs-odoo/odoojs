export default {
  product_label_layout_form_picking: {
    _odoo_model: 'ir.ui.view',
    model: 'product.label.layout',
    inherit_id: 'product.product_label_layout_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//field[@name="custom_quantity"]',
            position: 'before'
          },
          picking_quantity: {}
        },
        _xpath_133: {
          _attr: {
            expr: '//field[@name="custom_quantity"]',
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('picking_quantity', '=', 'picking')]}",
              attrs: "{'invisible': [('picking_quantity', '=', 'picking')]}"
            }
          }
        }
      }
    }
  }
}
