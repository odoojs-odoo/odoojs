export default {
  product_category_list_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'tree',

    fields: {
      display_name: { string: 'Product Category' }
    }
  },

  product_category_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _button: {
            _attr: {
              name: 'product_template_action_all',
              icon: 'fa-th-list',
              type: 'action',
              context({ active_id }) {
                return {
                  search_default_categ_id: active_id,
                  default_categ_id: active_id,
                  group_expand: true
                }
              }
            },
            product_count: { string: 'Products' }
          }
        },

        _div_title: {
          _h1: {
            name: { string: 'Category', placeholder: 'e.g. Lamps' }
          }
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
