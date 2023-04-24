const ModelFields = {
  accesses_count: { string: 'Access Rights' },
  action_id: {},
  active: { string: 'Active' },
  active_partner: { required: 0, readonly: '1' },
  api_key_ids: { readonly: 0 },
  avatar_128: {},
  companies_count: { string: 'Companies count' },
  company_id: {
    // string: 'Default Company',
    groups: 'base.group_multi_company',
    readonly: 0,
    context: { user_preference: 0 }
  },
  company_ids: { string: 'Allowed Companies' },
  email: { readonly: 0 },
  groups_count: { string: 'Groups' },
  groups_id: {},
  image_1920: { readonly: 0 },
  lang: { required: '1', readonly: 0 },
  login: { placeholder: 'e.g. email@yourcompany.com' },
  login_date: { string: 'Login_date' },
  mobile: {},
  name: {
    required: '1',
    placeholder: 'e.g. John Doe',
    readonly: '1'
  },
  partner_id: {
    required: 0,
    readonly: '1',
    groups: 'base.group_no_one'
  },
  phone: {},
  rules_count: { string: 'Record Rules' },
  share: {},
  signature: { readonly: 0 },
  tz: { readonly: 0 },
  tz_offset: {}
}

const AddonsFields = {
  'res.users': ModelFields
}

export default AddonsFields
