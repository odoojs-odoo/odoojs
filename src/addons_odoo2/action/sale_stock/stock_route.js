export default {
  stock_location_route_view_form_inherit_sale_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.route',
    inherit_id: 'stock.stock_location_route_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='route_selector']/group[last()]",
            position: 'inside'
          },
          sale_selectable: {
            string: 'Sales Order Lines'
          }
        }
      }
    }
  }
}
