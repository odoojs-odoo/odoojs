const ModelFields = {
  available_payment_method_ids: {},
  company_id: {},
  name: {},
  payment_account_id: {
    string: 'Outstanding Payments accounts',
    groups: 'account.group_account_readonly',
    placeholder: 'Leave empty to use the default outstanding account'
  },

  payment_method_id: {},
  payment_type: {},
  sequence: {}
}

const AddonsFields = {
  'account.journal.outbound_payment_method_line_ids': ModelFields
}

export default AddonsFields

