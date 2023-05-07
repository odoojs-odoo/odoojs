const ModelFields = {
  display_name: { string: '名称' },
  name: { string: '名称' },
  bic: { string: '编码' },

  street: {},
  street2: {},
  city: {},
  state: { string: '州省' },
  zip: {},
  country: {},

  phone: {},
  email: {},
  active: {}
}

const PartnerBankFields = {
  display_name: {},
  sequence: {},
  acc_type: {},
  acc_number: {},
  partner_id: { string: '參與人' },
  company_id: { string: '公司' },
  bank_id: {},
  acc_holder_name: {},
  active: {}
}
const AddonsFields = {
  'res.bank': ModelFields,
  'res.partner.bank': PartnerBankFields
}

export default AddonsFields
