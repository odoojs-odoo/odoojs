export default {
  stock_inventory_adjustment_name_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.inventory.adjustment.name',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _div: {
            _attr: {
              invisible: [['show_info', '=', false]],
              text: "Some selected lines don't have any quantities set, they will be ignored."
            }
          },
          _group: {
            inventory_adjustment_name: {
              string: 'Inventory Reference / Reason'
            },
            show_info: {
              invisible: '1'
            }
          }
        },
        _footer: {
          _button_action_apply: {
            _attr: {
              name: 'action_apply',
              type: 'object',
              string: 'Apply',
              class: 'btn-primary'
            }
          },
          _button_cancel_button: {
            _attr: {
              name: 'cancel_button',
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_stock_inventory_adjustement_name: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Inventory Adjustment Reference / Reason',
    type: 'ir.actions.act_window',
    res_model: 'stock.inventory.adjustment.name',
    context: {
      todo_ctx: "{\n            'default_quant_ids': active_ids\n        }"
    },
    views: {
      tree: 'stock_inventory_adjustment_name_form_view',
      form: '=======todo=========='
    }
  }
}
