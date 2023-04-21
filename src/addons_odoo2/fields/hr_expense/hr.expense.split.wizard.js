const ModelFields = {
  currency_id: {},
  expense_id: {},
  expense_split_line_ids: {
    context: { todo_ctx: "{'default_expense_id': expense_id}" }
  },

  split_possible: {},
  total_amount: {},
  total_amount_original: { string: 'Original Amount' },
  total_amount_taxes: { string: 'Taxes' }
}

const AddonsFields = {
  'hr.expense.split.wizard': ModelFields
}

export default AddonsFields

