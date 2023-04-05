const ModelFields = {
  product_id: {
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },

  move_line_id: {
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  }
}

const AddonsFields = {
  'account.analytic.line': ModelFields
}

export default AddonsFields
