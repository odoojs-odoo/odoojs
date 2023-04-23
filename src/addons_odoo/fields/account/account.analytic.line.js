const ModelFields = {
  general_account_id: {
    readonly({ record }) {
      //  readonly: [['move_line_id', '!=', false]]
      const { move_line_id } = record
      return move_line_id
    }
  },
  move_line_id: {
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },
  partner_id: {},
  product_id: {
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },
  ref: {}
}

const AddonsFields = {
  'account.analytic.line': ModelFields
}

export default AddonsFields
