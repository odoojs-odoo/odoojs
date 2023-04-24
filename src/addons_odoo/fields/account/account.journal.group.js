const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  excluded_journal_ids: {
    domain({ record }) {
      // [('company_id', '=', company_id)]
      const { company_id } = record
      return [['company_id', '=', company_id]]
    }
  },
  name: { placeholder: 'e.g. GAAP, IFRS, ...' },
  sequence: { groups: 'base.group_no_one' }
}

const AddonsFields = {
  'account.journal.group': ModelFields
}

export default AddonsFields
