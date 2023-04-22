export default {
  account_tour_upload_bill: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tour.upload.bill',
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
        _h2: "With Odoo, you won't have to record bills manually",
        _p: 'We process bills automatically so that you only have to validate them. Choose how you want to test our artificial intelligence engine:',
        _group: {
          _group: {
            selection: { widget: 'radio' }
          },
          _group_670: {
            _attr: { invisible: [['selection', '!=', 'sample']] },
            preview_invoice: { widget: 'html' }
          },
          _group_819: {
            _attr: { invisible: [['selection', '!=', 'upload']] },
            attachment_ids: {
              string: 'Attach a file',
              widget: 'many2many_binary'
            }
          }
        }
      }
    }
  }
}
