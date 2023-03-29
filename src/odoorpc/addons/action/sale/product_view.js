export default {
  product_template_action: {
    _odoo_model: 'ir.actions',
    name: '产品',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product.product_template_search_view',
    domain: [],
    context: {
      search_default_filter_to_sell: 1,
      sale_multi_pricelist_product_template: 1
    }
  },

  product_menu_catalog: {
    _odoo_model: 'ir.ui.menu',
    name: '产品',
    parent: 'sale_menu_root',
    sequence: 4,
    children: {
      menu_product_template_action: {
        _odoo_model: 'ir.ui.menu',
        action: 'product_template_action',
        parent: 'product_menu_catalog',
        name: '产品',
        sequence: 1
      }
    }
  }
}
