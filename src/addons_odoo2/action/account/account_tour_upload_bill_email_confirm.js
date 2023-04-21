export default {
  account_tour_upload_bill_email_confirm: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tour.upload.bill.email.confirm',
    type: 'form',
    arch: {
      sheet: {
        _footer: {
          _button_apply: {
            _attr: {
              name: 'apply',
              type: 'object',
              string: 'Continue',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        },
        _p: {
          _attr: { text: 'Send your email to' },
          email_alias: { class: 'oe_inline' }
        },
        _p_373: 'Once done, press continue.'
      }
    }
  }
}
