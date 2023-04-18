export default {
  action_picking_type_list: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Operations Types',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking.type',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  stock_picking_type_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Inventory Overview',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking.type',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  view_pickingtype_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    type: 'search',
    arch: {
      name: {},
      warehouse_id: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_groupby_code: {
          _attr: {
            name: 'groupby_code',
            string: 'Type of Operation',
            domain: [],
            context: {
              group_by: 'code'
            }
          }
        },
        _filter_groupby_warehouse_id: {
          _attr: {
            name: 'groupby_warehouse_id',
            string: 'Warehouse',
            domain: [],
            context: {
              group_by: 'warehouse_id'
            }
          }
        }
      }
    }
  },

  view_picking_type_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        name: {},
        active: {
          invisible: '1'
        },
        warehouse_id: {
          groups: 'stock.group_stock_multi_warehouses'
        },
        sequence_id: {
          groups: 'base.group_no_one'
        },
        company_id: {
          groups: 'base.group_multi_company'
        }
      }
    }
  },

  view_picking_type_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    type: 'form',
    arch: {
      sheet: {
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _label_name: {
          for: 'name'
        },
        _h1: {
          name: {
            placeholder: 'e.g. Receptions'
          }
        },
        _group_first: {
          _attr: {
            name: 'first'
          },
          _group: {
            code: {},
            active: {
              invisible: '1'
            },
            company_id: {
              invisible: '1'
            },
            hide_reservation_method: {
              invisible: '1'
            },
            sequence_id: {
              groups: 'base.group_no_one'
            },
            sequence_code: {},
            warehouse_id: {
              groups: 'stock.group_stock_multi_warehouses',
              force_save: '1'
            },
            reservation_method: {
              widget: 'radio',
              invisible: [['hide_reservation_method', '=', true]]
            },
            auto_show_reception_report: {
              groups: 'stock.group_reception_report',
              invisible: [['code', 'not in', ['incoming', 'internal']]]
            },
            _label_reservation_days_before: {
              for: 'reservation_days_before',
              string: 'Reserve before scheduled date',
              invisible: ['|', ['code', '=', 'incoming'], ['reservation_method', '!=', 'by_date']]
            },
            _div: {
              _attr: {
                invisible: ['|', ['code', '=', 'incoming'], ['reservation_method', '!=', 'by_date']],
                class: 'o_row'
              },
              _span: {
                reservation_days_before: {}
              },
              _span_495: {
                reservation_days_before_priority: {}
              }
            }
          },
          _group_646: {
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            return_picking_type_id: {
              string: 'Returns Type',
              invisible: [['code', 'not in', ['incoming', 'outgoing', 'internal']]]
            },
            create_backorder: {},
            show_operations: {},
            show_reserved: {
              invisible: [['code', '!=', 'incoming']]
            }
          }
        },
        _group_second: {
          _attr: {
            name: 'second'
          },
          _group_stock_picking_type_lot: {
            _attr: {
              name: 'stock_picking_type_lot',
              string: 'Lots/Serial Numbers',
              groups: 'stock.group_production_lot',
              invisible: [['code', 'not in', ['incoming', 'outgoing', 'internal']]]
            },
            use_create_lots: {
              string: 'Create New'
            },
            use_existing_lots: {
              string: 'Use Existing ones'
            }
          },
          _group: {
            _attr: {
              string: 'Packages',
              groups: 'stock.group_tracking_lot',
              invisible: [['code', 'not in', ['incoming', 'outgoing', 'internal']]]
            },
            show_entire_packs: {}
          },
          _group_locations: {
            _attr: {
              name: 'locations',
              string: 'Locations',
              groups: 'stock.group_stock_multi_locations'
            },
            default_location_src_id: {
              required: [['code', 'in', ('internal', 'outgoing')]],
              no_create: true
            },
            default_location_dest_id: {
              required: [['code', 'in', ('internal', 'incoming')]],
              no_create: true
            }
          }
        }
      }
    }
  },

  stock_picking_type_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    type: 'otherview',
    arch: {}
  }
}
