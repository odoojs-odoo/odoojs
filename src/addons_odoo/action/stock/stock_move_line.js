export default {
  view_move_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        location_usage: { invisible: '1' },
        location_dest_usage: { invisible: '1' },
        date: {},
        reference: {
          string: 'Reference',
          invisible: "context.get['no_reference', False]"
        },
        product_id: {},
        lot_id: {
          groups: 'stock.group_production_lot',
          optional: 'show'
        },
        package_id: {
          groups: 'stock.group_tracking_lot',
          optional: 'hide'
        },
        result_package_id: {
          groups: 'stock.group_tracking_lot',
          optional: 'hide'
        },
        location_id: {},
        location_dest_id: {},
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'hide',
          force_save: '1'
        },
        qty_done: { string: 'Quantity' },
        product_uom_id: {
          string: 'Unit',
          groups: 'uom.group_uom',
          no_open: true,
          no_create: true
        },
        state: { widget: 'badge', optional: 'show' },
        create_uid: {
          string: 'Done By',
          widget: 'many2one_avatar_user',
          optional: 'hide'
        }
      }
    }
  },

  view_move_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      header: {
        state: { widget: 'statusbar' }
      },
      sheet: {
        company_id: { invisible: '1' },
        picking_id: { invisible: '1' },
        location_id: { invisible: '1' },
        location_dest_id: { invisible: '1' },
        package_id: { invisible: '1' },
        product_uom_category_id: { invisible: '1' },
        _group: {
          _group: {
            date: {},
            reference: { string: 'Reference' },
            origin: {},
            product_id: {},
            location_id: {
              groups: 'stock.group_stock_multi_locations',
              no_create: true
            },
            location_dest_id: {
              groups: 'stock.group_stock_multi_locations',
              no_create: true
            }
          },
          _group_648: {
            _label_reserved_uom_qty: {
              for: 'reserved_uom_qty',
              string: 'Quantity Reserved'
              //   invisible: [['state', '=', 'done']]
            },
            _div: {
              _attr: {
                // invisible: [['state', '=', 'done']],
                class: 'o_row'
              },
              reserved_uom_qty: {
                readonly: '1'
              },
              product_uom_id: {
                string: 'Unit of Measure',
                groups: 'uom.group_uom',
                no_create: true
              }
            },
            _label_qty_done: { for: 'qty_done', string: 'Quantity Done' },
            _div_871: {
              _attr: { class: 'o_row' },
              qty_done: {},
              product_uom_id: {
                string: 'Unit of Measure',
                groups: 'uom.group_uom',
                no_create: true
              }
            },
            lot_id: {
              groups: 'stock.group_production_lot',
              //   invisible: [
              //     ['lot_id', '=', false],
              //     ['lot_name', '!=', false]
              //   ],
              context: {
                // todo_ctx:
                //   "{'default_product_id': product_id, 'active_picking_id': picking_id, 'default_company_id': company_id}"
              }
            },
            lot_name: {
              groups: 'stock.group_production_lot'
              //   invisible: [
              //     '|',
              //     ['lot_id', '!=', false],
              //     ['lot_name', '=', false]
              //   ]
            },
            package_id: {
              string: 'Source Package',
              groups: 'stock.group_tracking_lot'
            },
            result_package_id: {
              string: 'Destination Package',
              groups: 'stock.group_tracking_lot'
            },
            owner_id: { string: 'Owner', groups: 'stock.group_tracking_owner' },
            create_uid: {
              string: 'Done By',
              widget: 'many2one_avatar_user',
              optional: 'hide'
            }
          }
        }
      }
    }
  },

  stock_move_line_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    type: 'search',
    arch: {
      fields: {
        location_id: {
          string: 'Location',
          groups: 'stock.group_stock_multi_locations',
          filter_domain(self) {
            return [
              '|',
              ['location_id', 'ilike', self],
              ['location_dest_id', 'ilike', self]
            ]
          }
        },
        product_id: {},
        picking_id: { string: 'Transfer' },
        reference: { string: 'Reference' },
        product_category_name: { string: 'Category' },
        lot_id: {
          string: 'Lot/Serial Number',
          groups: 'stock.group_production_lot'
        },
        package_id: {
          string: 'Source Package',
          groups: 'stock.group_tracking_lot'
        },
        result_package_id: {
          string: 'Destination Package',
          groups: 'stock.group_tracking_lot'
        },
        owner_id: {
          string: 'Owner',
          groups: 'stock.group_tracking_owner'
        }
      },

      filters: {
        group_state: {
          todo: {
            name: 'todo',
            string: 'To Do',
            domain: [['state', 'not in', ['done', 'draft', 'cancel']]]
          },
          done: {
            name: 'done',
            string: 'Done',
            domain: [['state', '=', 'done']]
          }
        },
        group_picking_type_id: {
          incoming: {
            name: 'incoming',
            string: 'Incoming',
            domain: [['picking_id.picking_type_id.code', '=', 'incoming']]
          },
          outgoing: {
            name: 'outgoing',
            string: 'Outgoing',
            domain: [['picking_id.picking_type_id.code', '=', 'outgoing']]
          },
          internal: {
            name: 'internal',
            string: 'Internal',
            domain: [['picking_id.picking_type_id.code', '=', 'internal']]
          },
          manufacturing: {
            name: 'manufacturing',
            string: 'Manufacturing',
            invisible: '1',
            domain: [['picking_id.picking_type_id.code', '=', 'mrp_operation']]
          }
        },

        group_date: {
          date: { name: 'date', date: 'date' },
          filter_last_30_days: {
            name: 'filter_last_30_days',
            string: 'Last 30 Days',
            domain({ env }) {
              const last30 = env.date_tools.increase(new Date(), -30)
              return [['date', '>=', last30]]
            }
          },
          filter_last_3_months: {
            name: 'filter_last_3_months',
            string: 'Last 3 Months',
            domain({ env }) {
              const last90 = env.date_tools.increase(new Date(), -92)
              return [['date', '>=', last90]]
            }
          },
          filter_last_12_months: {
            name: 'filter_last_12_months',
            string: 'Last 12 Months',
            domain({ env }) {
              const last90 = env.date_tools.increase(new Date(), -366)
              return [['date', '>=', last90]]
            }
          }
        },

        group_inventory: {
          inventory: {
            name: 'inventory',
            string: 'Inventory',
            domain: [['is_inventory', '=', true]]
          }
        }
      }
    }
  },

  stock_move_line_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Moves History',
    type: 'ir.actions.act_window',
    res_model: 'stock.move.line',
    search_view_id: 'stock_move_line_view_search',
    context: { search_default_done: 1, create: 0 },
    views: {
      tree: 'view_move_line_tree',
      form: 'view_move_line_form'
    }
  }
}
