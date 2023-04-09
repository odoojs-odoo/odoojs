const ModelFields = {
  name: { string: '名称' },
  code: { string: '编码' },
  partner_id: { string: '客户' },

  plan_id: { string: '计划' },

  active: { string: '激活' }
}

const AddonsFields = {
  'account.analytic.account': ModelFields
}

export default AddonsFields
