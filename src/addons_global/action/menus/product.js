export default {
  menu_product: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_master',
    name: 'Product',
    sequence: 12,
    children: {
      menu_product_supplierinfo_type_action: {
        name: 'Vendor Pricelists',
        action: 'product.product_supplierinfo_type_action'
      },
      menu_product_template_action_all: {
        name: 'Products',
        action: 'product.product_template_action_all'
      },
      menu_attribute_action: {
        name: 'Product Attributes',
        action: 'product._action'
      }
    }
  }
}
