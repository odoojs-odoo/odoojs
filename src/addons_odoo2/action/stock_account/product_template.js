export default {
  product_template_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_tree_view',
    arch: {
      sheet: {
        standard_price: {
          position: 'attributes',
          __todo__readonly: '1'
        }
      }
    }
  }
}
