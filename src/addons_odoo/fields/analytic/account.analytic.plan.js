const ModelFields = {
  parent_id: {
    string: 'Parent',
    domain({ record }) {
      const { id: res_id, company_id } = record
      // [('id', '!=', id), ('company_id', 'in', [False, company_id])]
      return [
        ['id', '!=', res_id],
        ['company_id', 'in', [company_id, false]]
      ]
    }
  }
}

const AddonsFields = {
  'account.analytic.plan': ModelFields
}

export default AddonsFields
