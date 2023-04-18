const ModelFields = {
  balance_end: {},
  balance_end_real: {},
  balance_start: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  currency_id: {},
  date: {},
  is_complete: {},
  is_valid: {},
  journal_id: {},
  name: {}
}

const AddonsFields = {
  'account.bank.statement': ModelFields
}

export default AddonsFields

