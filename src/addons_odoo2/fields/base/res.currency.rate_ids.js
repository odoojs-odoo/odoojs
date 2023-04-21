const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  company_rate: {},
  inverse_company_rate: {},
  name: {},
  rate: {},
  write_date: {}
}

const AddonsFields = {
  'res.currency.rate_ids': ModelFields
}

export default AddonsFields

