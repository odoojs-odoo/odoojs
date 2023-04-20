export default {
  stock_inventory_request_count_form_view_inherit_stock_account: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.request.count',
    inherit_id: 'stock.stock_inventory_request_count_form_view',
    arch: {
      sheet: {
        user_id: {
          position: 'after',
          __todo__after: {
            accounting_date: {}
          }
        }
      }
    }
  }
}
