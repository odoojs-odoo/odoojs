const ModelFields = {
  name: { string: 'Name' },
  code: { string: 'Code' },
  partner_id: {
    string: 'Customer',
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },

  plan_id: {
    string: 'Plan',
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },

  active: { string: 'Active' }
}

const AddonsFields = {
  'account.analytic.account': ModelFields
}

export default AddonsFields
