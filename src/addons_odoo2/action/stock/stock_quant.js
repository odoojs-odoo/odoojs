export default {
  action_view_inventory_tree: {
    _odoo_model: 'ir.actions.server',
    model_id: 'model_stock_quant',
    model: 'stock_quant'
  },

  quant_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    type: 'search',
    arch: {
      product_id: {},
      location_id: {},
      warehouse_id: {},
      storage_category_id: { groups: 'stock.group_stock_storage_categories' },
      user_id: {},
      inventory_date: {},
      product_categ_id: {},
      product_tmpl_id: {},
      package_id: { groups: 'stock.group_tracking_lot' },
      lot_id: { groups: 'stock.group_production_lot' },
      owner_id: { groups: 'stock.group_tracking_owner' },
      _group: {
        _attr: { string: 'Filters' },
        _filter_internal_loc: {
          _attr: {
            name: 'internal_loc',
            string: 'Internal Locations',
            domain: [['location_id.usage', '=', 'internal']]
          }
        },
        _filter_transit_loc: {
          _attr: {
            name: 'transit_loc',
            string: 'Transit Locations',
            domain: [['location_id.usage', '=', 'transit']]
          }
        },
        _separator: {},
        _filter_on_hand: {
          _attr: {
            name: 'on_hand',
            string: 'On Hand',
            domain: [['on_hand', '=', true]]
          }
        },
        _filter_to_count: {
          _attr: {
            name: 'to_count',
            string: 'To Count',
            domain: { todo_ctx: "[('inventory_date', '<=', context_today().strftime('%Y-%m-%d'))]" }
          }
        },
        _filter_to_apply: {
          _attr: {
            name: 'to_apply',
            string: 'To Apply',
            domain: [['inventory_quantity_set', '=', true]]
          }
        },
        _filter_priority_products: {
          _attr: {
            name: 'priority_products',
            string: 'Starred Products',
            domain: [['priority', '=', 1]]
          }
        },
        _separator_935: {},
        _filter_negative: {
          _attr: {
            name: 'negative',
            string: 'Negative Stock',
            domain: [['quantity', '<', 0.0]]
          }
        },
        _filter_reserved: {
          _attr: {
            name: 'reserved',
            string: 'Reservations',
            domain: [['reserved_quantity', '>', 0.0]]
          }
        },
        _separator_126: {},
        _filter_filter_in_date: {
          _attr: {
            name: 'filter_in_date',
            date: 'in_date'
          }
        },
        _separator_390: {},
        _filter_my_count: {
          _attr: {
            name: 'my_count',
            string: 'My Counts',
            domain: { todo_ctx: "[('user_id', '=', uid)]" }
          }
        }
      },
      _group_857: {
        _attr: { string: 'Group by...' },
        _filter_productgroup: {
          _attr: {
            name: 'productgroup',
            string: 'Product',
            context: { group_by: 'product_id' }
          }
        },
        _filter_locationgroup: {
          _attr: {
            name: 'locationgroup',
            string: 'Location',
            domain: [],
            context: { group_by: 'location_id' }
          }
        },
        _filter_storagecategorygroup: {
          _attr: {
            name: 'storagecategorygroup',
            string: 'Storage Category',
            domain: [],
            context: { group_by: 'storage_category_id' }
          }
        },
        _filter_owner: {
          _attr: {
            name: 'owner',
            string: 'Owner',
            groups: 'stock.group_tracking_owner',
            context: { group_by: 'owner_id' }
          }
        },
        _filter_Lot_Serial_number: {
          _attr: {
            name: 'Lot_Serial_number',
            string: 'Lot/Serial Number',
            groups: 'stock.group_production_lot',
            context: { group_by: 'lot_id' }
          }
        },
        _filter_package: {
          _attr: {
            name: 'package',
            string: 'Package',
            groups: 'stock.group_tracking_lot',
            domain: [],
            context: { group_by: 'package_id' }
          }
        },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            domain: [],
            context: { group_by: 'company_id' }
          }
        }
      }
    }
  },

  view_stock_quant_form_editable: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            tracking: { invisible: '1' },
            company_id: { invisible: '1' },
            product_id: {
              readonly: '0',
              no_create: true
            },
            location_id: {
              readonly: '0',
              no_create: true
            },
            lot_id: {
              groups: 'stock.group_production_lot',
              readonly: [['tracking', 'not in', ['serial', 'lot']]],
              required: [['tracking', '!=', 'none']],
              context: { todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id}" }
            },
            package_id: {
              groups: 'stock.group_tracking_lot',
              readonly: '0'
            },
            owner_id: {
              groups: 'stock.group_tracking_owner',
              readonly: '0',
              no_create: true
            },
            _field_company_id_619: {
              company_id: { groups: 'base.group_multi_company' }
            }
          },
          _group_314: {
            _label_quantity: {
              for: 'quantity',
              string: 'Quantity On Hand'
            },
            _div: {
              _attr: { class: 'o_row' },
              quantity: {},
              product_uom_id: { groups: 'uom.group_uom' }
            },
            _label_available_quantity: {
              for: 'available_quantity',
              string: 'Available Quantity'
            },
            _div_447: {
              _attr: { class: 'o_row' },
              available_quantity: {},
              product_uom_id: { groups: 'uom.group_uom' }
            },
            _label_reserved_quantity: {
              for: 'reserved_quantity',
              string: 'Quantity Reserved'
            },
            _div_888: {
              _attr: { class: 'o_row' },
              reserved_quantity: {},
              product_uom_id: { groups: 'uom.group_uom' }
            }
          }
        }
      }
    }
  },

  view_stock_quant_tree_editable: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    type: 'tree',
    arch: {
      sheet: {
        create_date: { invisible: '1' },
        write_date: { invisible: '1' },
        id: { invisible: '1' },
        tracking: { invisible: '1' },
        company_id: { invisible: '1' },
        location_id: {
          invisible: "context.get['hide_location', False]",
          readonly: [['id', '!=', false]],
          no_create: true
        },
        storage_category_id: { optional: 'hide' },
        product_id: {
          widget: 'many2one',
          readonly: "context.get['single_product', False]",
          force_save: '1',
          no_create: true
        },
        product_categ_id: { optional: 'hide' },
        _field_company_id_315: {
          company_id: {
            groups: 'base.group_multi_company',
            optional: 'hidden'
          }
        },
        package_id: {
          groups: 'stock.group_tracking_lot',
          readonly: [['id', '!=', false]]
        },
        lot_id: {
          groups: 'stock.group_production_lot',
          invisible: "context.get['hide_lot', False]",
          readonly: ['|', ['id', '!=', false], ['tracking', 'not in', ['serial', 'lot']]],
          required: [['tracking', '!=', 'none']],
          context: { todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id}" }
        },
        owner_id: {
          groups: 'stock.group_tracking_owner',
          readonly: [['id', '!=', false]],
          no_create: true
        },
        inventory_quantity_auto_apply: {
          string: 'On Hand Quantity',
          readonly: '0'
        },
        _button_action_view_inventory_tree: {
          _attr: {
            name: 'action_view_inventory_tree',
            type: 'action',
            title: 'Inventory Adjustment',
            icon: 'fa-pencil',
            context: { todo_ctx: "{'search_default_product_id': product_id, 'default_product_id': product_id}" },
            class: 'btn-link'
          }
        },
        reserved_quantity: { optional: 'show' },
        product_uom_id: {
          string: 'Unit',
          groups: 'uom.group_uom'
        },
        _button_action_view_stock_moves: {
          _attr: {
            name: 'action_view_stock_moves',
            type: 'object',
            string: 'History',
            icon: 'fa-history',
            class: 'btn-link'
          }
        },
        _button_action_view_orderpoints: {
          _attr: {
            name: 'action_view_orderpoints',
            type: 'object',
            string: 'Replenishment',
            icon: 'fa-refresh',
            context: { todo_ctx: "{'default_product_id': product_id, 'search_default_location_id': location_id}" },
            class: 'btn-link'
          }
        }
      }
    }
  },

  view_stock_quant_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    type: 'tree',
    arch: {
      sheet: {
        product_id: { invisible: "context.get['single_product', False]" },
        location_id: { invisible: "context.get['hide_location', False]" },
        lot_id: {
          groups: 'stock.group_production_lot',
          invisible: "context.get['hide_lot', False]"
        },
        package_id: { groups: 'stock.group_tracking_lot' },
        owner_id: { groups: 'stock.group_tracking_owner' },
        available_quantity: {},
        quantity: { string: 'On Hand Quantity' },
        product_uom_id: { groups: 'uom.group_uom' },
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  view_stock_quant_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    type: 'otherview',
    arch: {}
  },

  stock_quant_view_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    type: 'otherview',
    arch: {}
  },

  action_view_quants: {
    _odoo_model: 'ir.actions.server',
    model_id: 'model_stock_quant',
    model: 'stock_quant'
  },

  dashboard_open_quants: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Locations',
    res_model: 'stock.quant',
    search_view_id: 'tooooooodoooooo',
    context: {
      search_default_internal_loc: 1,
      search_default_productgroup: 1,
      search_default_locationgroup: 1,
      inventory_mode: true
    },
    views: {
      tree: 'view_stock_quant_tree_editable',
      form: '=======todo=========='
    }
  },

  location_open_quants: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Current Stock',
    res_model: 'stock.quant',
    search_view_id: 'tooooooodoooooo',
    domain: "[['location_id', 'child_of', active_ids]]",
    context: { search_default_productgroup: 1 },
    views: {
      tree: 'view_stock_quant_tree',
      form: '=======todo=========='
    }
  },

  duplicated_sn_warning: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    type: 'form',
    arch: {
      sheet: {
        _footer: {
          _button: {
            _attr: {
              string: 'Close',
              class: 'btn btn-primary'
            }
          }
        }
      }
    }
  },

  view_stock_quant_tree_inventory_editable: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_ock__action_stock_inventory_adjustement_na: {
            _attr: {
              name: 'ock.action_stock_inventory_adjustement_na',
              type: 'action',
              string: 'Apply',
              groups: 'stock.group_stock_manager'
            }
          },
          _button_action_reset: {
            _attr: {
              name: 'action_reset',
              type: 'object',
              string: 'Clear'
            }
          },
          _button_ock__action_stock_request_cou: {
            _attr: {
              name: 'ock.action_stock_request_cou',
              type: 'action',
              string: 'Request a Count',
              groups: 'stock.group_stock_manager'
            }
          }
        },
        create_date: { invisible: '1' },
        write_date: { invisible: '1' },
        id: { invisible: '1' },
        is_outdated: { invisible: '1' },
        sn_duplicated: { invisible: '1' },
        tracking: { invisible: '1' },
        inventory_quantity_set: { invisible: '1' },
        company_id: { invisible: '1' },
        location_id: {
          invisible: "context.get['hide_location', False]",
          domain: [['usage', 'in', ['internal', 'transit']]],
          readonly: [['id', '!=', false]],
          no_create: true
        },
        storage_category_id: {
          groups: 'stock.group_stock_storage_categories',
          invisible: "context.get['hide_location', False]",
          optional: 'hidden',
          no_create: true
        },
        cyclic_inventory_frequency: {
          invisible: "context.get['hide_location', False]",
          optional: 'hidden',
          no_create: true
        },
        priority: {
          widget: 'priority',
          optional: 'hidden'
        },
        product_id: {
          readonly: "context.get['single_product', False]",
          force_save: '1',
          no_create: true
        },
        product_categ_id: { optional: 'hide' },
        _button_action_warning_duplicated_sn: {
          _attr: {
            name: 'action_warning_duplicated_sn',
            type: 'object',
            title: 'This lot/serial number is already in another location',
            icon: 'fa-warning',
            invisible: [['sn_duplicated', '=', false]],
            class: 'btn btn-secondary text-warning float-end'
          }
        },
        lot_id: {
          groups: 'stock.group_production_lot',
          invisible: "context.get['hide_lot', False]",
          readonly: ['|', ['tracking', 'not in', ['serial', 'lot']], '&', ['id', '!=', false], '|', ['lot_id', '!=', false], ['quantity', '!=', 0]],
          context: { todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id}" },
          force_save: '1'
        },
        package_id: {
          groups: 'stock.group_tracking_lot',
          readonly: [['id', '!=', false]]
        },
        owner_id: {
          groups: 'stock.group_tracking_owner',
          readonly: [['id', '!=', false]],
          no_create: true
        },
        last_count_date: {
          readonly: '1',
          optional: 'hidden'
        },
        available_quantity: {
          string: 'Available Quantity',
          optional: 'hidden'
        },
        quantity: {
          string: 'On Hand Quantity',
          optional: 'show'
        },
        product_uom_id: {
          string: 'UoM',
          groups: 'uom.group_uom'
        },
        inventory_quantity: { widget: 'counted_quantity_widget' },
        inventory_diff_quantity: {
          string: 'Difference',
          invisible: [['inventory_quantity_set', '=', false]]
        },
        inventory_date: { optional: 'show' },
        user_id: {
          string: 'User',
          optional: 'show'
        },
        _field_company_id_993: {
          company_id: {
            groups: 'base.group_multi_company',
            optional: 'hide'
          }
        },
        _button_action_inventory_history: {
          _attr: {
            name: 'action_inventory_history',
            type: 'object',
            string: 'History',
            icon: 'fa-history',
            class: 'btn btn-link text-info'
          }
        },
        _button_action_apply_inventory: {
          _attr: {
            name: 'action_apply_inventory',
            type: 'object',
            string: 'Apply',
            icon: 'fa-save',
            groups: 'stock.group_stock_manager',
            invisible: [['inventory_quantity_set', '=', false]],
            class: 'btn btn-link'
          }
        },
        _button_action_set_inventory_quantity: {
          _attr: {
            name: 'action_set_inventory_quantity',
            type: 'object',
            string: 'Set',
            icon: 'fa-bullseye',
            invisible: [['inventory_quantity_set', '=', true]],
            class: 'btn btn-link'
          }
        },
        _button_action_set_inventory_quantity_to_zero: {
          _attr: {
            name: 'action_set_inventory_quantity_to_zero',
            type: 'object',
            string: 'Clear',
            icon: 'fa-times',
            invisible: [['inventory_quantity_set', '=', false]],
            class: 'btn text-warning'
          }
        }
      }
    }
  },

  action_view_set_quants_tree: {
    _odoo_model: 'ir.actions.server',
    model_id: 'model_stock_quant',
    model: 'stock_quant'
  }
}
