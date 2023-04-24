export default {
  view_assign_serial_numbers_production: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.assign.serial',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          production_id: { readonly: 'True' }
        },
        _group_302: {
          _group: {
            next_serial_number: {}
          },
          _group_603: {
            _label_next_serial_count: { for: 'next_serial_count' },
            _div: {
              _attr: { class: 'o_row' },
              _span: {
                next_serial_count: {}
              },
              _button_generate_serial_numbers_production: {
                _attr: {
                  name: 'generate_serial_numbers_production',
                  type: 'object',
                  title: 'Generate Serial Numbers',
                  class: 'btn btn-secondary'
                },
                _span: 'Generate'
              }
            }
          }
        },
        _group_874: {
          serial_numbers: { placeholder: 'copy paste a list and/or use Generate' }
        },
        multiple_lot_components_names: { invisible: '1' },
        _group_467: {
          _p: {
            _attr: {
              invisible: [['multiple_lot_components_names', '=', false]],
              class: 'o_form_label oe_inline text-danger',
              text: ['Note that components', 'have multiple lot reservations.', 'Do you want to confirm anyway ?']
            },
            multiple_lot_components_names: { readonly: 'True' },
            _br: {}
          }
        },
        show_apply: { invisible: '1' },
        show_backorders: { invisible: '1' },
        _group_765: {
          _group: {
            produced_qty: {
              readonly: 'True',
              force_save: 'True'
            }
          },
          _group_149: {
            expected_qty: { readonly: 'True' }
          },
          _p: {
            _attr: {
              invisible: [['show_backorders', '=', false]],
              class: 'o_form_label oe_inline',
              text: ['You have entered less serial numbers than the quantity to produce.', 'Create a backorder if you expect to process the remaining quantities later.', 'Do not create a backorder if you will not process the remaining products.']
            },
            _br: {},
            _br_703: {}
          }
        },
        _footer: {
          _button_apply: {
            _attr: {
              name: 'apply',
              type: 'object',
              string: 'Apply',
              invisible: [['show_apply', '=', false]],
              class: 'btn-primary'
            }
          },
          _button_create_backorder: {
            _attr: {
              name: 'create_backorder',
              type: 'object',
              string: 'Create Backorder',
              invisible: [['show_backorders', '=', false]],
              class: 'btn-primary'
            }
          },
          _button_no_backorder: {
            _attr: {
              name: 'no_backorder',
              type: 'object',
              string: 'No Backorder',
              invisible: [['show_backorders', '=', false]],
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
  },

  act_assign_serial_numbers_production: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Assign Serial Numbers',
    type: 'ir.actions.act_window',
    res_model: 'stock.assign.serial',
    search_view_id: 'tooooooodoooooo',
    context: {},
    views: {
      tree: 'view_assign_serial_numbers_production',
      form: '=======todo=========='
    }
  }
}
