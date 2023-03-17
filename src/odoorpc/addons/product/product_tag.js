export default {
  product_tag_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.tag',
    type: 'tree',

    fields: {
      name: {}
      //   color: { widget: 'color_picker' },
    }
  },
  product_tag_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.tag',
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
          //   color: { widget: 'color_picker' },
          product_ids: { widget: 'many2many_tags' }
        }
      }
    }
  },

  product_tag_action: {
    _odoo_model: 'ir.actions',
    name: '产品类别',
    type: 'ir.actions.act_window',
    res_model: 'product.tag',
    // search_view_id: '',
    domain: [],
    context: {},
    views: {
      tree: 'product_tag_tree_view',
      form: 'product_tag_form_view'
    }
  }
}
