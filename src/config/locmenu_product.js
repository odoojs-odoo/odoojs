export default {
  id: 'odoo.product',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Product', zh_CN: '产品', zh_HK: '产品' },
  children: [
    {
      action: 'product.action_country_group',
      id: 'odoo_product.action_country_group',
      icon: 'shopping',
      name: { en_US: 'Country Group', zh_CN: '国家组', zh_HK: '国家组' }
    },

    {
      action: 'product.product_pricelist_action2',
      id: 'odoo_product.product_pricelist_action2',
      icon: 'shopping',
      name: { en_US: 'Product Pricelist', zh_CN: '价格表', zh_HK: '价格表' }
    },

    {
      action: 'product.action_partner_of_contact_organization',
      id: 'odoo_product.action_partner_of_contact_organization',
      icon: 'shopping',
      name: {
        en_US: 'Partner Organization',
        zh_CN: '联系人(组织)',
        zh_HK: '联系人(组织)'
      }
    },

    {
      action: 'product.product_category_action_form',
      id: 'odoo_product.product_category_action_form',
      icon: 'shopping',
      name: {
        en_US: 'Product Categories',
        zh_CN: '产品类别',
        zh_HK: '产品类别'
      }
    },

    {
      action: 'product.product_tag_action',
      id: 'odoo_product.product_tag_action',
      icon: 'shopping',
      name: { en_US: 'Product Tags', zh_CN: '产品标签', zh_HK: '产品标签' }
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
      action: 'product.product_product_action_sellable',
      id: 'odoo_product.product_product_action_sellable',
      icon: 'shopping',
      name: {
        en_US: 'Products(Sellable)',
        zh_CN: '产品(可销售)',
        zh_HK: '产品(可销售)'
      }
    },
    {
      action: 'product.product_product_action_purchasable',
      id: 'odoo_product.product_product_action_purchasable',
      icon: 'shopping',
      name: {
        en_US: 'Products(Purchasable)',
        zh_CN: '产品(可采购)',
        zh_HK: '产品(可采购)'
      }
    }
  ]
}
