export default {
  attribute_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.attribute',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        display_type: {},
        create_variant: {}
      }
    }
  },

  product_attribute_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.attribute',
    type: 'form',
    arch: {
      sheet: {
        number_related_products: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_open_related_products: {
            _attr: {
              name: 'action_open_related_products',
              type: 'object',
              icon: 'fa-bars',
              invisible: [['number_related_products', '=', []]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                number_related_products: {}
              },
              _span_111: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Related Products'
                }
              }
            }
          }
        },
        _group_main_fields: {
          _attr: {
            name: 'main_fields',
            class: 'o_label_nowrap'
          },
          _label_name: {
            for: 'name',
            string: 'Attribute Name'
          },
          name: {},
          display_type: { widget: 'radio' },
          create_variant: {
            widget: 'radio',
            readonly: [['number_related_products', '!=', 0]]
          }
        },
        _notebook: {
          _page_attribute_values: {
            _attr: {
              name: 'attribute_values',
              string: 'Attribute Values'
            },
            value_ids: {
              widget: 'one2many',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Values' },
                      sequence: { widget: 'handle' },
                      name: {},
                      display_type: { invisible: '1' },
                      is_custom: { groups: 'product.group_product_variant' },
                      html_color: {
                        widget: 'color',
                        column_invisible: [['parent.display_type', '!=', 'color']]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  attribute_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Attributes',
    type: 'ir.actions.act_window',
    res_model: 'product.attribute',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
