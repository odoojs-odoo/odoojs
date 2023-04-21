const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  company_rate: {},
  currency_id: {},
  inverse_company_rate: {},
  name: {},
  rate: { groups: 'base.group_no_one' },
  write_date: {}
}

const AddonsFields = {
  'res.currency.rate': ModelFields
}

export default AddonsFields

