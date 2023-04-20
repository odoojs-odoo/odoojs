export default {
  action_get_picking_type_operations: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Operations',
    type: 'ir.actions.act_window',
    res_model: 'stock.move.line',
    search_view_id: 'stock_move_line_view_search',
    domain: "[['picking_type_id', '=', active_id], ['picking_id', '!=', False]]",
    context: {
      search_default_todo: '1'
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  view_move_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    type: 'tree',
    arch: {
      sheet: {
        location_usage: {
          invisible: '1'
        },
        location_dest_usage: {
          invisible: '1'
        },
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
        qty_done: {
          string: 'Quantity'
        },
        product_uom_id: {
          string: 'Unit',
          groups: 'uom.group_uom',
          no_open: true,
          no_create: true
        },
        state: {
          widget: 'badge',
          optional: 'show'
        },
        create_uid: {
          string: 'Done By',
          widget: 'many2one_avatar_user',
          optional: 'hide'
        }
      }
    }
  },

  view_move_line_tree_detailed: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    type: 'tree',
    arch: {
      sheet: {
        date: {
          optional: 'hide'
        },
        picking_id: {},
        picking_partner_id: {},
        product_id: {},
        lot_id: {
          groups: 'stock.group_production_lot',
          optional: 'hide'
        },
        location_id: {
          groups: 'stock.group_stock_multi_locations'
        },
        location_dest_id: {
          groups: 'stock.group_stock_multi_locations'
        },
        package_id: {
          groups: 'stock.group_tracking_lot'
        },
        qty_done: {
          string: 'Quantity Done',
          optional: 'hide'
        },
        product_uom_id: {
          string: 'Unit of Measure',
          groups: 'uom.group_uom',
          optional: 'hide',
          no_open: true,
          no_create: true
        },
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'hide',
          force_save: '1'
        },
        state: {
          widget: 'badge',
          optional: 'show'
        }
      }
    }
  },

  view_move_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    type: 'form',
    arch: {
      header: {
        state: {
          widget: 'statusbar'
        }
      },
      sheet: {
        company_id: {
          invisible: '1'
        },
        picking_id: {
          invisible: '1'
        },
        location_id: {
          invisible: '1'
        },
        location_dest_id: {
          invisible: '1'
        },
        package_id: {
          invisible: '1'
        },
        product_uom_category_id: {
          invisible: '1'
        },
        _group: {
          _group: {
            date: {},
            reference: {
              string: 'Reference'
            },
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
              string: 'Quantity Reserved',
              invisible: [['state', '=', 'done']]
            },
            _div: {
              _attr: {
                invisible: [['state', '=', 'done']],
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
            _label_qty_done: {
              for: 'qty_done',
              string: 'Quantity Done'
            },
            _div_871: {
              _attr: {
                class: 'o_row'
              },
              qty_done: {},
              product_uom_id: {
                string: 'Unit of Measure',
                groups: 'uom.group_uom',
                no_create: true
              }
            },
            lot_id: {
              groups: 'stock.group_production_lot',
              invisible: [['lot_id', '=', false], ['lot_name', '!=', false]],
              context: {
                todo_ctx: "{'default_product_id': product_id, 'active_picking_id': picking_id, 'default_company_id': company_id}"
              }
            },
            lot_name: {
              groups: 'stock.group_production_lot',
              invisible: ['|', ['lot_id', '!=', false], ['lot_name', '=', false]]
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
            },
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
      location_id: {
        string: 'Location',
        groups: 'stock.group_stock_multi_locations',
        filter_domain: {
          todo_ctx: "['|',('location_id', 'ilike', self),('location_dest_id', 'ilike', self)]"
        }
      },
      product_id: {},
      picking_id: {
        string: 'Transfer'
      },
      reference: {
        string: 'Reference'
      },
      product_category_name: {
        string: 'Category'
      },
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
      },
      _separator: {},
      _filter_todo: {
        _attr: {
          name: 'todo',
          string: 'To Do',
          domain: [['state', 'not in', ['done', 'draft', 'cancel']]]
        }
      },
      _filter_done: {
        _attr: {
          name: 'done',
          string: 'Done',
          domain: [['state', '=', 'done']]
        }
      },
      _separator_204: {},
      _filter_incoming: {
        _attr: {
          name: 'incoming',
          string: 'Incoming',
          domain: [['picking_id.picking_type_id.code', '=', 'incoming']]
        }
      },
      _filter_outgoing: {
        _attr: {
          name: 'outgoing',
          string: 'Outgoing',
          domain: [['picking_id.picking_type_id.code', '=', 'outgoing']]
        }
      },
      _filter_internal: {
        _attr: {
          name: 'internal',
          string: 'Internal',
          domain: [['picking_id.picking_type_id.code', '=', 'internal']]
        }
      },
      _filter_manufacturing: {
        _attr: {
          name: 'manufacturing',
          string: 'Manufacturing',
          invisible: '1',
          domain: [['picking_id.picking_type_id.code', '=', 'mrp_operation']]
        }
      },
      _separator_758: {},
      _filter_date: {
        _attr: {
          name: 'date',
          date: 'date'
        }
      },
      _filter_filter_last_30_days: {
        _attr: {
          name: 'filter_last_30_days',
          string: 'Last 30 Days',
          domain: {
            todo_ctx: "[('date','>=', (context_today() - relativedelta(days=30)).strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_filter_last_3_months: {
        _attr: {
          name: 'filter_last_3_months',
          string: 'Last 3 Months',
          domain: {
            todo_ctx: "[('date','>=', (context_today() - relativedelta(months=3)).strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_filter_last_12_months: {
        _attr: {
          name: 'filter_last_12_months',
          string: 'Last 12 Months',
          domain: {
            todo_ctx: "[('date','>=', (context_today() - relativedelta(years=1)).strftime('%Y-%m-%d'))]"
          }
        }
      },
      _separator_656: {},
      _filter_inventory: {
        _attr: {
          name: 'inventory',
          string: 'Inventory',
          domain: [['is_inventory', '=', true]]
        }
      },
      _separator_432: {},
      _group_groupby: {
        _attr: {
          name: 'groupby',
          string: 'Group By'
        },
        _filter_groupby_product_id: {
          _attr: {
            name: 'groupby_product_id',
            string: 'Product',
            domain: [],
            context: {
              group_by: 'product_id'
            }
          }
        },
        _filter_by_state: {
          _attr: {
            name: 'by_state',
            string: 'Status',
            domain: [],
            context: {
              group_by: 'state'
            }
          }
        },
        _filter_by_date: {
          _attr: {
            name: 'by_date',
            string: 'Date',
            domain: [],
            context: {
              group_by: 'date'
            }
          }
        },
        _filter_by_picking: {
          _attr: {
            name: 'by_picking',
            string: 'Transfers',
            domain: [],
            context: {
              group_by: 'picking_id'
            }
          }
        },
        _filter_by_location: {
          _attr: {
            name: 'by_location',
            string: 'Location',
            domain: [],
            context: {
              group_by: 'location_id'
            }
          }
        },
        _filter_by_category: {
          _attr: {
            name: 'by_category',
            string: 'Category',
            domain: [],
            context: {
              group_by: 'product_category_name'
            }
          }
        }
      }
    }
  },

  view_stock_move_line_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    type: 'otherview',
    arch: {}
  },

  action_revert_inventory_adjustment: {
    _odoo_model: 'ir.actions.server',
    model_id: 'stock.model_stock_move_line',
    model: 'stock_move_line'
  },

  stock_move_line_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Moves History',
    type: 'ir.actions.act_window',
    res_model: 'stock.move.line',
    search_view_id: 'tooooooodoooooo',
    context: {
      search_default_done: 1,
      create: 0
    },
    views: {
      tree: 'view_move_line_tree',
      form: '=======todo=========='
    }
  },

  view_stock_move_line_operation_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {
          invisible: '1',
          force_save: '1'
        },
        picking_id: {
          invisible: '1',
          force_save: '1'
        },
        move_id: {
          invisible: '1',
          force_save: '1'
        },
        product_uom_category_id: {
          invisible: '1'
        },
        product_id: {
          invisible: '1'
        },
        package_level_id: {
          invisible: '1'
        },
        location_id: {
          invisible: '1'
        },
        location_dest_id: {
          invisible: '1'
        },
        package_id: {
          invisible: '1'
        },
        _field_location_id_520: {
          location_id: {
            groups: 'stock.group_stock_multi_locations',
            invisible: "not context.get['show_source_location']",
            domain: {
              todo_ctx: "[('id', 'child_of', parent.location_id), '|', ('company_id', '=', False), ('company_id', '=', company_id), ('usage', '!=', 'view')]"
            },
            readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]],
            no_create: true
          }
        },
        _field_location_dest_id_639: {
          location_dest_id: {
            groups: 'stock.group_stock_multi_locations',
            invisible: "not context.get['show_destination_location']",
            domain: {
              todo_ctx: "[('id', 'child_of', parent.location_dest_id), '|', ('company_id', '=', False), ('company_id', '=', company_id), ('usage', '!=', 'view')]"
            },
            readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]]
          }
        },
        lot_id: {
          groups: 'stock.group_production_lot',
          invisible: "not context.get['show_lots_m2o']",
          domain: {
            todo_ctx: "[('product_id', '=', parent.product_id), ('company_id', '=', company_id)]"
          },
          readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]],
          context: {
            todo_ctx: "{                             'active_picking_id': picking_id,                             'default_company_id': parent.company_id,                             'default_product_id': parent.product_id,                         }"
          }
        },
        lot_name: {
          string: 'Lot/Serial Number',
          widget: 'text',
          groups: 'stock.group_production_lot',
          invisible: "not context.get['show_lots_text']",
          readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]],
          placeholder: 'Write your SN/LN one by one or copy paste a list.'
        },
        _field_package_id_846: {
          package_id: {
            groups: 'stock.group_tracking_lot',
            invisible: "not context.get['show_package']",
            readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]]
          }
        },
        result_package_id: {
          groups: 'stock.group_tracking_lot',
          readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]],
          context: {
            todo_ctx: "{'picking_id': picking_id}"
          }
        },
        owner_id: {
          groups: 'stock.group_tracking_owner',
          invisible: "not context.get['show_owner']",
          readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]]
        },
        reserved_uom_qty: {
          invisible: "not context.get['show_reserved_quantity']",
          readonly: '1'
        },
        state: {
          invisible: '1'
        },
        is_locked: {
          invisible: '1'
        },
        picking_code: {
          invisible: '1'
        },
        qty_done: {
          readonly: ['|', '&', ['state', '=', 'done'], ['is_locked', '=', true], '&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]]
        },
        product_uom_id: {
          string: 'Unit of Measure',
          groups: 'uom.group_uom',
          readonly: ['|', '|', ['reserved_uom_qty', '!=', 0.0], '&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true], '&', ['state', '=', 'done'], ['id', '!=', false]],
          no_open: true,
          no_create: true
        }
      }
    }
  },

  view_stock_move_line_detailed_operation_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    type: 'tree',
    arch: {
      sheet: {
        product_id: {
          readonly: ['|', ['state', '=', 'done'], ['move_id', '!=', false]],
          context: {
            default_detailed_type: 'product'
          },
          required: '1'
        },
        company_id: {
          invisible: '1'
        },
        move_id: {
          invisible: '1'
        },
        picking_id: {
          invisible: '1'
        },
        product_uom_category_id: {
          invisible: '1'
        },
        package_id: {
          invisible: '1'
        },
        result_package_id: {
          invisible: '1'
        },
        location_id: {
          invisible: '1'
        },
        location_dest_id: {
          invisible: '1'
        },
        _field_location_id_353: {
          location_id: {
            groups: 'stock.group_stock_multi_locations',
            domain: {
              todo_ctx: "[('id', 'child_of', parent.location_id), '|', ('company_id', '=', False), ('company_id', '=', company_id), ('usage', '!=', 'view')]"
            },
            column_invisible: [['parent.picking_type_code', '=', 'incoming']],
            no_create: true
          }
        },
        _field_location_dest_id_506: {
          location_dest_id: {
            groups: 'stock.group_stock_multi_locations',
            domain: {
              todo_ctx: "[('id', 'child_of', parent.location_dest_id), '|', ('company_id', '=', False), ('company_id', '=', company_id), ('usage', '!=', 'view')]"
            },
            column_invisible: [['parent.picking_type_code', '=', 'outgoing']],
            no_create: true
          }
        },
        _field_package_id_996: {
          package_id: {
            groups: 'stock.group_tracking_lot'
          }
        },
        _field_result_package_id_782: {
          result_package_id: {
            groups: 'stock.group_tracking_lot'
          }
        },
        lots_visible: {
          invisible: '1'
        },
        owner_id: {
          groups: 'stock.group_tracking_owner',
          column_invisible: [['parent.picking_type_code', '=', 'incoming']]
        },
        state: {
          invisible: '1'
        },
        lot_id: {
          groups: 'stock.group_production_lot',
          column_invisible: [['parent.show_lots_text', '=', true]],
          invisible: [['lots_visible', '=', false]],
          context: {
            todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id, 'active_picking_id': picking_id}"
          },
          optional: 'show'
        },
        lot_name: {
          groups: 'stock.group_production_lot',
          column_invisible: [['parent.show_lots_text', '=', false]],
          invisible: [['lots_visible', '=', false]],
          context: {
            todo_ctx: "{'default_product_id': product_id}"
          }
        },
        is_initial_demand_editable: {
          invisible: '1'
        },
        reserved_uom_qty: {
          column_invisible: ['|', ['parent.immediate_transfer', '=', true], ['parent.picking_type_code', '=', 'incoming']],
          readonly: '1',
          optional: 'show'
        },
        is_locked: {
          invisible: '1'
        },
        qty_done: {
          readonly: [['state', 'in', ('done', 'cancel')], ['is_locked', '=', true]],
          force_save: '1'
        },
        product_uom_id: {
          groups: 'uom.group_uom',
          readonly: [['state', '!=', 'draft'], ['id', '!=', false]],
          force_save: '1'
        }
      }
    }
  }
}
