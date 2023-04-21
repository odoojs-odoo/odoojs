const ModelFields = {
  account_move_id: {},
  accounting_date: {
    groups: '===todo==',
    readonly: [['state', 'in', ['post', 'done']]]
  },

  accounting_date_$_form: { groups: 'account.group_account_invoice,account.group_account_readonly' },
  accounting_date_$_tree: { groups: 'account.group_account_manager' },
  activity_ids: { readonly: '1' },
  address_id: {
    context: { todo_ctx: "{'default_company_id': company_id}" }
  },

  amount_residual: {},
  bank_journal_id: {
    groups: 'account.group_account_invoice,account.group_account_readonly',
    context: { todo_ctx: "{'default_company_id': company_id}" }
  },

  can_approve: {},
  can_reset: {},
  company_id: { groups: 'base.group_multi_company' },
  create_date: {},
  currency_id: {},
  department_id: {
    context: { todo_ctx: "{'default_company_id': company_id}" }
  },

  employee_id: {
    context: { todo_ctx: "{'default_company_id': company_id}" }
  },

  expense_line_ids: {
    domain: { todo_ctx: "[('state', '=', 'draft'), ('employee_id', '=', employee_id), ('company_id', '=', company_id)]" },
    readonly: [['is_editable', '=', false]],
    context: { todo_ctx: "{'form_view_ref' : 'hr_expense.hr_expense_view_form_without_header', 'default_company_id': company_id, 'default_employee_id': employee_id}" }
  },

  expense_number: { string: 'Expenses' },
  is_editable: {},
  journal_id: {
    groups: 'account.group_account_invoice,account.group_account_readonly',
    context: { todo_ctx: "{'default_company_id': company_id}" }
  },

  name: {
    readonly: [['is_editable', '=', false]],
    placeholder: 'e.g. Trip to NY',
    string: 'Expense Report'
  },

  payment_mode: {},
  payment_state: {},
  product_ids: {},
  state: {},
  total_amount: {},
  total_amount_taxes: {},
  untaxed_amount: {},
  user_id: {}
}

const AddonsFields = {
  'hr.expense.sheet': ModelFields
}

export default AddonsFields

