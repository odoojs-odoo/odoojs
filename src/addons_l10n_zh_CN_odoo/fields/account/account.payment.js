const ModelFields = {
  name: {},
  state: {
    selection: [
      ['draft', '草稿'],
      ['posted', '过账'],
      ['cancel', '取消']
    ]
  },

  payment_type: {
    selection: [
      ['outbound', '支付'],
      ['inbound', '收款']
    ],
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  },

  partner_type: {
    selection: [
      ['customer', '客户'],
      ['supplier', '供应商']
    ]
  }
}

const AddonsFields = {
  'account.payment': ModelFields
}

export default AddonsFields
