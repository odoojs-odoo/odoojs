export default {
  account_automatic_entry_wizard_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.automatic.entry.wizard',
    type: 'form',
    arch: {
      sheet: {
        account_type: { invisible: '1' },
        company_id: { invisible: '1' },
        move_line_ids: { invisible: '1' },
        display_currency_helper: { invisible: '1' },
        _div: {
          _attr: {
            invisible: [['display_currency_helper', '=', false]],
            class: 'alert alert-info text-center',
            text: 'The selected destination account is set to use a specific currency. Every entry transferred to it will be converted into this currency, causing\n                        the loss of any pre-existing foreign currency amount.'
          }
        },
        action: {
          widget: 'radio',
          invisible: "context.get['hide_automatic_options']",
          options: "{'horizontal': true}"
        },
        _group: {
          _group: {
            _attr: { invisible: [['action', '!=', 'change_period']] },
            date: { string: 'Recognition Date' },
            expense_accrual_account: {
              string: 'Accrued Account',
              invisible: [['account_type', '!=', 'expense']],
              required: [['account_type', '=', 'expense'], ['action', '=', 'change_period']]
            },
            revenue_accrual_account: {
              string: 'Accrued Account',
              invisible: [['account_type', '!=', 'income']],
              required: [['account_type', '=', 'income'], ['action', '=', 'change_period']]
            }
          },
          _group_833: {
            _attr: { invisible: [['action', '!=', 'change_account']] },
            date: { string: 'Transfer Date' },
            destination_account_id: {
              domain: { todo_ctx: "[('company_id', '=', company_id)]" },
              required: [['action', '=', 'change_account']]
            }
          },
          _group_744: {
            _label_total_amount: {
              for: 'total_amount',
              string: 'Adjusting Amount',
              invisible: [['action', '!=', 'change_period']]
            },
            _div: {
              _attr: { invisible: [['action', '!=', 'change_period']] },
              percentage: { readonly: [['action', '!=', 'change_period']] },
              _span: {
                _attr: { class: 'px-3' }
              },
              total_amount: { class: 'oe_inline' }
            },
            total_amount: {
              invisible: [['action', '=', 'change_period']],
              readonly: '1'
            },
            journal_id: {}
          }
        },
        _label_preview_move_data: {
          for: 'preview_move_data',
          string: 'The following Journal Entries will be generated'
        },
        preview_move_data: {
          widget: 'grouped_view_widget',
          class: 'd-block'
        },
        _footer: {
          _button_do_action: {
            _attr: {
              name: 'do_action',
              type: 'object',
              string: 'Create Journal Entries',
              class: 'oe_highlight'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn btn-secondary'
            }
          }
        }
      }
    }
  },

  account_automatic_entry_wizard_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Create Automatic Entries for selected Journal Items',
    res_model: 'account.automatic.entry.wizard',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
