export default {
  menu_product_setting: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_setting',
    name: 'Product Setting',
    sequence: 12,
    children: {
      product_pricelist_action2: {
        name: 'Product Pricelist',
        action: 'product.product_pricelist_action2'
      },
      product_category_action_form: {
        name: 'Product Categories',
        action: 'product.product_category_action_form'
      },
      product_tag_action: {
        name: 'Product Tags',
        action: 'product.product_tag_action'
      },
      product_uom_categ_form_action: {
        name: 'Units of Measure Categories',
        action: 'uom.product_uom_categ_form_action'
      },
      product_uom_form_action: {
        name: 'Units of Measure',
        action: 'uom.product_uom_form_action'
      }
    }
  }
}
