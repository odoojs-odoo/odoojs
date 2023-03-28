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
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_name: {
          _span: 2,
          name: {},
          parent_id: {},
          product_count: {}
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

  //   product_category_form_view: {
  //     _odoo_model: 'ir.ui.view',
  //     model: 'product.category',
  //     type: 'form',
  //     fields: {
  //       name: {},
  //       parent_id: {}
  //     }
  //   },

  //   product_category_list_view: {
  //     _odoo_model: 'ir.ui.view',
  //     model: 'product.category',
  //     type: 'tree',
  //     fields: {
  //       display_name: {}
  //     }
  //   },

  //   product_category_search_view: {
  //     _odoo_model: 'ir.ui.view',
  //     model: 'product.category',
  //     type: 'search',
  //     arch: {
  //       fields: {
  //         name: {},
  //         parent_id: {}
  //       },

  //       filters: {}
  //     }
  //   },

  //   product_category_action_form: {
  //     _odoo_model: 'ir.actions',
  //     name: '产品类别',
  //     type: 'ir.actions.act_window',
  //     res_model: 'product.category',
  //     search_view_id: 'product_category_search_view',
  //     domain: [],
  //     context: {}
  //   },
}
