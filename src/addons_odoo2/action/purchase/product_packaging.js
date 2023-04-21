export default {
  product_packaging_form_view_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'product.packaging',
    inherit_id: 'product.product_packaging_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='group_product']",
            position: 'inside'
          },
          purchase: {}
        }
      }
    }
  },

  product_packaging_tree_view_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'product.packaging',
    inherit_id: 'product.product_packaging_tree_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='product_uom_id']",
            position: 'after'
          },
          purchase: { optional: 'show' }
        }
      }
    }
  }
}
