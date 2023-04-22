export default {
  view_account_move_reversal: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.reversal',
    type: 'form',
    arch: {
      sheet: {
        residual: { invisible: '1' },
        company_id: { invisible: '1' },
        move_ids: { invisible: '1' },
        move_type: { invisible: '1' },
        available_journal_ids: { invisible: '1' },
        _group: {
          _group: {
            _attr: { invisible: ['|', ['move_type', 'not in', ('out_invoice', 'in_invoice')], ['residual', '=', 0]] },
            refund_method: {
              widget: 'radio',
              readonly: [['residual', '=', 0]]
            }
          },
          _group_592: {
            _attr: { invisible: ['|', ['move_type', 'not in', ('out_invoice', 'in_invoice', 'some_invoice')], ['residual', '=', 0]] },
            _div: {
              _attr: {
                invisible: [['refund_method', '!=', 'refund']],
                class: 'oe_grey',
                text: 'The credit note is created in draft and can be edited before being issued.'
              }
            },
            _div_905: {
              _attr: {
                invisible: [['refund_method', '!=', 'cancel']],
                class: 'oe_grey',
                text: 'The credit note is auto-validated and reconciled with the invoice.'
              }
            },
            _div_610: {
              _attr: {
                invisible: [['refund_method', '!=', 'modify']],
                class: 'oe_grey',
                text: 'The credit note is auto-validated and reconciled with the invoice.\n                               The original invoice is duplicated as a new draft.'
              }
            }
          }
        },
        _group_964: {
          _group: {
            reason: { invisible: [['move_type', '=', 'entry']] },
            date_mode: {
              string: 'Reversal Date',
              widget: 'radio'
            }
          },
          _group_979: {
            journal_id: {
              domain: { todo_ctx: "[('id', 'in', available_journal_ids)]" }
            },
            date: {
              string: 'Refund Date',
              invisible: ['|', ['move_type', 'not in', ('out_invoice', 'in_invoice')], ['date_mode', '!=', 'custom']],
              required: [['date_mode', '=', 'custom']]
            },
            _field_date_606: {
              date: {
                invisible: ['|', ['move_type', 'in', ('out_invoice', 'in_invoice')], ['date_mode', '!=', 'custom']],
                required: [['date_mode', '=', 'custom']]
              }
            }
          }
        },
        _footer: {
          _button_reverse_moves: {
            _attr: {
              name: 'reverse_moves',
              type: 'object',
              string: 'Reverse',
              class: 'btn-primary'
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

  action_view_account_move_reversal: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Reverse',
    res_model: 'account.move.reversal',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'view_account_move_reversal',
      form: '=======todo=========='
    }
  }
}
