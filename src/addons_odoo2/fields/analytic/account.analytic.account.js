const ModelFields = {
  active: {},
  balance: {},
  code: {},
  company_id: { groups: 'base.group_multi_company' },
  credit: {},
  currency_id: { groups: 'base.group_multi_currency' },
  debit: {},
  name: {
    placeholder: 'e.g. Project XYZ',
    string: 'Name'
  },

  partner_id: {},
  plan_id: {}
}

const AddonsFields = {
  'account.analytic.account': ModelFields
}

export default AddonsFields

