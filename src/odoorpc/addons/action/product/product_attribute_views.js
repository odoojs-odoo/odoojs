export default {
  attribute_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.attribute',
    type: 'tree',
    fields: {
      // sequence: {},
      name: {},
      display_type: {},
      create_variant: {}
    }
  },

  product_attribute_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.attribute',
    type: 'form',

    //

    arch: {
      sheet: {
        _title: { display_name: {} },
        _group_button_box: {
          _span: 2,
          // number_related_products: { invisible: 1 }
          number_related_products: {
            string: 'Related Products'
          }
        },

        _group_name: {
          // sequence: {},
          name: {},
          display_type: { widget: 'radio' },
          create_variant: {
            widget: 'radio',
            readonly({ record }) {
              // 'readonly': [('number_related_products', '!=', 0)]
              const { number_related_products } = record
              return number_related_products !== 0
            }
          }
        },

        _group_attribute_values: {
          _span: 2,
          value_ids: {
            widget: 'x2many_tree', // one2many
            views: {
              tree: {
                fields: {
                  sequence: {},
                  name: {},
                  display_type: { invisible: 1 },
                  is_custom: {}
                  // html_color: {}
                }
              },
              form: {
                arch: {
                  sheet: {
                    _group_name: {
                      // sequence: {},
                      name: {},
                      display_type: {},
                      is_custom: {}
                      // html_color: {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    },

    fields: {}
  },

  attribute_action: {
    _odoo_model: 'ir.actions',
    name: 'Attributes',
    type: 'ir.actions.act_window',
    res_model: 'product.attribute',
    domain: [],
    context: {}
  }
}
