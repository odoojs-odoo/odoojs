const ModelFields = {
  approved_by: { readonly: '1' },
  approved_on: { readonly: '1' },
  date: { readonly: '1' },
  employee_id: { readonly: '1' },
  name: { readonly: '1' },
  product_id: { readonly: '1' },
  total_amount_company: { readonly: '1' }
}

const AddonsFields = {
  'hr.expense.approve.duplicate.expense_ids': ModelFields
}

export default AddonsFields

