export default {
  payment_transaction_form: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.transaction',
    inherit_id: 'payment.payment_transaction_form',
    arch: {
      sheet: {
        _button_action_view_refunds: {
          _attr: {
            name: 'action_view_refunds'
          },
          _button_action_view_invoices: {
            _attr: {
              name: 'action_view_invoices',
              invisible: [['invoices_count', '=', 0]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-money'
            },
            invoices_count: {
              string: 'Invoice(s)',
              widget: 'statinfo'
            }
          }
        },
        reference: {
          __todo__after: {
            payment_id: {}
          }
        }
      }
    }
  }
}
