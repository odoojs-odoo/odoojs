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
    }
  ]
}
