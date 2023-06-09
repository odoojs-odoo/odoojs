export default {
  view_stock_track_confirmation: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.track.confirmation',
    type: 'form',
    arch: {
      sheet: {
        product_ids: { invisible: '1' },
        quant_ids: { invisible: '1' },
        _p: {
          _attr: { text: ["Those products you added are tracked but lots/serials were not defined. Once applied those can't be changed.", 'Apply anyway?'] },
          _br: {}
        },
        _strong: 'Tracked product(s):',
        tracking_line_ids: {
          readonly: '1',
          views: {
            tree: {
              arch: {
                sheet: {
                  product_display_name: {},
                  tracking: {}
                }
              }
            }
          }
        },
        _footer: {
          _button_action_confirm: {
            _attr: {
              name: 'action_confirm',
              type: 'object',
              string: 'Apply',
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
  }
}
