const ModelFields = {
  name: { string: { en_US: 'Name', zh_CN: '名称', zh_HK: '名稱' } },
  code: { string: { en_US: 'Code', zh_CN: '编码', zh_HK: '编码' } },
  partner_id: {
    string: { en_US: 'Customer', zh_CN: '客户', zh_HK: '客户' },
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },

  plan_id: {
    string: { en_US: 'Plan', zh_CN: '计划', zh_HK: '计划' },
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },

  active: { string: { en_US: 'Active', zh_CN: '激活', zh_HK: '激活' } }
}

const AddonsFields = {
  'account.analytic.account': ModelFields
}

export default AddonsFields
