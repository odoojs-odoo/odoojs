export default {
  view_order_line_tree_inherit_sale_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order.line',
    inherit_id: 'sale.view_order_line_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='price_subtotal']",
            position: 'before'
          },
          route_id: {
            groups: 'stock.group_adv_location',
            no_create: true
          }
        }
      }
    }
  }
}
