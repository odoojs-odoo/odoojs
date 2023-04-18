export default {
  account_invoice_view_form_inherit_payment: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_move_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//button[@id='account_invoice_payment_btn']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': ['|', '|', '|', ('state', '!=', 'posted'), ('payment_state', 'not in', ('partial', 'not_paid')), ('move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')), ('authorized_transaction_ids', '!=', [])]}"
            }
          }
        },
        _xpath_747: {
          _attr: {
            expr: "//button[@id='account_invoice_payment_btn']",
            position: 'after'
          },
          authorized_transaction_ids: {
            invisible: '1'
          },
          _button_payment_action_capture: {
            _attr: {
              name: 'payment_action_capture',
              type: 'object',
              string: 'Capture Transaction',
              groups: 'account.group_account_invoice',
              invisible: ['|', '|', ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund')], ['state', '!=', 'posted'], ['authorized_transaction_ids', '=', []]],
              class: 'oe_highlight'
            }
          },
          _button_payment_action_void: {
            _attr: {
              name: 'payment_action_void',
              type: 'object',
              string: 'Void Transaction',
              groups: 'account.group_account_invoice',
              invisible: ['|', '|', ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund')], ['state', '!=', 'posted'], ['authorized_transaction_ids', '=', []]]
            }
          }
        },
        _xpath_309: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          transaction_ids: {
            invisible: '1'
          },
          _button_action_view_payment_transactions: {
            _attr: {
              name: 'action_view_payment_transactions',
              type: 'object',
              string: 'Payment Transaction',
              icon: 'fa-money',
              invisible: [['transaction_ids', '=', []]],
              class: 'oe_stat_button'
            }
          }
        }
      }
    }
  }
}
