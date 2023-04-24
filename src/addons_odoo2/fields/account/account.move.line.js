const ModelFields = {
  account_id: {
    domain: { todo_ctx: "[('company_id', '=', company_id)]" },
    readonly: '1',
    groups: 'account.group_account_readonly'
  },

  account_type: {},
  amount_currency: {
    groups: 'base.group_multi_currency',
    readonly: '1'
  },

  amount_residual: {
    string: 'Residual',
    readonly: '1'
  },

  amount_residual_currency: {
    string: 'Residual in Currency',
    readonly: '1'
  },

  analytic_distribution: {
    groups: 'analytic.group_analytic_accounting',
    readonly: '1'
  },

  analytic_line_ids: {
    context: { todo_ctx: "{'tree_view_ref':'analytic.view_account_analytic_line_tree', 'default_general_account_id':account_id, 'default_name': name, 'default_date':date, 'amount': (debit or 0.0)-(credit or 0.0)}" }
  },

  balance: { readonly: '1' },
  blocked: {},
  company_currency_id: {},
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  credit: { readonly: '1' },
  currency_id: {
    string: 'Currency',
    groups: 'base.group_multi_currency',
    readonly: '1'
  },

  date: {
    groups: 'account.group_account_readonly',
    readonly: '1'
  },

  date_maturity: { readonly: '1' },
  debit: { readonly: '1' },
  discount_amount_currency: { string: 'Discount Amount' },
  discount_date: { string: 'Discount Date' },
  full_reconcile_id: {},
  is_account_reconcile: {},
  is_same_currency: {},
  journal_id: { readonly: '1' },
  matched_credit_ids: {},
  matched_debit_ids: {},
  matching_number: { readonly: '1' },
  move_id: { readonly: '1' },
  move_name: { string: 'Journal Entry' },
  move_type: {},
  name: {},
  parent_state: {},
  partner_id: {
    domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]],
    readonly: '===todo=='
  },

  partner_id_$_form: { readonly: '1' },
  partner_id_$_tree_$$_749: { readonly: [['move_type', '!=', 'entry']] },
  product_id: { readonly: '1' },
  quantity: { readonly: '1' },
  ref: { readonly: 'False' },
  sequence: {},
  statement_line_id: { readonly: 'True' },
  tax_audit: {},
  tax_ids: { readonly: '1' },
  tax_line_id: {
    readonly: '1',
    string: 'Originator Tax'
  },

  tax_tag_ids: { string: 'Tax Grids' },
  tax_tag_invert: {
    groups: 'base.group_no_one',
    readonly: '1'
  }
}

const AddonsFields = {
  'account.move.line': ModelFields
}

export default AddonsFields

