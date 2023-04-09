export default {
  attribute_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.attribute',
    type: 'tree',
    fields: {
      sequence: { widget: 'handle' },
      name: {},
      display_type: {},
      create_variant: {}
    }
  },

  product_attribute_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.attribute',
    type: 'form',

    arch: {
      sheet: {
        number_related_products: { invisible: 1 },

        _div_button_box: {
          _button: {
            _attr: {
              name: 'action_open_related_products',
              type: 'object',
              icon: 'fa-bars',
              invisible({ record }) {
                // 'invisible': [('number_related_products', '=', [])]}"
                // odoo 笔误 number_related_products 是 integer 字段

                console.log(record)
                const { number_related_products } = record
                return !number_related_products
              }
            },

            number_related_products: { string: 'Related Products' }
          }
        },

        _group_main_fields: {
          name: { string: 'Attribute Name' },
          display_type: { widget: 'radio' },
          create_variant: { widget: 'radio' }
        },

        _notebook: {
          _page_attribute_values: {
            _attr: { string: 'Attribute Values', name: 'attribute_values' },
            value_ids: {
              widget: 'x2many_tree', // one2many
              nolabel: '1',
              views: {
                tree: {
                  fields: {
                    sequence: { widget: 'handle' },
                    name: {},
                    display_type: { invisible: 1 },
                    is_custom: { groups: 'product.group_product_variant' },
                    html_color: {
                      widget: 'color',
                      invisible({ record }) {
                        // 'column_invisible': [('parent.display_type', '!=', 'color')]}"
                        const { parent: prt } = record
                        return prt.display_type !== 'color'
                      }
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _group_name: {
                        sequence: { widget: 'handle' },
                        name: {},
                        display_type: { invisible: 1 },
                        is_custom: { groups: 'product.group_product_variant' },
                        html_color: {
                          widget: 'color',
                          invisible({ record }) {
                            // 'column_invisible': [('parent.display_type', '!=', 'color')]}"
                            const { parent: prt } = record
                            return prt.display_type !== 'color'
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
      }
    }
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
