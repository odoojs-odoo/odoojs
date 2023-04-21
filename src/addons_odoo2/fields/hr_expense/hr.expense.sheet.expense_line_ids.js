const ModelFields = {
  account_id: { readonly: 'True' },
  amount_tax: {
    groups: 'base.group_multi_currency',
    context: { todo_ctx: "{'default_company_id': company_id}" },
    readonly: 'True'
  },

  amount_tax_company: { readonly: 'True' },
  analytic_distribution: { groups: 'analytic.group_analytic_accounting' },
  attachment_number: {},
  company_currency_id: {},
  company_id: {},
  currency_id: { readonly: 'True' },
  date: {},
  description: {},
  employee_id: {},
  is_refused: {},
  name: {},
  product_has_cost: {},
  product_id: {},
  quantity: { readonly: [['product_has_cost', '=', false]] },
  reference: { readonly: 'True' },
  state: {},
  tax_ids: {
    string: 'Taxes',
    context: { todo_ctx: "{'default_company_id': company_id}" }
  },

  total_amount: { readonly: [['product_has_cost', '=', true]] },
  total_amount_company: {
    groups: 'base.group_multi_currency',
    readonly: 'True'
  },

  unit_amount: { readonly: [['product_has_cost', '=', false]] }
}

const AddonsFields = {
  'hr.expense.sheet.expense_line_ids': ModelFields
}

export default AddonsFields

