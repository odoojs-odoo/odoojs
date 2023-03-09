const ModelFields = {
  name: {},
  bic: {},

  street: {},
  street2: {},
  city: {},
  state: {
    string: '州省',
    // domain="[('country_id', '=?', country_id)]"
    domain: ({ record }) => {
      const { country_id } = record
      return [['country_id', '=?', country_id]]
    }
  },
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
  partner_id: {},
  company_id: {},
  bank_id: {},
  acc_holder_name: {},
  active: {}
}
const AddonsFields = {
  'res.bank': ModelFields,
  'res.partner.bank': PartnerBankFields
}

export default AddonsFields
