export default {
  id: 'odoo.product',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Product', zh_CN: '产品', zh_HK: '产品' },
  children: [
    {
      action: 'product.action_contacts',
      id: 'odoo_product.action_contacts',
      icon: 'shopping',
      name: { en_US: 'Partner', zh_CN: '联系人', zh_HK: '联系人' }
    },
    {
      action: 'product.product_supplierinfo_type_action',
      id: 'odoo_product.product_supplierinfo_type_action',
      icon: 'shopping',
      name: {
        en_US: 'Vendor Pricelists',
        zh_CN: '供应商价格表',
        zh_HK: '供应商价格表'
      }
    },

    {
      action: 'product.product_template_action_all',
      id: 'odoo_product.product_template_action_all',
      icon: 'shopping',
      name: { en_US: 'Products', zh_CN: '产品', zh_HK: '产品' }
    },

    {
      action: 'product.attribute_action',
      id: 'odoo_product.attribute_action',
      icon: 'shopping',
      name: { en_US: 'Products', zh_CN: '产品属性', zh_HK: '产品属性' }
    }

    // {
    //   action: 'product.product_product_action_sellable',
    //   id: 'odoo_product.product_product_action_sellable',
    //   icon: 'shopping',
    //   name: {
    //     en_US: 'Products(Sellable)',
    //     zh_CN: '产品(可销售)',
    //     zh_HK: '产品(可销售)'
    //   }
    // },
    // {
    //   action: 'product.product_product_action_purchasable',
    //   id: 'odoo_product.product_product_action_purchasable',
    //   icon: 'shopping',
    //   name: {
    //     en_US: 'Products(Purchasable)',
    //     zh_CN: '产品(可采购)',
    //     zh_HK: '产品(可采购)'
    //   }
    // }
  ]
}
