const ModelFields = {
  active: {},
  bic: {},
  city: { placeholder: 'City' },
  country: { placeholder: 'Country' },
  display_name: { disable_field_onchange: 1 },
  email: {},
  name: {},
  phone: {},
  state: {
    placeholder: 'State',
    // domain="[('country_id', '=?', country_id)]"
    domain: ({ record }) => {
      const { country } = record
      // console.log([record, country && country[0]])
      return [['country_id', '=?', country]]
    }
  },
  street: { placeholder: 'State' },
  street2: { placeholder: 'Street 2...' },
  zip: {}
}

const AddonsFields = {
  'res.bank': ModelFields
}

export default AddonsFields
