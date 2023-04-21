export default {
  view_stock_quantity_history_inherit_stock_account: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quantity.history',
    inherit_id: 'stock.view_stock_quantity_history',
    arch: {
      sheet: {
        inventory_datetime: {
          position: 'attributes',
          invisible: "context.get['active_model'] != 'stock.quant'"
        },
        _field_inventory_datetime_659: {
          inventory_datetime: {
            position: 'after',
            __todo__after: {
              inventory_datetime: {
                string: 'Valuation at Date',
                invisible: "context.get['active_model'] != 'stock.valuation.layer'",
                help: 'Choose a date to get the valuation at that date'
              }
            }
          }
        }
      }
    }
  }
}
