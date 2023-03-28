const ModelFields = {
  excluded_journal_ids: {
    domain({ record }) {
      // [('company_id', '=', company_id)]
      const { company_id } = record
      return [['company_id', '=', company_id]]
    }
  }
}

const AddonsFields = {
  'account.journal.group': ModelFields
}

export default AddonsFields
