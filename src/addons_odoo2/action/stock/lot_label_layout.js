export default {
  lot_label_layout_form_picking: {
    _odoo_model: 'ir.ui.view',
    model: 'lot.label.layout',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          label_quantity: {
            widget: 'radio'
          },
          print_format: {
            widget: 'radio'
          }
        },
        _footer: {
          _button_process: {
            _attr: {
              name: 'process',
              string: 'Confirm',
              class: 'btn-primary',
              type: 'object'
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
