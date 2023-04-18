export default {
  product_template_action_product: {
    _odoo_model: 'ir.actions',
    name: '产品',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product_template_search_form_view_stock',
    domain: [],
    context: { search_default_consumable: 1, default_detailed_type: 'product' }
  }
}
