const ModelFields = {
  logo: {},
  name: {},
  partner_id: {},

  street: {},
  street2: {},
  city: {},
  state_id: {
    domain: ({ record }) => {
      // domain="[('country_id', '=?', country_id)]"
      const { country_id } = record
      const country_id2 = country_id || [false, '']
      const country_id3 = country_id2[0]
      return [['country_id', '=?', country_id3]]
    }
  },
  zip: {},
  country_id: {},

  company_registry: {},

  currency_id: {},

  phone: {},
  mobile: {},
  email: {},
  website: {},
  parent_id: {},
  sequence: {}
}

const AddonsFields = {
  'res.company': ModelFields
}

export default AddonsFields
