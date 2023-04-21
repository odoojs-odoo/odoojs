export default {
  quant_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    type: 'search',
    arch: {
      fields: {
        product_id: {
          _default: 1
        },
        location_id: {},
        warehouse_id: {},
        storage_category_id: { groups: 'stock.group_stock_storage_categories' },
        user_id: {},
        inventory_date: {},
        product_categ_id: {},
        product_tmpl_id: {},
        package_id: { groups: 'stock.group_tracking_lot' },
        lot_id: { groups: 'stock.group_production_lot' },
        owner_id: { groups: 'stock.group_tracking_owner' }
      },

      filters: {
        group_location_id: {
          internal_loc: {
            name: 'internal_loc',
            string: 'Internal Locations',
            domain: [['location_id.usage', '=', 'internal']]
          },
          transit_loc: {
            name: 'transit_loc',
            string: 'Transit Locations',
            domain: [['location_id.usage', '=', 'transit']]
          }
        },

        group_inventory: {
          on_hand: {
            name: 'on_hand',
            string: 'On Hand',
            domain: [['on_hand', '=', true]]
          },
          to_count: {
            name: 'to_count',
            string: 'To Count',
            domain({ env }) {
              const today = env.date_tools.today
              return [['inventory_date', '<=', today]]
            }
          },
          to_apply: {
            name: 'to_apply',
            string: 'To Apply',
            domain: [['inventory_quantity_set', '=', true]]
          },
          priority_products: {
            name: 'priority_products',
            string: 'Starred Products',
            domain: [['priority', '=', 1]]
          }
        },

        group_negative: {
          negative: {
            name: 'negative',
            string: 'Negative Stock',
            domain: [['quantity', '<', 0.0]]
          },
          reserved: {
            name: 'reserved',
            string: 'Reservations',
            domain: [['reserved_quantity', '>', 0.0]]
          }
        },

        group_in_date: {
          filter_in_date: { name: 'filter_in_date', date: 'in_date' }
        },

        group_my_count: {
          my_count: {
            name: 'my_count',
            string: 'My Counts',
            domain({ env }) {
              return [['user_id', '=', env.uid]]
            }
          }
        }
      }
    }
  },

  view_stock_quant_form_editable: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        _group: {
          _group: {
            tracking: { invisible: '1' },
            // company_id: { invisible: '1' },
            product_id: { readonly: '0', no_create: true },
            location_id: { readonly: '0', no_create: true },
            lot_id: {
              groups: 'stock.group_production_lot'
              //   readonly: [['tracking', 'not in', ['serial', 'lot']]],
              //   required: [['tracking', '!=', 'none']],
              //   context: {
              //     todo_ctx:
              //       "{'default_product_id': product_id, 'default_company_id': company_id}"
              //   }
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
            company_id: { groups: 'base.group_multi_company' }
          },
          _group_335: {
            _label_quantity: { for: 'quantity', string: 'Quantity On Hand' },
            _div: {
              _attr: { class: 'o_row' },
              quantity: {},
              product_uom_id: { groups: 'uom.group_uom' }
            },
            _label_available_quantity: {
              for: 'available_quantity',
              string: 'Available Quantity'
            },
            _div_111: {
              _attr: { class: 'o_row' },
              available_quantity: {},
              product_uom_id: { groups: 'uom.group_uom' }
            },
            _label_reserved_quantity: {
              for: 'reserved_quantity',
              string: 'Quantity Reserved'
            },
            _div_173: {
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
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        create_date: { invisible: '1' },
        write_date: { invisible: '1' },
        id: { invisible: '1' },
        tracking: { invisible: '1' },
        // company_id: { invisible: '1' },
        location_id: {
          //   invisible: "context.get['hide_location', False]",
          //   readonly: [['id', '!=', false]],
          no_create: true
        },
        storage_category_id: { optional: 'hide' },
        product_id: {
          widget: 'many2one'
          //   readonly: "context.get['single_product', False]",
          //   force_save: '1',
          //   no_create: true
        },
        product_categ_id: { optional: 'hide' },
        company_id: { groups: 'base.group_multi_company', optional: 'hidden' },
        package_id: {
          groups: 'stock.group_tracking_lot'
          //   readonly: [['id', '!=', false]]
        },
        lot_id: {
          groups: 'stock.group_production_lot'
          //   invisible: "context.get['hide_lot', False]",
          //   readonly: [
          //     '|',
          //     ['id', '!=', false],
          //     ['tracking', 'not in', ['serial', 'lot']]
          //   ],
          //   required: [['tracking', '!=', 'none']],
          //   context: {
          //     todo_ctx:
          //       "{'default_product_id': product_id, 'default_company_id': company_id}"
          //   }
        },
        owner_id: {
          groups: 'stock.group_tracking_owner'
          //   readonly: [['id', '!=', false]],
          //   no_create: true
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
            context: {
              //   todo_ctx:
              //     "{'search_default_product_id': product_id, 'default_product_id': product_id}"
            },
            class: 'btn-link'
          }
        },
        reserved_quantity: { optional: 'show' },
        product_uom_id: { string: 'Unit', groups: 'uom.group_uom' },
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
            context: {
              //   todo_ctx:
              //     "{'default_product_id': product_id, 'search_default_location_id': location_id}"
            },
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
        product_id: {
          //   invisible: "context.get['single_product', False]"
        },
        location_id: {
          //   invisible: "context.get['hide_location', False]"
        },
        lot_id: {
          groups: 'stock.group_production_lot'
          //   invisible: "context.get['hide_lot', False]"
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

  dashboard_open_quants: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Locations',
    res_model: 'stock.quant',
    search_view_id: 'quant_search_view',
    context: {
      search_default_internal_loc: 1,
      search_default_productgroup: 1,
      search_default_locationgroup: 1,
      inventory_mode: true
    },
    views: {
      //   tree: 'view_stock_quant_tree_editable',
      tree: 'view_stock_quant_tree',
      form: 'view_stock_quant_form_editable'
    }
  }

  //   location_open_quants: {
  //     _odoo_model: 'ir.actions.act_window',
  //     name: 'Current Stock',
  //     res_model: 'stock.quant',
  //     search_view_id: 'quant_search_view',
  //     domain: "[['location_id', 'child_of', active_ids]]",
  //     context: {
  //       search_default_productgroup: 1
  //     },
  //     views: {
  //       tree: 'view_stock_quant_tree',
  //       form: '=======todo=========='
  //     }
  //   }
}
