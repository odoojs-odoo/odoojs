export default {
  id: 'odoo.analytic',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Analytic', zh_CN: '辅助核算', zh_HK: '辅助核算' },
  children: [
    {
      action: 'analytic.account_analytic_plan_action',
      id: 'odoo_analytic.account_analytic_plan_action',
      icon: 'shopping',
      name: { en_US: 'Analytic Plans', zh_CN: '分析计划', zh_HK: '分析计划' }
    },

    {
      action: 'analytic.action_analytic_distribution_model',
      id: 'odoo_analytic.action_analytic_distribution_model',
      icon: 'shopping',
      name: {
        en_US: 'Analytic Distribution Models',
        zh_CN: '分析分配模型',
        zh_HK: '分析分配模型'
      }
    },

    {
      action: 'analytic.action_account_analytic_account_form',
      id: 'odoo_analytic.action_account_analytic_account_form',
      icon: 'shopping',
      name: { en_US: 'Analytic Accounts', zh_CN: '分析科目', zh_HK: '分析科目' }
    }

    //   {
    //     action: 'product.action_partner_of_contact_organization',
    //     id: 'odoo_product.action_partner_of_contact_organization',
    //     icon: 'shopping',
    //     name: {
    //       en_US: 'Partner Organization',
    //       zh_CN: '联系人(组织)',
    //       zh_HK: '联系人(组织)'
    //     }
    //   },
    //   {
    //     action: 'product.product_category_action_form',
    //     id: 'odoo_product.product_category_action_form',
    //     icon: 'shopping',
    //     name: {
    //       en_US: 'Product Categories',
    //       zh_CN: '产品类别',
    //       zh_HK: '产品类别'
    //     }
    //   },
    //   {
    //     action: 'product.product_tag_action',
    //     id: 'odoo_product.product_tag_action',
    //     icon: 'shopping',
    //     name: { en_US: 'Product Tags', zh_CN: '产品标签', zh_HK: '产品标签' }
    //   },
    //   {
    //     action: 'product.product_supplierinfo_type_action',
    //     id: 'odoo_product.product_supplierinfo_type_action',
    //     icon: 'shopping',
    //     name: {
    //       en_US: 'Vendor Pricelists',
    //       zh_CN: '供应商价格表',
    //       zh_HK: '供应商价格表'
    //     }
    //   },
    //   {
    //     action: 'product.product_product_action_sellable',
    //     id: 'odoo_product.product_product_action_sellable',
    //     icon: 'shopping',
    //     name: {
    //       en_US: 'Products(Sellable)',
    //       zh_CN: '产品(可销售)',
    //       zh_HK: '产品(可销售)'
    //     }
    //   },
    //   {
    //     action: 'product.product_product_action_purchasable',
    //     id: 'odoo_product.product_product_action_purchasable',
    //     icon: 'shopping',
    //     name: {
    //       en_US: 'Products(Purchasable)',
    //       zh_CN: '产品(可采购)',
    //       zh_HK: '产品(可采购)'
    //     }
    //   }
  ]
}
