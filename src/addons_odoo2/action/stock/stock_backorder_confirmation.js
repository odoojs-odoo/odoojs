export default {
  view_backorder_confirmation: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.backorder.confirmation',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            _div: {
              _p_explanation$dash$text: {
                _attr: {
                  name: 'explanation-text',
                  text: 'You have processed less products than the initial demand.'
                }
              }
            }
          },
          _group_933: {
            _div: {
              _attr: {
                class: 'text-muted',
                text: 'Create a backorder if you expect to process the remaining\n                            products later. Do not create a backorder if you will not\n                            process the remaining products.'
              }
            }
          }
        },
        pick_ids: { invisible: '1' },
        show_transfers: { invisible: '1' },
        backorder_confirmation_line_ids: {
          invisible: [['show_transfers', '=', false]],
          views: {
            tree: {
              arch: {
                sheet: {
                  picking_id: {},
                  to_backorder: { widget: 'boolean_toggle' }
                }
              }
            }
          }
        },
        _footer: {
          _button_process: {
            _attr: {
              name: 'process',
              type: 'object',
              string: 'Create Backorder',
              class: 'oe_highlight'
            }
          },
          _button_process_cancel_backorder: {
            _attr: {
              name: 'process_cancel_backorder',
              type: 'object',
              string: 'No Backorder',
              invisible: [['show_transfers', '=', true]],
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
