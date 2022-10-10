export default {
  product_template_action_product: {
    _odoo_model: 'ir.actions',
    name: '产品',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product_template_search_form_view_stock',
    domain: [],
    context: { search_default_consumable: 1, default_detailed_type: 'product' }
  },

  menu_product_variant_config_stock: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_stock_inventory_control',
    name: '产品',
    action: 'product_template_action_product',
    sequence: 1
  }
}
