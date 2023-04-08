export default {
  menu_product: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_master',
    name: 'Product',
    sequence: 12,
    children: {
      product_supplierinfo_type_action: {
        name: 'Vendor Pricelists',
        action: 'product.product_supplierinfo_type_action'
      },
      product_template_action_all: {
        name: 'Products',
        action: 'product.product_template_action_all'
      },
      attribute_action: {
        name: 'Product Attributes',
        action: 'product._action'
      }
    }
  }
}
