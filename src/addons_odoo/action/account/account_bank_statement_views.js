export default {
  view_bank_statement_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.bank.statement',
    type: 'form',

    arch: {
      sheet: {
        balance_end: { invisible: '1' },
        currency_id: { invisible: '1' },
        is_complete: { invisible: '1' },
        is_valid: { invisible: '1' },

        _group: {
          _group_name: {
            company_id: { groups: 'base.group_multi_company' },
            journal_id: {},
            name: {}
          },

          _group_balance: {
            date: {},
            balance_start: {},
            balance_end_real: {}
          }
        }
      }
    }
  },
  view_bank_statement_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.bank.statement',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        date: {},
        journal_id: {},
        company_id: { groups: 'base.group_multi_company' },
        balance_start: {},
        balance_end_real: {},
        balance_end: { invisible: '1' },
        currency_id: { invisible: '1' },
        is_complete: { invisible: '1' },
        is_valid: { invisible: '1' }
      }
    }
  },

  view_bank_statement_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.bank.statement',
    type: 'search',
    arch: {
      fields: {
        name: {},
        journal_id: {
          domain: [['type', 'in', ['bank', 'cash']]]
        }
      },

      filters: {
        group_active: {
          empty: { string: 'Empty', domain: [['line_ids', '=', []]] },
          invalid: {
            string: 'Invalid',
            domain: ['|', ['is_valid', '=', false], ['is_complete', '=', false]]
          }
        },

        group_date: {
          filter_date: { string: '已归档', date: 'date' }
        }
      }
    }
  },

  action_bank_statement_tree: {
    _odoo_model: 'ir.actions',
    name: 'Bank Statements',
    type: 'ir.actions.act_window',
    res_model: 'account.bank.statement',
    search_view_id: 'view_bank_statement_search',
    domain: ['|', ['journal_id', '=', false], ['journal_id.type', '=', 'bank']],
    context: { journal_type: 'bank' },
    views: {
      tree: 'view_bank_statement_tree',
      form: 'view_bank_statement_form'
    }
  },

  action_view_bank_statement_tree: {
    _odoo_model: 'ir.actions',
    name: 'Cash Registers',
    type: 'ir.actions.act_window',
    res_model: 'account.bank.statement',
    search_view_id: 'view_bank_statement_search',
    domain: ['|', ['journal_id', '=', false], ['journal_id.type', '=', 'cash']],
    context: { journal_type: 'cash' },
    views: {
      tree: 'view_bank_statement_tree',
      form: 'view_bank_statement_form'
    }
  }
}
