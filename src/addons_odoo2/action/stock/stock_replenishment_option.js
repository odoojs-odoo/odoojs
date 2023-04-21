export default {
  replenishment_option_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.replenishment.option',
    type: 'tree',
    arch: {
      sheet: {
        qty_to_order: { invisible: '1' },
        warehouse_id: { string: 'Warehouse' },
        location_id: { string: 'Warehouse Location' },
        free_qty: { string: 'Available Quantity' },
        uom: { string: 'UoM' },
        route_id: {},
        lead_time: {},
        _button_select_route: {
          _attr: {
            name: 'select_route',
            type: 'object',
            string: 'Select Route',
            class: 'btn btn-link'
          }
        }
      }
    }
  },

  replenishment_option_warning_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.replenishment.option',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          warning_message: {}
        },
        _footer: {
          _button_order_avbl: {
            _attr: {
              name: 'order_avbl',
              type: 'object',
              invisible: [['free_qty', '<=', 0.0]],
              class: 'btn-primary',
              text: 'Order'
            },
            free_qty: {}
          },
          _button_order_all: {
            _attr: {
              name: 'order_all',
              type: 'object',
              text: 'Order'
            },
            qty_to_order: {}
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
