export default {
  product_template_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'tree',
    fields: {
      name: {},
      default_code: {},
      detailed_type: {},
      categ_id: {}
    }
  },

  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'form',
    fields: {
      display_name: {},
      name: {},
      default_code: {},
      detailed_type: {},
      list_price: {},
      tax_string: {},
      categ_id: {}
    }
  },

  product_action: {
    _odoo_model: 'ir.actions',
    name: '办公用品',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    domain: [],
    context: {},
    views: {
      tree: 'product_template_tree_view',
      form: 'product_template_form_view'
    }
  }
}
