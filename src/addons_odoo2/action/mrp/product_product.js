export default {
  mrp_product_product_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_search_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//filter[@name='consumable']",
            position: 'after'
          },
          _separator: {},
          _filter_manufactured_products: {
            _attr: {
              name: 'manufactured_products',
              string: 'Manufactured Products',
              domain: [['bom_ids', '!=', false]]
            }
          },
          _filter_components: {
            _attr: {
              name: 'components',
              string: 'BoM Components',
              domain: [['bom_line_ids', '!=', false]]
            }
          }
        }
      }
    }
  },

  mrp_product_variant_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Product Variants',
    res_model: 'product.product',
    search_view_id: 'mrp_product_product_search_view',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  product_product_form_view_bom_button: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'stock.product_form_view_procurement_button',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//button[@name='action_open_product_lot']",
            position: 'after'
          },
          _button_action_view_bom: {
            _attr: {
              name: 'action_view_bom',
              type: 'object',
              icon: 'fa-flask',
              groups: 'mrp.group_mrp_user',
              invisible: [['type', 'not in', ['product', 'consu']]],
              class: 'oe_stat_button'
            },
            bom_count: {
              string: 'Bill of Materials',
              widget: 'statinfo'
            }
          },
          _button_action_used_in_bom: {
            _attr: {
              name: 'action_used_in_bom',
              type: 'object',
              icon: 'fa-level-up',
              groups: 'mrp.group_mrp_user',
              invisible: ['|', ['type', 'not in', ['product', 'consu']], ['used_in_bom_count', '=', 0]],
              class: 'oe_stat_button'
            },
            used_in_bom_count: {
              string: 'Used In',
              widget: 'statinfo'
            }
          },
          _button_action_view_mos: {
            _attr: {
              name: 'action_view_mos',
              type: 'object',
              icon: 'fa-list-alt',
              help: 'Manufactured in the last 365 days',
              groups: 'mrp.group_mrp_user',
              invisible: ['|', '|', ['type', 'not in', ['product', 'consu']], ['bom_count', '=', 0], ['mrp_product_qty', '=', 0]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                mrp_product_qty: {
                  widget: 'statinfo',
                  class: 'mr4'
                },
                uom_name: {}
              },
              _span_314: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Manufactured'
                }
              }
            }
          }
        }
      }
    }
  }
}
