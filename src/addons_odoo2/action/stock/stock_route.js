export default {
  stock_location_route_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.route',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        active: { invisible: '1' },
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  stock_location_route_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.route',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: { placeholder: 'e.g. Two-steps reception' }
          }
        },
        _group: {
          _group: {
            sequence: {
              string: 'Sequence',
              groups: 'base.group_no_one'
            },
            supplied_wh_id: { groups: 'base.group_no_one' },
            active: { invisible: '1' },
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            }
          }
        },
        _group_route_selector: {
          _attr: {
            name: 'route_selector',
            string: 'Applicable On'
          },
          _p: {
            _attr: {
              class: 'oe_grey',
              text: 'Select the places where this route can be selected'
            }
          },
          _group: {
            product_categ_selectable: { string: 'Product Categories' },
            product_selectable: { string: 'Products' },
            packaging_selectable: {
              string: 'Packagings',
              groups: 'product.group_stock_packaging'
            }
          },
          _group_777: {
            _label_warehouse_selectable: {
              for: 'warehouse_selectable',
              string: 'Warehouses'
            },
            _div: {
              _attr: { class: 'o_row' },
              warehouse_selectable: { class: 'oe_inline' },
              warehouse_domain_ids: { invisible: '1' },
              warehouse_ids: {
                widget: 'many2many_tags',
                invisible: [['warehouse_selectable', '=', false]]
              }
            }
          }
        },
        _group_470: {
          _attr: { string: 'Rules' },
          rule_ids: {
            context: { todo_ctx: "{'default_company_id': company_id, 'form_view_ref':'stock.view_route_rule_form'}" },
            views: {
              tree: {
                arch: {
                  sheet: {
                    sequence: { widget: 'handle' },
                    action: {},
                    location_src_id: { no_create: true },
                    location_dest_id: { no_create: true }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  stock_location_route_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.route',
    type: 'search',
    arch: {
      name: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  action_routes_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Routes',
    type: 'ir.actions.act_window',
    res_model: 'stock.route',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'stock_location_route_tree',
      form: '=======todo=========='
    }
  }
}
