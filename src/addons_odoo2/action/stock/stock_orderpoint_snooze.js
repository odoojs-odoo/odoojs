export default {
  view_stock_orderpoint_snooze: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.orderpoint.snooze',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          orderpoint_ids: {
            invisible: '1'
          },
          predefined_date: {
            widget: 'radio'
          },
          snoozed_until: {
            readonly: [['predefined_date', '!=', 'custom']],
            force_save: '1'
          }
        },
        _footer: {
          _button_action_snooze: {
            _attr: {
              name: 'action_snooze',
              type: 'object',
              string: 'Snooze',
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

  action_orderpoint_snooze: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Snooze',
    res_model: 'stock.orderpoint.snooze',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
