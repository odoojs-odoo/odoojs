const ModelFields = {
  amount_tax: {},
  analytic_distribution: { groups: 'analytic.group_analytic_accounting' },
  company_id: {},
  currency_id: {},
  employee_id: {},
  expense_id: {},
  name: {},
  product_has_cost: {},
  product_has_tax: {},
  product_id: {},
  tax_ids: { readonly: [['product_has_tax', '=', false]] },
  total_amount: { readonly: [['product_has_cost', '=', true]] }
}

const AddonsFields = {
  'hr.expense.split.wizard.expense_split_line_ids': ModelFields
}

export default AddonsFields

