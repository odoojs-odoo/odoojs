const ModelFields = {
  accesses_count: {
    string: 'Access Rights'
  },

  action_id: {},
  active: {},
  active_partner: {},
  api_key_ids: {},
  avatar_128: {},
  companies_count: {
    string: 'Companies count'
  },

  company_id: {
    groups: 'base.group_multi_company',
    context: {
      user_preference: 0
    },
    string: 'Default Company'
  },

  company_ids: {
    string: 'Allowed Companies'
  },

  email: {},
  groups_count: {
    string: 'Groups'
  },

  groups_id: {},
  id: {},
  image_1920: {},
  lang: {},
  login: {
    placeholder: 'e.g. email@yourcompany.com'
  },

  login_date: {},
  mobile: {},
  name: {
    placeholder: 'e.g. John Doe'
  },

  partner_id: {
    groups: 'base.group_no_one'
  },

  phone: {},
  rules_count: {
    string: 'Record Rules'
  },

  share: {},
  signature: {},
  tz: {},
  tz_offset: {}
}

const AddonsFields = {
  'res.users': ModelFields
}

export default AddonsFields

