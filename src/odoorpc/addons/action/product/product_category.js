export default {
  product_category_list_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'tree',

    fields: {
      display_name: {}
    }
  },

  product_category_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'form',
    arch: {
      sheet: {
        _title: { display_name: {} },

        _group_button_box: {
          _span: 2,
          product_count: {}
        },

        _group_name: {
          name: {}
        },

        _group_first: {
          parent_id: {}
        }
      }
    }
  },

  product_category_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'search',
    arch: {
      fields: {
        name: {},
        parent_id: {}
      }
    }
  },

  product_category_action_form: {
    _odoo_model: 'ir.actions',
    name: '产品类别',
    type: 'ir.actions.act_window',
    res_model: 'product.category',
    search_view_id: 'product_category_search_view',
    domain: [],
    context: {},
    views: {
      tree: 'product_category_list_view',
      form: 'product_category_form_view'
    }
  }
}
