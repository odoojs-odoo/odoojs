export default {
  product_category_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_product_template_action_all: {
            _attr: {
              name: 'product_template_action_all',
              type: 'action',
              icon: 'fa-th-list',
              context: { todo_ctx: "{'search_default_categ_id': active_id, 'default_categ_id': active_id, 'group_expand': True}" },
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                product_count: {}
              },
              _span_286: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Products'
                }
              }
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: {
            for: 'name',
            string: 'Category'
          },
          _h1: {
            name: { placeholder: 'e.g. Lamps' }
          }
        },
        _group_first: {
          _attr: { name: 'first' },
          parent_id: { class: 'oe_inline' }
        }
      }
    }
  },

  product_category_list_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'tree',
    arch: {
      sheet: {
        display_name: { string: 'Product Category' }
      }
    }
  },

  product_category_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'search',
    arch: {
      name: { string: 'Product Categories' },
      parent_id: {}
    }
  },

  product_category_action_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Product Categories',
    type: 'ir.actions.act_window',
    res_model: 'product.category',
    search_view_id: 'product_category_search_view',
    views: {
      tree: 'product_category_list_view',
      form: '=======todo=========='
    }
  }
}
