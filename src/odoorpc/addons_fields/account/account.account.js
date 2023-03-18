const ModelFields = {
  tax_ids: {
    domain: ({ record }) => {
      const { company_id } = record
      return [['company_id', '=', company_id]]
    }
  },
  tag_ids: {
    domain: () => {
      return [['applicability', '=', 'accounts']]
    }
  },
  allowed_journal_ids: {
    domain: ({ record }) => {
      const { company_id } = record
      return [['company_id', '=', company_id]]
    }
  }
}

const AddonsFields = {
  'account.account': ModelFields
}

export default AddonsFields
