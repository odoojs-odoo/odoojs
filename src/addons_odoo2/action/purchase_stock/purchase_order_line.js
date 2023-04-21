export default {
  purchase_order_line_view_form_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order.line',
    inherit_id: 'purchase.purchase_order_line_form2',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='invoice_lines']",
            position: 'after'
          },
          _separator: {
            _attr: { string: 'Stock Moves' }
          },
          move_ids: {}
        }
      }
    }
  }
}
