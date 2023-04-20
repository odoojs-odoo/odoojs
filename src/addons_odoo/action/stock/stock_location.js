export default {
  view_location_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.location',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        _div_button_box: {
          _attr: { name: 'button_box', class: 'oe_button_box' },
          _button_location_open_putaway: {
            _attr: {
              name: 'location_open_putaway',
              type: 'action',
              string: 'Putaway Rules',
              icon: 'fa-random',
              groups: 'stock.group_stock_multi_locations',
              context: {
                // todo_ctx: "{'default_company_id': company_id}"
              },
              class: 'oe_stat_button'
            }
          },
          _button_location_open_quants: {
            _attr: {
              name: 'location_open_quants',
              type: 'action',
              string: 'Current Stock',
              icon: 'fa-cubes',
              class: 'oe_stat_button'
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger'
            // invisible: [['active', '=', true]]
          }
        },
        _label_name: { for: 'name' },
        _h1: {
          name: { placeholder: 'e.g. Spare Stock' }
        },
        _label_location_id: { for: 'location_id' },
        _h2: {
          location_id: { placeholder: 'e.g. Physical Locations' }
        },
        _group: {
          _group_additional_info: {
            _attr: {
              name: 'additional_info',
              string: 'Additional Information'
            },
            active: { invisible: '1' },
            usage: {},
            storage_category_id: {
              groups: 'stock.group_stock_storage_categories',
              invisible: [['usage', '!=', 'internal']]
            },
            company_id: { groups: 'base.group_multi_company' },
            scrap_location: {
              // invisible: [['usage', 'not in', ('inventory', 'internal')]]
            },
            return_location: {},
            replenish_location: {
              // invisible: [['usage', '!=', 'internal']]
            }
          },
          _group: {
            _attr: {
              string: 'Cyclic Counting'
              // invisible: [
              //   '|',
              //   ['usage', 'not in', ('internal', 'transit')],
              //   ['company_id', '=', false]
              // ]
            },
            cyclic_inventory_frequency: {},
            last_inventory_date: {},
            next_inventory_date: {
              // invisible: [['active', '=', false]]
            }
          },
          _group_231: {
            _attr: { string: 'Logistics', groups: 'stock.group_adv_location' },
            removal_strategy_id: {}
          }
        },
        comment: { placeholder: 'External note...' }
      }
    }
  },

  view_location_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.location',
    type: 'search',
    arch: {
      fields: {
        complete_name: { _default: 1, string: 'Stock Locations' },
        location_id: { string: 'Parent Location' }
      },

      filters: {
        group_usage: {
          in_location: {
            name: 'in_location',
            string: 'Internal',
            domain: [['usage', '=', 'internal']]
          },
          customer: {
            name: 'customer',
            string: 'Customer',
            domain: [['usage', '=', 'customer']]
          },
          prod_inv_location: {
            name: 'prod_inv_location',
            string: 'Production',
            domain: [['usage', 'in', ['inventory', 'production']]]
          },
          supplier: {
            name: 'supplier',
            string: 'Vendor',
            domain: [['usage', '=', 'supplier']]
          }
        },
        group_active: {
          inactive: {
            name: 'inactive',
            string: 'Archived',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  view_location_tree2: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.location',
    type: 'tree',
    arch: {
      sheet: {
        // company_id: { invisible: '1' },
        active: { invisible: '1' },
        complete_name: { string: 'Location' },
        usage: {},
        storage_category_id: {
          groups: 'stock.group_stock_storage_categories',
          readonly: [['usage', '!=', 'internal']]
        },
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  action_location_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Locations',
    type: 'ir.actions.act_window',
    res_model: 'stock.location',
    search_view_id: 'view_location_search',
    context: {
      search_default_in_location: 1
    },
    views: {
      tree: 'view_location_tree2',
      form: 'view_location_form'
    }
  }
}
