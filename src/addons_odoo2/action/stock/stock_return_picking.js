export default {
  act_stock_return_picking: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Reverse Transfer',
    res_model: 'stock.return.picking',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  view_stock_return_picking_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.return.picking',
    type: 'form',
    arch: {
      sheet: {
        move_dest_exists: { invisible: '1' },
        picking_id: {
          invisible: '1',
          force_save: '1'
        },
        parent_location_id: { invisible: '1' },
        original_location_id: { invisible: '1' },
        company_id: { invisible: '1' },
        _div: {
          _attr: {
            invisible: [['move_dest_exists', '=', false]],
            class: 'oe_grey'
          },
          _p: {
            _attr: { text: 'This picking appears to be chained with another operation. Later, if you receive the goods you are returning now, make sure to' },
            _b: 'reverse'
          }
        },
        product_return_moves: {
          views: {
            tree: {
              arch: {
                sheet: {
                  product_id: {
                    force_save: '1',
                    no_create: true,
                    no_open: true
                  },
                  quantity: {},
                  uom_id: { groups: 'uom.group_uom' },
                  move_id: { invisible: '1' }
                }
              }
            }
          }
        },
        _group: {
          location_id: {
            groups: 'stock.group_stock_multi_locations',
            required: '1',
            no_create: true,
            no_open: true
          }
        },
        _footer: {
          _button_create_returns: {
            _attr: {
              name: 'create_returns',
              type: 'object',
              string: 'Return',
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
