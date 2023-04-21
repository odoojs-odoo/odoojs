const ModelFields = {
  expense_manager_id: {
    readonly: [['can_edit', '=', false]],
    context: { todo_ctx: "{'default_company_id': company_id}" }
  }
}

const AddonsFields = {
  'res.users': ModelFields
}

export default AddonsFields

