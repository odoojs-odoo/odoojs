const ModelFields = {
  name: {},
  state: {
    selection: [
      ['draft', { en_US: 'Draft', zh_CN: '草稿', zh_HK: '草稿' }],
      ['posted', { en_US: 'Posted', zh_CN: '过账', zh_HK: '过账' }],
      ['cancel', { en_US: 'Cancelled', zh_CN: '取消', zh_HK: '取消' }]
    ]
  },

  payment_type: {
    selection: [
      ['outbound', { en_US: 'Send', zh_CN: '支付', zh_HK: '支付' }],
      ['inbound', { en_US: 'Receive', zh_CN: '收款', zh_HK: '收款' }]
    ]
  },

  partner_type: {
    selection: [
      ['customer', { en_US: 'Customer', zh_CN: '客户', zh_HK: '客户' }],
      ['supplier', { en_US: 'Vendor', zh_CN: '供应商', zh_HK: '供应商' }]
    ]
  },

  //   [('type', 'in', ('bank','cash')),
  //   ('company_id', '=', company_id), ('id', '!=', journal_id)]

  destination_journal_id: {
    domain({ record }) {
      // domain="[('type', 'in', ('bank','cash')),
      //   ('company_id', '=', company_id), ('id', '!=', journal_id)]",
      const { company_id, journal_id } = record
      return [
        ['type', 'in', ['bank', 'cash']],
        ['company_id', '=', company_id],
        ['id', '!=', journal_id]
      ]
    }
  },

  payment_method_line_id: {
    domain({ record }) {
      //  domain="[('id', 'in', available_payment_method_line_ids)]"
      const { available_payment_method_line_ids } = record
      return [['id', 'in', available_payment_method_line_ids]]
    }
  },

  partner_id: {
    // domain="['|', ('parent_id','=', False), ('is_company','=', True)]",
    domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]]
  }
}

const AddonsFields = {
  'account.payment': ModelFields
}

export default AddonsFields
