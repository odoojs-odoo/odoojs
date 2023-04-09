const ModelFields = {
  image_1920: {},
  name: { string: 'User_name' },
  login: { string: 'Account' },
  phone: { string: 'Phone' },
  email: { string: 'Email' },
  active: { string: 'Active' },
  partner_id: {},
  company_ids: {},
  company_id: { string: 'Company' },
  groups_id: {},

  lang: {},

  tz: {},
  action_id: {},
  // signature: {},
  login_date: { string: 'Login_date' }
}

const AddonsFields = {
  'res.users': ModelFields
}

export default AddonsFields
