export default {
  account_invoice_onboarding_sale_tax_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            class: 'mb16',
            text: 'Choose a default sales tax for your products.'
          }
        },
        _label_account_sale_tax_id: {
          for: 'account_sale_tax_id',
          string: 'Sales Tax'
        },
        account_sale_tax_id: {},
        _footer: {
          _button_action_save_onboarding_sale_tax: {
            _attr: {
              name: 'action_save_onboarding_sale_tax',
              string: 'Apply',
              class: 'btn btn-primary',
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
  },

  action_open_account_onboarding_sale_tax: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales tax',
    type: 'ir.actions.act_window',
    res_model: 'res.company',
    views: {
      tree: 'account_invoice_onboarding_sale_tax_form',
      form: '=======todo=========='
    }
  }
}
