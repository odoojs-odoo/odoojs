export default {
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
      name: { string: 'Bank Statement' },
      date: {},
      _filter_empty: {
        _attr: {
          name: 'empty',
          string: 'Empty',
          domain: [['line_ids', '=', []]]
        }
      },
      _filter_invalid: {
        _attr: {
          name: 'invalid',
          string: 'Invalid',
          domain: ['|', ['is_valid', '=', false], ['is_complete', '=', false]]
        }
      },
      _separator: {},
      _filter_filter_date: {
        _attr: {
          name: 'filter_date',
          date: 'date'
        }
      },
      journal_id: { domain: [['type', 'in', ('bank', 'cash')]] },
      _group: {
        _attr: { string: 'Group By' },
        _filter_journal: {
          _attr: {
            name: 'journal',
            string: 'Journal',
            context: { group_by: 'journal_id' }
          }
        },
        _filter_date: {
          _attr: {
            name: 'date',
            string: 'Date',
            context: { group_by: 'date' }
          }
        }
      }
    }
  },

  action_bank_statement_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Bank Statements',
    res_model: 'account.bank.statement',
    search_view_id: 'view_bank_statement_search',
    domain: "['|', ['journal_id', '=', False], ['journal_id.type', '=', 'bank']]",
    context: { journal_type: 'bank' },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_bank_statement_tree_bank: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'view_bank_statement_tree',
    act_window_id: 'action_bank_statement_tree'
  },

  account_bank_statement_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'account.bank.statement',
    type: 'otherview',
    arch: {}
  },

  account_bank_statement_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'account.bank.statement',
    type: 'otherview',
    arch: {}
  },

  action_view_bank_statement_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Cash Registers',
    type: 'ir.actions.act_window',
    res_model: 'account.bank.statement',
    search_view_id: 'view_bank_statement_search',
    domain: "['|', ['journal_id', '=', False], ['journal_id.type', '=', 'cash']]",
    context: { journal_type: 'cash' },
    views: {
      tree: 'view_bank_statement_tree',
      form: '=======todo=========='
    }
  }
}
