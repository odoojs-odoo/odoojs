export default {
  view_account_analytic_account_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'form',
    inherit_id: 'analytic.view_account_analytic_account_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: { name: 'button_box', position: 'inside' },
          _button_action_view_invoice: {
            _attr: {
              name: 'action_view_invoice',
              type: 'object',
              icon: 'fa-pencil-square-o',
              invisible({ record }) {
                // 'invisible': [('invoice_count', '=', 0)]
                const { invoice_count } = record
                return !invoice_count
              }
            },
            invoice_count: { widget: 'statinfo', string: 'Customer Invoices' }
          },

          _button_action_view_vendor_bill: {
            _attr: {
              type: 'object',
              name: 'action_view_vendor_bill',
              icon: 'fa-file-text-o',
              invisible({ record }) {
                //'invisible': [('vendor_bill_count', '=', 0)]
                const { vendor_bill_count } = record
                return !vendor_bill_count
              }
            },
            vendor_bill_count: { widget: 'statinfo', string: 'Vendor Bills' }
          }
        }
      }
    }
  }
}
