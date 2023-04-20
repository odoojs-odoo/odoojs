export default {
  product_packaging_form_view_sale: {
    _odoo_model: 'ir.ui.view',
    model: 'product.packaging',
    inherit_id: 'product.product_packaging_form_view',
    arch: {
      sheet: {
        _group_group_product: {
          _attr: {
            name: 'group_product',
            position: 'inside'
          },
          sales: {}
        }
      }
    }
  },

  product_packaging_tree_view_sale: {
    _odoo_model: 'ir.ui.view',
    model: 'product.packaging',
    inherit_id: 'product.product_packaging_tree_view',
    arch: {
      sheet: {
        product_uom_id: {
          position: 'after',
          __todo__after: {
            sales: {
              optional: 'show'
            }
          }
        }
      }
    }
  }
}
