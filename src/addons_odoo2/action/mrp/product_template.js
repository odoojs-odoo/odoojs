export default {
  view_mrp_product_template_form_inherited: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'stock.view_template_property_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//label[@for='sale_delay']",
            position: 'before'
          },
          bom_count: {
            string: 'Bill of Materials',
            groups: 'mrp.group_mrp_user',
            invisible: '1'
          },
          _label_produce_delay: {
            for: 'produce_delay',
            string: 'Manuf. Lead Time',
            invisible: [['type', '=', 'service']]
          },
          _div: {
            _attr: {
              invisible: [['type', '=', 'service']],
              text: 'days'
            },
            produce_delay: { class: 'oe_inline' }
          },
          _label_days_to_prepare_mo: {
            for: 'days_to_prepare_mo',
            invisible: [['type', '=', 'service']]
          },
          _div_752: {
            _attr: {
              invisible: [['type', '=', 'service']],
              text: 'days'
            },
            days_to_prepare_mo: { class: 'oe_inline' },
            _button_action_compute_bom_days: {
              _attr: {
                name: 'action_compute_bom_days',
                type: 'object',
                string: 'Compute from BoM',
                help: 'Compute the days required to resupply all components from BoM, by either buying or manufacturing the components and/or subassemblies.',
                groups: 'mrp.group_mrp_user',
                invisible: ['|', ['type', '=', 'service'], ['bom_count', '=', 0]],
                class: 'oe_link pt-0'
              }
            }
          }
        },
        _xpath_356: {
          _attr: {
            expr: "//field[@name='product_variant_count']",
            position: 'after'
          },
          is_kits: { invisible: '1' }
        }
      }
    }
  },

  mrp_product_template_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_search_view',
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

  product_template_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Products',
    res_model: 'product.template',
    search_view_id: 'mrp_product_template_search_view',
    context: {
      search_default_consumable: 1,
      default_detailed_type: 'product'
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  product_template_form_view_bom_button: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'stock.product_template_form_view_procurement_button',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//button[@name='action_open_product_lot']",
            position: 'after'
          },
          _button_template_open_bom: {
            _attr: {
              name: 'template_open_bom',
              type: 'action',
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
              _span_566: {
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
