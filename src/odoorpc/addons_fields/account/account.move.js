const ModelFields = {
  name: {},
  state: {
    selection: [
      ['draft', { en_US: 'Draft', zh_CN: '草稿', zh_HK: '草稿' }],
      ['posted', { en_US: 'Posted', zh_CN: '过账', zh_HK: '过账' }],
      ['cancel', { en_US: 'Cancelled', zh_CN: '取消', zh_HK: '取消' }]
    ]
  },

  partner_id: {
    domain({ record }) {
      // [('company_id', 'in', [company_id, False])]

      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },

  partner_shipping_id: {
    domain({ record }) {
      // ['|', ('company_id', '=', False), ('company_id', '=', company_id)]

      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    }
  }
}

const AddonsFields = {
  'account.move': ModelFields
}

export default AddonsFields
