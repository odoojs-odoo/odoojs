export default {
  product_tag_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.tag',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            name: {},
            color: { widget: 'color_picker' }
          }
        },
        _group_869: {
          product_ids: { widget: 'many2many_tags' }
        }
      }
    }
  },

  product_tag_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.tag',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        color: { widget: 'color_picker' }
      }
    }
  },

  product_tag_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Product Tags',
    type: 'ir.actions.act_window',
    res_model: 'product.tag',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
