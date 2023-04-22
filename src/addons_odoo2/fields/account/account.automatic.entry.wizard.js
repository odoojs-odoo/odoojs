const ModelFields = {
  account_type: {},
  action: {},
  company_id: {},
  date: { string: '===todo==' },
  date_$_form_$$_449: { string: 'Recognition Date' },
  date_$_form_$$_912: { string: 'Transfer Date' },
  destination_account_id: {
    domain: { todo_ctx: "[('company_id', '=', company_id)]" },
    required: [['action', '=', 'change_account']]
  },

  display_currency_helper: {},
  expense_accrual_account: {
    string: 'Accrued Account',
    required: [['account_type', '=', 'expense'], ['action', '=', 'change_period']]
  },

  journal_id: {},
  move_line_ids: {},
  percentage: { readonly: [['action', '!=', 'change_period']] },
  preview_move_data: {},
  revenue_accrual_account: {
    string: 'Accrued Account',
    required: [['account_type', '=', 'income'], ['action', '=', 'change_period']]
  },

  total_amount: { readonly: '1' }
}

const AddonsFields = {
  'account.automatic.entry.wizard': ModelFields
}

export default AddonsFields

