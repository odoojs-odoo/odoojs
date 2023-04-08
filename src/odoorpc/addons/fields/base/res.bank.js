const ModelFields = {
  display_name: {
    disable_field_onchange: 1,
    string: 'Name'
  },
  name: { string: 'Name' },
  bic: { string: 'Code' },

  street: {},
  street2: {},
  city: {},
  state: {
    string: 'States',
    // domain="[('country_id', '=?', country_id)]"
    domain: ({ record }) => {
      const { country } = record
      // console.log([record, country && country[0]])
      return [['country_id', '=?', country]]
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
  partner_id: { string: 'Partner' },
  company_id: { string: 'Company' },
  bank_id: {},
  acc_holder_name: {},
  active: {}
}
const AddonsFields = {
  'res.bank': ModelFields,
  'res.partner.bank': PartnerBankFields
}

export default AddonsFields
