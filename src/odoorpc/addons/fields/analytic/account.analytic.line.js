const ModelFields = {
  product_uom_id: {
    domain({ record }) {
      // [('category_id', '=', product_uom_category_id)]
      const { product_uom_category_id } = record
      return [['category_id', '=', product_uom_category_id]]
    }
  },

  account_id: {
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },

  partner_id: {
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
