export default {
  view_confirm_stock_sms: {
    _odoo_model: 'ir.ui.view',
    model: 'confirm.stock.sms',
    type: 'form',
    arch: {
      sheet: {
        _br: {},
        _br_205: {},
        _footer: {
          _button_send_sms: {
            _attr: {
              name: 'send_sms',
              type: 'object',
              string: 'Confirm',
              class: 'oe_highlight'
            }
          },
          _button_dont_send_sms: {
            _attr: {
              name: 'dont_send_sms',
              type: 'object',
              string: 'Disable SMS',
              class: 'btn btn-secondary'
            }
          },
          _button: {
            _attr: { string: 'Cancel' }
          }
        }
      }
    }
  }
}
