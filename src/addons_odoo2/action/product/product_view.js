export default {
  product_product_action_sellable: {
    _odoo_model: 'ir.actions',
    name: '产品',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    domain: [],
    context: { search_default_filter_to_sell: 1 }
  },

  product_product_action_purchasable: {
    _odoo_model: 'ir.actions',
    name: '产品',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    domain: [],
    context: { search_default_filter_to_purchase: 1 }
  }
}
