const ModelFields = {
  employee_bank_account_id: {
    readonly: [['can_edit', '=', false]],
    context: { display_partner: true }
  }
}

const AddonsFields = {
  'res.users': ModelFields
}

export default AddonsFields

