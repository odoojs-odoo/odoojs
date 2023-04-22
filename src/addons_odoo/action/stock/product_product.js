export default {
  stock_product_search_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_search_form_view',
    arch: {
      sheet: {
        filters: {
          group_active: {},
          group_real_stock_available: {
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
    }
  },

  product_product_stock_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    type: 'tree',
    arch: {
      sheet: {
        // id: { invisible: '1' },
        display_name: { string: 'Product' },
        categ_id: { optional: 'hide' },
        qty_available: { string: 'On Hand' },
        _button_action_view_inventory_tree: {
          _attr: {
            name: 'action_view_inventory_tree',
            type: 'action',
            title: 'Inventory Adjustment',
            icon: 'fa-pencil',
            context: {
              search_default_product_id: 'todo===id',
              default_product_id: 'todo===id'
            },
            class: 'btn-link'
          }
        },
        free_qty: { string: 'Free to Use' },
        incoming_qty: { optional: 'show' },
        outgoing_qty: { optional: 'show' },
        virtual_available: { string: 'Forecasted', optional: 'hide' },
        uom_id: { string: 'Unit', groups: 'uom.group_uom', no_create: true },
        _button_stock_move_line_action: {
          _attr: {
            name: 'stock_move_line_action',
            type: 'action',
            string: 'History',
            icon: 'fa-history',
            context: {
              search_default_product_id: 'todo===id',
              default_product_id: 'todo===id'
            },
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
              search_default_product_id: 'todo===id',
              is_stock_report: true
            },
            class: 'btn-link'
          }
        },
        _button_action_view_quants: {
          _attr: {
            name: 'action_view_quants',
            type: 'action',
            string: 'Locations',
            icon: 'fa-cubes',
            groups: 'stock.group_stock_multi_locations',
            invisible: [['qty_available', '=', 0]],
            context: {
              search_default_product_id: 'todo===id',
              default_product_id: 'todo===id'
            },
            class: 'btn-link'
          }
        },
        _button_action_product_forecast_report: {
          _attr: {
            name: 'action_product_forecast_report',
            type: 'object',
            string: 'Forecast',
            icon: 'fa-area-chart',
            invisible: [
              ['incoming_qty', '=', 0],
              ['outgoing_qty', '=', 0]
            ],
            context: { default_product_id: 'todo===id' },
            class: 'btn-link'
          }
        }
      }
    }
  },

  product_search_form_view_stock_report: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'stock_product_search_form_view',
    arch: {
      filters: {
        group_type: {
          services: {
            invisible: 1
          },
          consumable: {
            invisible: 1
          }
        }
      }
    }
  },

  product_product_stock_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    type: 'tree',
    arch: {
      sheet: {
        display_name: { string: 'Product' },
        categ_id: { optional: 'hide' },
        qty_available: { string: 'On Hand' },

        free_qty: { string: 'Free to Use' },
        incoming_qty: { optional: 'show' },
        outgoing_qty: { optional: 'show' },
        virtual_available: { string: 'Forecasted', optional: 'hide' },
        uom_id: { string: 'Unit', groups: 'uom.group_uom', no_create: true }
      }
    }
  },

  action_product_stock_view: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Stock',
    res_model: 'product.product',
    search_view_id: 'product_search_form_view_stock_report',
    domain: [['detailed_type', '=', 'product']],
    context: { default_detailed_type: 'product' },
    views: {
      tree: 'product_product_stock_tree',
      form: 'product_product_stock_form'
    }
  }
}
