const ModelFields = {
  city: {
    placeholder: 'City'
  },

  company_registry: {},
  country_id: {
    placeholder: 'Country'
  },

  currency_id: {
    context: {
      active_test: false
    }
  },

  email: {},
  favicon: {
    groups: 'base.group_no_one'
  },

  logo: {},
  mobile: {},
  name: {
    placeholder: 'e.g. My Company'
  },

  parent_id: {
    groups: 'base.group_multi_company'
  },

  partner_id: {
    string: 'Contact',
    groups: 'base.group_no_one'
  },

  phone: {},
  sequence: {},
  state_id: {
    placeholder: 'State'
  },

  street2: {
    placeholder: 'Street 2...'
  },

  street: {
    placeholder: 'Street...'
  },

  vat: {},
  website: {
    string: 'Website',
    placeholder: 'e.g. https://www.odoo.com'
  },

  zip: {
    placeholder: 'ZIP'
  }
}

const AddonsFields = {
  'res.company': ModelFields
}

export default AddonsFields

