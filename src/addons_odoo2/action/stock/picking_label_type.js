export default {
  picking_label_type_form: {
    _odoo_model: 'ir.ui.view',
    model: 'picking.label.type',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          label_type: { widget: 'radio' }
        },
        _footer: {
          _button_process: {
            _attr: {
              name: 'process',
              type: 'object',
              string: 'Confirm',
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
