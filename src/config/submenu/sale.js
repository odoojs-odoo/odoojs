export default {
  id: 'odoo.sale',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Sale', zh_CN: '销售', zh_HK: '销售' },
  children: [
    {
      id: 'sale_master',
      icon: 'shopping',
      theme: 'twoTone',
      name: {
        en_US: 'Sale Master',
        zh_CN: '销售主数据',
        zh_HK: '销售主数据'
      },
      children: [
        {
          action: 'sales_team.res_partner_action_customer',
          id: 'sales_team.res_partner_action_customer',
          icon: 'shopping',
          name: { en_US: 'Customers', zh_CN: '客户', zh_HK: '客户' }
        }

        // {
        //   action: 'account.product_product_action_sellable',
        //   id: 'odoo_account.product_product_action_sellable',
        //   icon: 'shopping',
        //   name: {
        //     en_US: 'Products(Sold)',
        //     zh_CN: '产品(可销售)',
        //     zh_HK: '产品(可销售)'
        //   }
        // },
        // {
        //   action: 'account.product_product_action_purchasable',
        //   id: 'odoo_account.product_product_action_purchasable',
        //   icon: 'shopping',
        //   name: {
        //     en_US: 'Products(Purchased)',
        //     zh_CN: '产品(可采购)',
        //     zh_HK: '产品(可采购)'
        //   }
        // }
      ]
    },

    {
      action: 'sale.action_quotations_with_onboarding',
      id: 'sale.action_quotations_with_onboarding',
      icon: 'shopping',
      name: { en_US: 'Quotations', zh_CN: '报价单', zh_HK: '报价单' }
    },
    {
      action: 'sale.action_orders',
      id: 'sale.action_orders',
      icon: 'shopping',
      name: { en_US: 'Sales Orders', zh_CN: '订单', zh_HK: '订单' }
    }
  ]
}
