const ModelFields = {
  image_1920: {},
  name: { string: { en_US: 'User_name', zh_CN: '用户名' } },
  login: { string: { en_US: 'Account', zh_CN: '账号' } },
  phone: { string: { en_US: 'Phone', zh_CN: '电话' } },
  partner_id: {},
  company_ids: {},
  company_id: { string: { en_US: 'Company', zh_CN: '公司' } },
  groups_id: {},

  lang: {},

  tz: {},
  action_id: {}
  // signature: {}
  // login_date: {}
}

const AddonsFields = {
  'res.users': ModelFields
}

export default AddonsFields
