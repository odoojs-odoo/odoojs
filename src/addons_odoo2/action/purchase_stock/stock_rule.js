export default {
  view_stock_rule_form_stock_inherit_purchase_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.rule',
    inherit_id: 'stock.view_stock_rule_form',
    arch: {
      sheet: {
        location_src_id: {
          required: [['action', 'in', ['pull', 'push', 'pull_push']]],
          invisible: [['action', '=', 'buy']]
        }
      }
    }
  }
}
