const ModelFields = {
  avatar_128: {},
  city: {
    placeholder: 'City'
  },

  color: {},
  comment: {
    placeholder: 'Internal notes...'
  },

  company_id: {},
  country_id: {
    placeholder: 'Country'
  },

  display_name: {},
  email: {},
  function: {
    placeholder: 'e.g. Sales Director'
  },

  id: {},
  image_128: {},
  is_company: {},
  lang: {},
  mobile: {},
  name: {
    string: 'Contact Name',
    required: [['type', '=', 'contact']]
  },

  parent_id: {},
  phone: {},
  state_id: {
    context: {
      todo_ctx: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}"
    },
    placeholder: 'State'
  },

  street2: {
    placeholder: 'Street 2...'
  },

  street: {
    placeholder: 'Street...'
  },

  title: {
    placeholder: 'e.g. Mr.'
  },

  type: {
    required: '1'
  },

  user_id: {},
  zip: {
    placeholder: 'ZIP'
  }
}

const AddonsFields = {
  'res.partner.child_ids': ModelFields
}

export default AddonsFields

