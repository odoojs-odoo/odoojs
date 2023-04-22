export default {
  stock_warn_insufficient_qty_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warn.insufficient.qty',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: { text: 'The product is not available in sufficient quantity' },
          _span: {
            _attr: {
              groups: 'stock.group_stock_multi_locations',
              class: 'oe_inline',
              text: ['in', '.']
            },
            _strong: {
              location_id: { readonly: 'True' }
            }
          }
        },
        _div_377: {
          _attr: { invisible: [['quant_ids', '=', []]] },
          _br: {},
          _strong: 'Current Inventory:',
          quant_ids: {
            views: {
              tree: {
                arch: {
                  sheet: {
                    location_id: { no_create: true },
                    lot_id: { groups: 'stock.group_production_lot' },
                    quantity: {}
                  }
                }
              }
            }
          }
        },
        _div_description: {
          _attr: { name: 'description' }
        },
        _footer: {
          _button_cancel_button: {
            _attr: {
              name: 'cancel_button',
              string: 'Discard',
              class: 'btn-primary'
            }
          },
          _button_action_done: {
            _attr: {
              name: 'action_done',
              type: 'object',
              string: 'Confirm',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
