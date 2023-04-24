export default {
  stock_warn_insufficient_qty_unbuild_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warn.insufficient.qty.unbuild',
    inherit_id: 'stock.stock_warn_insufficient_qty_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@name='description']",
            position: 'inside'
          },
          _strong: {
            quantity: { readonly: 'True' }
          },
          product_uom_name: {
            class: 'mx-1',
            readonly: 'True'
          },
          _strong_430: {
            location_id: { readonly: 'True' }
          }
        }
      }
    }
  }
}
