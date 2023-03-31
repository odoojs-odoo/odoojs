const ModelFields = {
  //   name: {},
  //   state: {
  //     selection: [
  //       ['draft', { en_US: 'Quotation', zh_CN: '报价单', zh_HK: '报价单' }],
  //       ['sent', { en_US: 'Quotation Sent', zh_CN: '已发送', zh_HK: '已发送' }],
  //       ['sale', { en_US: 'Sales Order', zh_CN: '销售订单', zh_HK: '销售订单' }],
  //       ['done', { en_US: 'Locked', zh_CN: '已锁定', zh_HK: '已锁定' }],
  //       ['cancel', { en_US: 'Cancelled', zh_CN: '取消', zh_HK: '取消' }]
  //     ]
  //   },

  product_id: {
    domain({ record }) {
      // domain="[('sale_ok', '=', True), '|',
      //   ('company_id', '=', False), ('company_id', '=', company_id)]")
      const { company_id } = record
      return [
        ['sale_ok', '=', true],
        '|',
        ['company_id', '=', false],
        ['company_id', '=', company_id]
      ]
    }
  },

  product_template_id: {
    //  domain=[('sale_ok', '=', True)])
    domain: [['sale_ok', '=', true]]
  },

  product_uom: {
    domain({ record }) {
      // domain="[('category_id', '=', product_uom_category_id)]")
      const { product_uom_category_id } = record
      return [['category_id', '=', product_uom_category_id]]
    }
  },

  product_packaging_id: {
    domain({ record }) {
      // domain="[('sales', '=', True), ('product_id','=',product_id)]",
      const { product_id } = record
      return [
        ['sales', '=', true],
        ['product_id', '=', product_id]
      ]
    }
  },

  qty_delivered_method: {
    selection: [
      ['manual', { en_US: 'Manual', zh_CN: '手工', zh_HK: '手工' }],
      [
        'analytic',
        {
          en_US: 'Analytic From Expenses',
          zh_CN: '根据费用分析',
          zh_HK: '根据费用分析'
        }
      ]
    ]
  },

  invoice_status: {
    selection: [
      [
        'upselling',
        { en_US: 'Upselling Opportunity', zh_CN: '超卖', zh_HK: '超卖' }
      ],
      [
        'invoiced',
        { en_US: 'Fully Invoiced', zh_CN: '已开票', zh_HK: '已开票' }
      ],
      [
        'to invoice',
        { en_US: 'To Invoice', zh_CN: '部分开票', zh_HK: '部分开票' }
      ],
      ['no', { en_US: 'Nothing to Invoice', zh_CN: '未开票', zh_HK: '未开票' }]
    ]
  }
}

const AddonsFields = {
  'sale.order.line': ModelFields
}

export default AddonsFields
