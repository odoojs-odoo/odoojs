export default {
  menu_product: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Product',
    sequence: 12,
    children: {
      menu_product_setting: {
        name: 'Config',
        children: {
          //   menu_product_pricelist_action2: {
          //     name: 'Product Pricelist',
          //     action: 'product.product_pricelist_action2'
          //   },
          menu_product_category_action_form: {
            name: 'Product Categories',
            action: 'product.product_category_action_form'
          },
          menu_product_tag_action: {
            name: 'Product Tags',
            action: 'product.product_tag_action'
          },
          menu_product_uom_categ_form_action: {
            name: 'Units of Measure Categories',
            action: 'uom.product_uom_categ_form_action'
          },
          menu_product_uom_form_action: {
            name: 'Units of Measure',
            action: 'uom.product_uom_form_action'
          }
        }
      },
      //   menu_product_supplierinfo_type_action: {
      //     name: 'Vendor Pricelists',
      //     action: 'product.product_supplierinfo_type_action'
      //   },
      menu_product_template_action_all: {
        name: 'Products',
        action: '_product.product_template_action_all'
      }
      // menu_attribute_action: {
      //   name: 'Product Attributes',
      //   action: 'product.attribute_action'
      // }
    }
  }
}
