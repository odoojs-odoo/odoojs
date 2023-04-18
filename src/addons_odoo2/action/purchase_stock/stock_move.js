export default {
  stock_move_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    inherit_id: 'stock.view_move_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='origin_grp']",
            position: 'inside'
          },
          purchase_line_id: {}
        }
      }
    }
  }
}
