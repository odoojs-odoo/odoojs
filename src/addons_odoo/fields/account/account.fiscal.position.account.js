const ModelFields = {
  account_dest_id: {
    domain: {
      domain: ({ record }) => {
        // domain="['|', ('company_id', '=', False),
        // ('company_id', '=', parent.company_id)]"
        const { parent: parent2 } = record
        return [
          '|',
          ['company_id', '=', false],
          ['company_id', '=', parent2.company_id]
        ]
      }
    }
  },

  account_src_id: {
    domain: ({ record }) => {
      // domain="['|', ('company_id', '=', False),
      // ('company_id', '=', parent.company_id)]
      const { parent: parent2 } = record
      return [
        '|',
        ['company_id', '=', false],
        ['company_id', '=', parent2.company_id]
      ]
    }
  }
}

const AddonsFields = {
  'account.fiscal.position.account_ids': ModelFields
}

export default AddonsFields
