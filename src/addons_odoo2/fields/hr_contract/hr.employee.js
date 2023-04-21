const ModelFields = {
  bank_account_id: {
    context: { display_partner: true }
  },

  calendar_mismatch: {},
  contract_warning: {},
  contracts_count: {},
  employee_type: {},
  first_contract_date: { readonly: '1' },
  job_id: {},
  resource_calendar_id: { required: '1' }
}

const AddonsFields = {
  'hr.employee': ModelFields
}

export default AddonsFields

