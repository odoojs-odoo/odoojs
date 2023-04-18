export default {
  account_analytic_account_view_form_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    inherit_id: 'analytic.view_account_analytic_account_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box'
          },
          _button_action_view_invoice: {
            _attr: {
              name: 'action_view_invoice',
              type: 'object',
              icon: 'fa-pencil-square-o',
              invisible: [['invoice_count', '=', 0]],
              class: 'oe_stat_button'
            },
            invoice_count: {
              string: 'Customer Invoices',
              widget: 'statinfo'
            }
          },
          _button_action_view_vendor_bill: {
            _attr: {
              name: 'action_view_vendor_bill',
              type: 'object',
              icon: 'fa-file-text-o',
              invisible: [['vendor_bill_count', '=', 0]],
              class: 'oe_stat_button'
            },
            vendor_bill_count: {
              string: 'Vendor Bills',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  }
}
