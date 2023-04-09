const ModelFields = {
  name: {},
  state: {
    selection: [
      ['draft', '报价单'],
      ['sent', '已发送'],
      ['sale', '销售订单'],
      ['done', '已锁定'],
      ['cancel', '取消']
    ]
  },

  product_id: {},

  product_template_id: {},

  product_uom: {},

  product_uom_qty: {},

  qty_delivered: { string: 'Delivered' },

  qty_invoiced: { string: 'Invoiced' },

  price_unit: {},

  product_packaging_id: {},
  product_packaging_qty: {},

  tax_id: {},
  price_subtotal: {},
  price_total: {},

  discount: {},
  analytic_distribution: {},

  qty_delivered_method: {
    selection: [
      ['manual', '手工'],
      ['analytic', '根据费用分析']
    ]
  },

  invoice_status: {
    selection: [
      ['upselling', '超卖'],
      ['invoiced', '已开票'],
      ['to invoice', '部分开票'],
      ['no', '未开票']
    ]
  }
}

const AddonsFields = {
  'sale.order.line': ModelFields
}

export default AddonsFields
