export default {
  stock_warn_insufficient_qty_scrap_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warn.insufficient.qty.scrap',
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
          _strong_421: {
            location_id: { readonly: 'True' }
          }
        },
        _xpath_939: {
          _attr: {
            expr: "//button[@name='cancel_button']",
            position: 'replace'
          },
          _button_action_cancel: {
            _attr: {
              name: 'action_cancel',
              type: 'object',
              string: 'Discard',
              class: 'btn-primary'
            }
          }
        }
      }
    }
  }
}
