export default {
  inventory_warning_reset_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.inventory.warning',
    type: 'form',
    arch: {
      sheet: {
        _div: 'This will discard all unapplied counts, do you want to proceed?',
        _footer: {
          _button_action_reset: {
            _attr: {
              name: 'action_reset',
              string: 'Continue',
              class: 'btn-primary',
              type: 'object'
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

  inventory_warning_set_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.inventory.warning',
    type: 'form',
    arch: {
      sheet: {
        _div: 'Some selected lines already have quantities set, they will be ignored.',
        _footer: {
          _button_action_set: {
            _attr: {
              name: 'action_set',
              string: 'Continue',
              class: 'btn-primary',
              type: 'object'
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
  }
}
