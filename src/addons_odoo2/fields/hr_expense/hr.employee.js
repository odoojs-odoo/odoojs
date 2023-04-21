const ModelFields = {
  expense_manager_id: {
    context: { todo_ctx: "{'default_company_id': company_id}" },
    string: 'Expense Approver'
  }
}

const AddonsFields = {
  'hr.employee': ModelFields
}

export default AddonsFields

