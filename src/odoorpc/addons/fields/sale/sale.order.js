const ModelFields = {
  name: {},
  state: {
    selection: [
      ['draft', { en_US: 'Quotation', zh_CN: '报价单', zh_HK: '报价单' }],
      ['sent', { en_US: 'Quotation Sent', zh_CN: '已发送', zh_HK: '已发送' }],
      ['sale', { en_US: 'Sales Order', zh_CN: '销售订单', zh_HK: '销售订单' }],
      ['done', { en_US: 'Locked', zh_CN: '已锁定', zh_HK: '已锁定' }],
      ['cancel', { en_US: 'Cancelled', zh_CN: '取消', zh_HK: '取消' }]
    ]
  },

  partner_id: {
    domain({ record }) {
      // domain="[('type', '!=', 'private'),
      //   ('company_id', 'in', (False, company_id))]")
      const { company_id } = record
      return [
        ['type', '!=', 'private'],
        ['company_id', 'in', [false, company_id]]
      ]
    }
  },

  partner_invoice_id: {
    domain({ record }) {
      // domain="['|', ('company_id', '=', False),
      //   ('company_id', '=', company_id)]")
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    }
  },

  partner_shipping_id: {
    domain({ record }) {
      // domain="['|', ('company_id', '=', False),
      //   ('company_id', '=', company_id)]",)

      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    }
  }
}

const AddonsFields = {
  'sale.order': ModelFields
}

export default AddonsFields
