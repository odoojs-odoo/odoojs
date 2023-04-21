export default {
  view_warehouse: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_view_all_routes: {
            _attr: {
              name: 'action_view_all_routes',
              type: 'object',
              string: 'Routes',
              icon: 'fa-refresh',
              class: 'oe_stat_button'
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _label_name: { for: 'name' },
        _h1: {
          name: { placeholder: 'e.g. Central Warehouse' }
        },
        _group: {
          _group: {
            active: { invisible: '1' },
            company_id: { invisible: '1' },
            code: { placeholder: 'e.g. CW' }
          },
          _group_953: {
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            partner_id: {}
          }
        },
        _notebook: {
          _attr: { groups: 'stock.group_adv_location,stock.group_stock_multi_warehouses' },
          _page_warehouse_config: {
            _attr: {
              name: 'warehouse_config',
              string: 'Warehouse Configuration'
            },
            _group: {
              _group: {
                _attr: {
                  string: 'Shipments',
                  groups: 'stock.group_adv_location'
                },
                reception_steps: { widget: 'radio' },
                delivery_steps: { widget: 'radio' }
              },
              _group_group_resupply: {
                _attr: {
                  name: 'group_resupply',
                  string: 'Resupply',
                  groups: 'stock.group_stock_multi_warehouses'
                },
                resupply_wh_ids: {
                  widget: 'many2many_checkboxes',
                  groups: 'stock.group_stock_multi_warehouses',
                  domain: [['id', '!=', <built-in function id>]]
                }
              }
            }
          },
          _page_technical_info: {
            _attr: {
              name: 'technical_info',
              string: 'Technical Information',
              groups: 'base.group_no_one'
            },
            _group: {
              _group: {
                _attr: { string: 'Locations' },
                view_location_id: {
                  string: 'Warehouse view location',
                  required: '0',
                  readonly: '1'
                },
                lot_stock_id: {
                  required: '0',
                  readonly: '1'
                },
                wh_input_stock_loc_id: { readonly: '1' },
                wh_qc_stock_loc_id: { readonly: '1' },
                wh_pack_stock_loc_id: { readonly: '1' },
                wh_output_stock_loc_id: { readonly: '1' }
              },
              _group_250: {
                _attr: { string: 'Operation Types' },
                in_type_id: { readonly: '1' },
                int_type_id: { readonly: '1' },
                pick_type_id: { readonly: '1' },
                pack_type_id: { readonly: '1' },
                out_type_id: { readonly: '1' }
              }
            }
          }
        }
      }
    }
  },

  view_warehouse_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        active: { invisible: '1' },
        lot_stock_id: { groups: 'stock.group_stock_multi_locations' },
        partner_id: {},
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  stock_warehouse_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse',
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

  action_warehouse_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Warehouses',
    type: 'ir.actions.act_window',
    res_model: 'stock.warehouse',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'view_warehouse_tree',
      form: '=======todo=========='
    }
  }
}
