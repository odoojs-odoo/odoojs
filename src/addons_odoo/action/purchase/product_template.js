export default {
  product_normal_action_puchased: {
    _odoo_model: 'ir.actions',
    name: '产品',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product.product_template_search_view',
    domain: [],
    context: {
      search_default_filter_to_purchase: 1,
      purchase_product_template: 1
    }
  }
}