const ModelFields = {
  account_id: {
    domain: {
      todo_ctx: "[('company_id', '=', company_id)]"
    },
    groups: 'account.group_account_readonly'
  },

  account_type: {},
  amount_currency: {
    groups: 'base.group_multi_currency'
  },

  amount_residual: {
    string: 'Residual'
  },

  amount_residual_currency: {
    string: 'Residual in Currency'
  },

  analytic_distribution: {
    groups: 'analytic.group_analytic_accounting'
  },

  analytic_line_ids: {
    context: {
      todo_ctx: "{'tree_view_ref':'analytic.view_account_analytic_line_tree', 'default_general_account_id':account_id, 'default_name': name, 'default_date':date, 'amount': (debit or 0.0)-(credit or 0.0)}"
    }
  },

  balance: {},
  blocked: {},
  company_currency_id: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  credit: {},
  currency_id: {
    string: 'Currency',
    groups: 'base.group_multi_currency'
  },

  date: {
    groups: 'account.group_account_readonly'
  },

  date_maturity: {},
  debit: {},
  discount_amount_currency: {
    string: 'Discount Amount'
  },

  discount_date: {
    string: 'Discount Date'
  },

  full_reconcile_id: {},
  is_account_reconcile: {},
  is_same_currency: {},
  journal_id: {},
  matched_credit_ids: {},
  matched_debit_ids: {},
  matching_number: {},
  move_id: {},
  move_name: {
    string: 'Journal Entry'
  },

  move_type: {},
  name: {},
  parent_state: {},
  partner_id: {
    domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]],
    readonly: [['move_type', '!=', 'entry']]
  },

  product_id: {},
  quantity: {},
  ref: {},
  sequence: {},
  statement_line_id: {},
  tax_audit: {},
  tax_ids: {},
  tax_line_id: {
    string: 'Originator Tax'
  },

  tax_tag_ids: {
    string: 'Tax Grids'
  },

  tax_tag_invert: {
    groups: 'base.group_no_one'
  }
}

const AddonsFields = {
  'account.move.line': ModelFields
}

export default AddonsFields

