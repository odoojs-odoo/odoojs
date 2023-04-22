const ModelFields = {
  account_id: {
    groups: 'account.group_account_readonly',
    domain: { todo_ctx: "[('account_type', 'not in', ('asset_receivable','liability_payable','asset_cash','liability_credit_card')), ('company_id', '=', company_id)]" },
    readonly: ['|', ['is_editable', '=', false], ['sheet_is_editable', '=', false]],
    context: { todo_ctx: "{'default_company_id': company_id}" }
  },

  accounting_date: {
    groups: 'account.group_account_invoice,account.group_account_readonly',
    readonly: '0'
  },

  activity_ids: {},
  amount_tax: {},
  amount_tax_company: { groups: 'account.group_account_invoice,account.group_account_readonly' },
  analytic_distribution: {
    groups: 'analytic.group_analytic_accounting',
    readonly: [['is_editable', '=', false]]
  },

  attachment_number: {},
  company_currency_id: {},
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  currency_id: { groups: 'base.group_multi_currency' },
  currency_rate: {},
  date: { readonly: [['sheet_is_editable', '=', false]] },
  description: { placeholder: 'Notes...' },
  duplicate_expense_ids: {},
  employee_id: {
    groups: 'hr_expense.group_hr_expense_team_approver',
    context: { todo_ctx: "{'default_company_id': company_id}" }
  },

  is_editable: {},
  is_ref_editable: {},
  label_convert_rate: {},
  name: {
    readonly: [['sheet_is_editable', '=', false]],
    placeholder: 'e.g. Lunch with Customer'
  },

  payment_mode: {},
  product_description: {},
  product_has_cost: {},
  product_has_tax: {},
  product_id: {
    readonly: [['sheet_is_editable', '=', false]],
    context: {
      default_can_be_expensed: 1,
      tree_view_ref: 'hr_expense.product_product_expense_tree_view',
      form_view_ref: 'hr_expense.product_product_expense_form_view'
    },
    required: '1'
  },

  product_uom_category_id: {},
  product_uom_id: {
    groups: 'uom.group_uom',
    required: '1'
  },

  quantity: { readonly: [['sheet_is_editable', '=', false]] },
  reference: {
    groups: 'account.group_account_readonly',
    readonly: [['is_ref_editable', '=', false]]
  },

  same_currency: {},
  sheet_id: { readonly: '1' },
  sheet_is_editable: {},
  state: { readonly: '1' },
  tax_ids: {
    readonly: ['|', ['is_editable', '=', false], ['product_has_cost', '=', true]],
    context: { todo_ctx: "{'default_company_id': company_id, 'default_type_tax_use': 'purchase', 'default_price_include': 1}" },
    groups: 'account.group_account_invoice,account.group_account_readonly'
  },

  total_amount: {
    readonly: [['sheet_is_editable', '=', false]],
    groups: 'base.group_multi_currency'
  },

  total_amount_company: {},
  unit_amount: {
    readonly: ['|', ['sheet_is_editable', '=', false], ['product_has_cost', '=', true]],
    required: '1'
  },

  unit_amount_display: { string: 'Unit Price' }
}

const AddonsFields = {
  'hr.expense': ModelFields
}

export default AddonsFields

