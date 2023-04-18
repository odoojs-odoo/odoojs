const ModelFields = {
  acc_number: {
    placeholder: 'e.g BE15001559627230'
  },

  bank_bic: {
    string: 'Bank Identifier Code',
    placeholder: 'e.g GEBABEBB'
  },

  bank_id: {
    placeholder: 'e.g Bank of America'
  },

  company_id: {},
  journal_id: {},
  linked_journal_id: {},
  num_journals_without_account: {}
}

const AddonsFields = {
  'account.setup.bank.manual.config': ModelFields
}

export default AddonsFields

