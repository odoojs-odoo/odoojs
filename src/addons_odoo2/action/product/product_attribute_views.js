export default {
  attribute_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.attribute',
    type: 'tree',
    fields: {
      sequence: {},
      name: {},
      display_type: {},
      create_variant: {}
    }
  },

  product_attribute_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.attribute',
    type: 'form',
    fields: {
      sequence: {},
      name: {},
      display_type: {},
      create_variant: {},

      value_ids: {
        widget: 'x2many_tree',
        views: {
          tree: {
            fields: {
              sequence: {},
              name: {},
              display_type: {},
              is_custom: {},
              html_color: {}
            }
          },
          form: {
            fields: {
              sequence: {},
              name: {},
              display_type: {},
              is_custom: {},
              html_color: {}
            }
          }
        }
      }
    }
  },

  attribute_action: {
    _odoo_model: 'ir.actions',
    name: '产品属性',
    type: 'ir.actions.act_window',
    res_model: 'product.attribute',
    domain: [],
    context: {}
  }
}
