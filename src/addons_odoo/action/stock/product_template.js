export default {
  view_stock_product_template_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_tree_view',
    arch: {
      sheet: {
        detailed_type: {},
        show_on_hand_qty_status_button: { invisible: '1' },
        qty_available: {
          // invisible: [['show_on_hand_qty_status_button', '=', false]],
          optional: 'show'
        },
        virtual_available: {
          // invisible: [['show_on_hand_qty_status_button', '=', false]],
          optional: 'show'
        },

        default_code: {},
        responsible_id: {
          widget: 'many2one_avatar_user'
        }
      }
    }
  },

  product_template_search_form_view_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_search_view',
    arch: {
      fields: {
        location_id: {
          filter_domain: [],
          context: {
            // todo_ctx: "{'location': self}"
          }
        },
        warehouse_id: {
          filter_domain: [],
          context: {
            // todo_ctx: "{'warehouse': self}"
          }
        }
      },

      filters: {
        group_real_stock: {
          real_stock_available: {
            name: 'real_stock_available',
            string: 'Available Products',
            domain: [['qty_available', '>', 0]]
          },
          real_stock_negative: {
            name: 'real_stock_negative',
            string: 'Negative Forecasted Quantity',
            domain: [['virtual_available', '<', 0]]
          }
        }
      }
    }
  },

  view_template_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_form_view',
    arch: {
      sheet: {
        _notebook: {
          _page_inventory: {
            _attr: {
              groups: 'stock.group_stock_user,product.group_stock_packaging'
            },

            _group_inventory: {
              has_available_route_ids: { invisible: '1' },
              _group_operations: {
                _attr: { name: 'operations', string: 'Operations' },
                _label_route_ids: {
                  for: 'route_ids'
                  // invisible: [['type', '=', 'service']]
                },
                _div: {
                  route_ids: {
                    widget: 'many2many_checkboxes'
                    // invisible: [
                    //   '|',
                    //   ['has_available_route_ids', '=', false],
                    //   ['type', '=', 'service']
                    // ],
                    // class: 'mb-0'
                  },
                  _button_action_open_routes: {
                    _attr: {
                      name: 'action_open_routes',
                      type: 'action',
                      string: 'View Diagram',
                      icon: 'fa-arrow-right',
                      // invisible: [['type', 'not in', ['product', 'consu']]],
                      context: {
                        // default_product_tmpl_id: 'todo===id'
                      },
                      class: 'btn btn-link pt-0'
                    }
                  }
                },
                route_from_categ_ids: {
                  widget: 'many2many_tags'
                  // invisible: [['route_from_categ_ids', '=', []]]
                }
              },
              _group_group_lots_and_weight: {
                _label_sale_delay: {
                  for: 'sale_delay'
                  // invisible: [['sale_ok', '=', false]]
                },
                _div: {
                  _attr: {
                    // invisible: [['sale_ok', '=', false]]
                  },
                  sale_delay: {
                    class: 'oe_inline'
                  }
                }
              },

              _group_traceability: {
                _attr: {
                  name: 'traceability',
                  string: 'Traceability',
                  groups: 'stock.group_production_lot'
                  // invisible: [['type', '=', 'consu']]
                },
                tracking: {
                  widget: 'radio'
                  // invisible: [['type', '=', 'service']]
                }
              },
              _group_stock_property: {
                _attr: {
                  name: 'stock_property',
                  string: 'Counterpart Locations',
                  groups: 'base.group_no_one'
                },
                property_stock_production: {},
                property_stock_inventory: {}
              }
            },
            _group: {
              _group: {
                _attr: {
                  string: 'Description for Receipts'
                },
                description_pickingin: {
                  placeholder:
                    'This note is added to receipt orders (e.g. where to store the product in the warehouse).'
                }
              },
              _group_683: {
                _attr: {
                  string: 'Description for Delivery Orders'
                },
                description_pickingout: {
                  placeholder: 'This note is added to delivery orders.'
                }
              },
              _group_111: {
                _attr: {
                  string: 'Description for Internal Transfers',
                  groups: 'stock.group_stock_multi_locations'
                },
                description_picking: {
                  placeholder:
                    'This note is added to internal transfer orders (e.g. where to pick the product in the warehouse).'
                }
              }
            }
          }
        }
      }
    }
  }
}
