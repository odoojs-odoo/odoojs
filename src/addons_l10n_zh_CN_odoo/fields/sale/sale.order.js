const ModelFields = {
  name: { string: 'Number' },
  state: {
    selection: [
      ['draft', '报价单'],
      ['sent', '已发送'],
      ['sale', '销售订单'],
      ['done', '已锁定'],
      ['cancel', '取消']
    ]
  },

  company_id: {},
  create_date: { string: 'Creation Date' },
  date_order: { string: 'Order Date' },
  commitment_date: { string: 'Delivery Date' },

  order_line: {},

  partner_id: {},

  partner_invoice_id: {},

  partner_shipping_id: {},

  fiscal_position_id: {},

  payment_term_id: {},

  pricelist_id: {},

  user_id: {},

  team_id: {},

  analytic_account_id: {},

  invoice_status: {}
}

const AddonsFields = {
  'sale.order': ModelFields
}

export default AddonsFields
