export default {
  view_stock_replenishment_info: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.replenishment.info',
    type: 'form',
    arch: {
      sheet: {
        orderpoint_id: {
          invisible: '1'
        },
        qty_to_order: {
          invisible: '1'
        },
        _group: {
          _group: {
            json_lead_days: {
              widget: 'lead_days_widget'
            }
          },
          _group_438: {
            json_replenishment_history: {
              widget: 'replenishment_history_widget'
            }
          }
        },
        _notebook: {
          warehouseinfo_ids: {
            invisible: '1'
          },
          _page: {
            _attr: {
              string: 'Warehouses',
              invisible: [['warehouseinfo_ids', '=', []]]
            },
            wh_replenishment_option_ids: {}
          }
        },
        _footer: {
          _button: {
            _attr: {
              string: 'Close',
              class: 'btn-default'
            }
          }
        }
      }
    }
  },

  action_stock_replenishment_info: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Replenishment Information',
    type: 'ir.actions.act_window',
    res_model: 'stock.replenishment.info',
    search_view_id: 'tooooooodoooooo',
    context: {
      todo_ctx: "{'default_orderpoint_id': active_id}"
    },
    views: {
      tree: 'view_stock_replenishment_info',
      form: '=======todo=========='
    }
  }
}
