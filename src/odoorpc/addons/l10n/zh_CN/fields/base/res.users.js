const ModelFields = {
  image_1920: {},
  name: { string: '用户名' },
  login: { string: '账号' },
  phone: { string: '电话' },
  email: { string: '邮箱' },
  active: { string: '激活' },
  partner_id: {},
  company_ids: {},
  company_id: { string: '公司' },
  groups_id: {},

  lang: {},

  tz: {},
  action_id: {},
  // signature: {},
  login_date: { string: '登录时间' }
}

const AddonsFields = {
  'res.users': ModelFields
}

export default AddonsFields
