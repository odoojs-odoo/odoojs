export default {
  id: 'odoo.product',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Product Setting', zh_CN: '产品配置', zh_HK: '产品配置' },
  children: [
    {
      action: 'product.product_pricelist_action2',
      id: 'odoo_product.product_pricelist_action2',
      icon: 'shopping',
      name: { en_US: 'Product Pricelist', zh_CN: '价格表', zh_HK: '价格表' }
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
      action: 'uom.product_uom_categ_form_action',
      id: 'uom.product_uom_categ_form_action',
      icon: 'shopping',
      name: {
        en_US: 'Units of Measure Categories',
        zh_CN: '度量单位类别',
        zh_HK: '度量单位类别'
      }
    },

    {
      action: 'uom.product_uom_form_action',
      id: 'uom.product_uom_form_action',
      icon: 'shopping',
      name: {
        en_US: 'Units of Measure',
        zh_CN: '度量单位',
        zh_HK: '度量单位'
      }
    }
  ]
}
