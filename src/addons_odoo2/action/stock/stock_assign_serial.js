export default {
  view_assign_serial_numbers: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.assign.serial',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          move_id: {
            invisible: '1'
          },
          product_id: {
            readonly: '1'
          },
          next_serial_number: {},
          next_serial_count: {}
        },
        _footer: {
          _button_generate_serial_numbers: {
            _attr: {
              name: 'generate_serial_numbers',
              type: 'object',
              string: 'Assign Serial Numbers',
              class: 'oe_highlight'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel'
            }
          }
        }
      }
    }
  },

  act_assign_serial_numbers: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Assign Serial Numbers',
    type: 'ir.actions.act_window',
    res_model: 'stock.assign.serial',
    context: {},
    views: {
      tree: 'view_assign_serial_numbers',
      form: '=======todo=========='
    }
  }
}
