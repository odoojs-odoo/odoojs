export default {
  setup_bank_account_wizard: {
    _odoo_model: 'ir.ui.view',
    model: 'account.setup.bank.manual.config',
    type: 'form',
    arch: {
      sheet: {
        num_journals_without_account: { invisible: '1' },
        journal_id: { invisible: '1' },
        company_id: { invisible: '1' },
        linked_journal_id: { invisible: '1' },
        _footer: {
          _button_validate: {
            _attr: {
              name: 'validate',
              type: 'object',
              string: 'Create',
              class: 'oe_highlight'
            }
          },
          _button: {
            _attr: { string: 'Cancel' }
          }
        },
        _group: {
          _group: {
            acc_number: { placeholder: 'e.g BE15001559627230' },
            bank_id: { placeholder: 'e.g Bank of America' },
            bank_bic: {
              string: 'Bank Identifier Code',
              placeholder: 'e.g GEBABEBB'
            }
          }
        },
        _group_663: {
          _attr: { invisible: [['num_journals_without_account', '=', 0]] },
          _group: {
            linked_journal_id: { no_create: true }
          },
          _group_444: {
            _span: {
              _attr: {
                class: 'text-muted',
                text: 'Leave empty to create a new journal for this bank account, or select a journal to link it with the bank account.'
              }
            }
          }
        }
      }
    }
  }
}
