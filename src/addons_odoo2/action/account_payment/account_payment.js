export default {
  view_account_payment_form_inherit_payment: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    inherit_id: 'account.view_account_payment_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//header/button[@name='action_draft']",
            position: 'after'
          },
          amount_available_for_refund: { invisible: '1' },
          _button_action_refund_wizard: {
            _attr: {
              name: 'action_refund_wizard',
              type: 'object',
              string: 'Refund',
              groups: 'account.group_account_invoice',
              invisible: [['amount_available_for_refund', '<=', 0]],
              class: 'btn-secondary'
            }
          }
        },
        _xpath_692: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          _button_action_view_refunds: {
            _attr: {
              name: 'action_view_refunds',
              type: 'object',
              icon: 'fa-money',
              invisible: [['refunds_count', '=', 0]],
              class: 'oe_stat_button'
            },
            refunds_count: {
              string: 'Refunds',
              widget: 'statinfo'
            }
          }
        },
        _xpath_704: {
          _attr: {
            expr: '//group[2]',
            position: 'inside'
          },
          source_payment_id: { invisible: [['source_payment_id', '=', false]] },
          payment_transaction_id: {
            groups: 'base.group_no_one',
            invisible: [['use_electronic_payment_method', '!=', true]]
          }
        },
        payment_method_line_id: {
          position: 'after',
          __todo__after: {
            payment_method_code: { invisible: '1' },
            suitable_payment_token_ids: { invisible: '1' },
            use_electronic_payment_method: { invisible: '1' },
            payment_token_id: {
              invisible: [['use_electronic_payment_method', '!=', true]],
              readonly: [['state', '!=', 'draft']],
              no_create: true
            }
          }
        }
      }
    }
  }
}
