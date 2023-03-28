const ModelFields = {
  image_1920: {},
  name: { string: { en_US: 'User_name', zh_CN: '用户名' } },
  login: { string: { en_US: 'Account', zh_CN: '账号' } },
  phone: { string: { en_US: 'Phone', zh_CN: '电话' } },
  email: { string: { en_US: 'Email', zh_CN: '邮箱' } },
  active: { string: { en_US: 'Active', zh_CN: '激活' } },
  partner_id: {},
  company_ids: {},
  company_id: { string: { en_US: 'Company', zh_CN: '公司' } },
  groups_id: {},

  lang: {},

  tz: {},
  action_id: {},
  // signature: {},
  login_date: { string: { en_US: 'Login_date', zh_CN: '登录时间' } }
}

const AddonsFields = {
  'res.users': ModelFields
}

export default AddonsFields
