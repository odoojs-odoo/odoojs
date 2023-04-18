export default {
  view_stock_rules_report_sale: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.rules.report',
    inherit_id: 'stock.view_stock_rules_report',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='warehouse_ids']",
            position: 'after'
          },
          so_route_ids: {
            widget: 'many2many_tags',
            groups: 'stock.group_adv_location'
          }
        }
      }
    }
  }
}
