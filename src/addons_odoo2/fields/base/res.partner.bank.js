const ModelFields = {
  acc_holder_name: {},
  acc_number: {},
  acc_type: {},
  active: {},
  allow_out_payment: {},
  bank_id: {},
  bank_name: {},
  company_id: { groups: 'base.group_multi_company' },
  currency_id: { groups: 'base.group_multi_currency' },
  partner_id: {},
  sequence: {}
}

const AddonsFields = {
  'res.partner.bank': ModelFields
}

export default AddonsFields

