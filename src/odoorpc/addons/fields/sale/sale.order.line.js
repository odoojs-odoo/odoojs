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
    readonly: ({ record }) => {
      // 'readonly': [('product_updatable', '=', False)],
      const { product_updatable } = record
      return !product_updatable
    },

    required: ({ record }) => {
      // 'required': [('display_type', '=', False)],
      const { display_type } = record
      return !display_type
    },

    domain: ({ record }) => {
      // domain="[('sale_ok', '=', True),
      // '|',
      // ('company_id', '=', False),
      // ('company_id', '=', parent.company_id)]"
      const { parent: prt } = record
      return [
        ['sale_ok', '=', true],
        '|',
        ['company_id', '=', false],
        ['company_id', '=', prt.company_id]
      ]
    },

    context: ({ record }) => {
      //   context="{
      //     'partner_id': parent.partner_id,
      //     'quantity': product_uom_qty,
      //     'pricelist': parent.pricelist_id,
      //     'uom':product_uom,
      //     'company_id': parent.company_id,
      //     'default_lst_price': price_unit,
      //     'default_description_sale': name
      // }"
      const {
        parent: prt,
        product_uom_qty,
        product_uom,
        price_unit,
        name
      } = record
      return {
        partner_id: prt.partner_id,
        quantity: product_uom_qty,
        pricelist: prt.pricelist_id,
        uom: product_uom,
        company_id: prt.company_id,
        default_lst_price: price_unit,
        default_description_sale: name
      }
    }
  },

  product_template_id: {
    //  domain=[('sale_ok', '=', True)])
    domain: [['sale_ok', '=', true]]
  },

  product_uom: {
    groups: 'uom.group_uom',

    // context="{'company_id': parent.company_id}"

    readonly: ({ record }) => {
      // 'readonly': [('product_uom_readonly', '=', True)],
      const { product_uom_readonly } = record
      return product_uom_readonly
    },
    required: ({ record }) => {
      // 'required': [('display_type', '=', False)],
      const { display_type } = record
      return !display_type
    },
    domain({ record }) {
      // domain="[('category_id', '=', product_uom_category_id)]")
      const { product_uom_category_id } = record
      return [['category_id', '=', product_uom_category_id]]
    }
  },

  product_uom_qty: {
    // context="{'partner_id':parent.partner_id,
    // 'quantity':product_uom_qty, 'pricelist':parent.pricelist_id,
    // 'uom':product_uom, 'uom_qty_change':True,
    // 'company_id': parent.company_id}"
  },

  qty_delivered: {
    string: 'Delivered',
    readonly({ record }) {
      // 'readonly': [('qty_delivered_method', '!=', 'manual')]
      const { qty_delivered_method } = record
      return qty_delivered_method !== 'manual'
    }
  },

  qty_invoiced: { string: 'Invoiced' },

  price_unit: {
    readonly({ record }) {
      //'readonly': [('qty_invoiced', '&gt;', 0)]
      const { qty_invoiced } = record
      return qty_invoiced > 0
    }
  },

  product_packaging_id: {
    groups: 'product.group_stock_packaging',
    domain({ record }) {
      // domain="[('sales', '=', True), ('product_id','=',product_id)]",
      const { product_id } = record
      return [
        ['sales', '=', true],
        ['product_id', '=', product_id]
      ]
    }
  },
  product_packaging_qty: { groups: 'product.group_stock_packaging' },

  tax_id: {
    readonly({ record }) {
      //'readonly': [('qty_invoiced', '&gt;', 0)]
      const { qty_invoiced } = record
      return qty_invoiced > 0
    },
    domain({ record }) {
      // domain="[('type_tax_use','=','sale'),
      // ('company_id','=',parent.company_id),
      // ('country_id', '=', parent.tax_country_id)]"
      const { parent: prt } = record
      return [
        ['type_tax_use', '=', 'sale'],
        ['company_id', '=', prt.company_id],
        ['country_id', '=', prt.tax_country_id]
      ]
    }
    //  context="{'active_test': True}"
    //  context="{'search_view_ref': 'account.account_tax_view_search'}"
  },
  price_subtotal: { groups: 'account.group_show_line_subtotals_tax_excluded' },
  price_total: { groups: 'account.group_show_line_subtotals_tax_included' },

  discount: { groups: 'product.group_discount_per_so_line' },
  analytic_distribution: { groups: 'analytic.group_analytic_accounting' },

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
