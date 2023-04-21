export default {
  view_immediate_transfer: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.immediate.transfer',
    type: 'form',
    arch: {
      sheet: {
        _p: {
          _attr: { text: 'You have not recorded' },
          _i: 'done',
          _i_592: 'apply'
        },
        pick_ids: { invisible: '1' },
        show_transfers: { invisible: '1' },
        immediate_transfer_line_ids: {
          invisible: [['show_transfers', '=', false]],
          views: {
            tree: {
              arch: {
                sheet: {
                  picking_id: {},
                  to_immediate: { widget: 'boolean_toggle' }
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
              string: 'Apply',
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
