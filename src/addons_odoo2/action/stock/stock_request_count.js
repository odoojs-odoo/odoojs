export default {
  stock_inventory_request_count_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.request.count',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          quant_ids: {
            invisible: '1'
          },
          inventory_date: {},
          user_id: {},
          set_count: {
            widget: 'radio'
          }
        },
        _footer: {
          _button_action_request_count: {
            _attr: {
              name: 'action_request_count',
              type: 'object',
              string: 'Confirm',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_stock_request_count: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Request a Count',
    type: 'ir.actions.act_window',
    res_model: 'stock.request.count',
    search_view_id: 'tooooooodoooooo',
    context: {
      todo_ctx: "{\n            'default_quant_ids': active_ids\n        }"
    },
    views: {
      tree: 'stock_inventory_request_count_form_view',
      form: '=======todo=========='
    }
  }
}
