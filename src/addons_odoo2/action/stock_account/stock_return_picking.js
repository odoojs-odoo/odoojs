export default {
  view_stock_return_picking_form_inherit_stock_account: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.return.picking',
    inherit_id: 'stock.view_stock_return_picking_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='product_return_moves']/tree",
            position: 'inside'
          },
          to_refund: { groups: 'base.group_no_one' }
        }
      }
    }
  }
}
