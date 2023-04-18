export default {
  view_stock_quantity_history: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quantity.history',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          inventory_datetime: {}
        },
        _footer: {
          _button_open_at_date: {
            _attr: {
              name: 'open_at_date',
              type: 'object',
              string: 'Confirm',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
