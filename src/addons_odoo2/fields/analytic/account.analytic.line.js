const ModelFields = {
  account_id: {},
  amount: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  currency_id: {},
  date: {},
  name: {},
  partner_id: {},
  plan_id: {},
  product_uom_category_id: {},
  product_uom_id: {},
  unit_amount: {}
}

const AddonsFields = {
  'account.analytic.line': ModelFields
}

export default AddonsFields

