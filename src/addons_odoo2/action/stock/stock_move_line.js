export default {
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
        _field_location_id_645: {
          location_id: {
            groups: 'stock.group_stock_multi_locations',
            invisible: "not context.get('show_source_location')",
            domain: {
              todo_ctx: "[('id', 'child_of', parent.location_id), '|', ('company_id', '=', False), ('company_id', '=', company_id), ('usage', '!=', 'view')]"
            },
            attrs: {
              readonly: "['&', ('package_level_id', '!=', False), ('parent.picking_type_entire_packs', '=', True)]"
            },
            no_create: true
          }
        },
        _field_location_dest_id_132: {
          location_dest_id: {
            groups: 'stock.group_stock_multi_locations',
            invisible: "not context.get('show_destination_location')",
            domain: {
              todo_ctx: "[('id', 'child_of', parent.location_dest_id), '|', ('company_id', '=', False), ('company_id', '=', company_id), ('usage', '!=', 'view')]"
            },
            attrs: {
              readonly: "['&', ('package_level_id', '!=', False), ('parent.picking_type_entire_packs', '=', True)]"
            }
          }
        },
        lot_id: {
          groups: 'stock.group_production_lot',
          invisible: "not context.get('show_lots_m2o')",
          domain: {
            todo_ctx: "[('product_id', '=', parent.product_id), ('company_id', '=', company_id)]"
          },
          attrs: {
            readonly: "['&', ('package_level_id', '!=', False), ('parent.picking_type_entire_packs', '=', True)]"
          },
          context: {
            todo_ctx: "{                             'active_picking_id': picking_id,                             'default_company_id': parent.company_id,                             'default_product_id': parent.product_id,                         }"
          }
        },
        lot_name: {
          string: 'Lot/Serial Number',
          widget: 'text',
          groups: 'stock.group_production_lot',
          invisible: "not context.get('show_lots_text')",
          attrs: {
            readonly: "['&', ('package_level_id', '!=', False), ('parent.picking_type_entire_packs', '=', True)]"
          },
          placeholder: 'Write your SN/LN one by one or copy paste a list.'
        },
        _field_package_id_424: {
          package_id: {
            groups: 'stock.group_tracking_lot',
            invisible: "not context.get('show_package')",
            attrs: {
              readonly: "['&', ('package_level_id', '!=', False), ('parent.picking_type_entire_packs', '=', True)]"
            }
          }
        },
        result_package_id: {
          groups: 'stock.group_tracking_lot',
          attrs: {
            readonly: "['&', ('package_level_id', '!=', False), ('parent.picking_type_entire_packs', '=', True)]"
          },
          context: {
            todo_ctx: "{'picking_id': picking_id}"
          }
        },
        owner_id: {
          groups: 'stock.group_tracking_owner',
          invisible: "not context.get('show_owner')",
          attrs: {
            readonly: "['&', ('package_level_id', '!=', False), ('parent.picking_type_entire_packs', '=', True)]"
          }
        },
        reserved_uom_qty: {
          invisible: "not context.get('show_reserved_quantity')"
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
          attrs: {
            readonly: "['|', '&', ('state', '=', 'done'), ('is_locked', '=', True), '&', ('package_level_id', '!=', False), ('parent.picking_type_entire_packs', '=', True)]"
          }
        },
        product_uom_id: {
          string: 'Unit of Measure',
          groups: 'uom.group_uom',
          attrs: {
            readonly: "['|', '|', ('reserved_uom_qty', '!=', 0.0), '&', ('package_level_id', '!=', False), ('parent.picking_type_entire_packs', '=', True), '&', ('state', '=', 'done'), ('id', '!=', False)]"
          },
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
          attrs: {
            readonly: "['|', ('state', '=', 'done'), ('move_id', '!=', False)]"
          },
          context: {
            default_detailed_type: 'product'
          }
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
        _field_location_id_633: {
          location_id: {
            groups: 'stock.group_stock_multi_locations',
            domain: {
              todo_ctx: "[('id', 'child_of', parent.location_id), '|', ('company_id', '=', False), ('company_id', '=', company_id), ('usage', '!=', 'view')]"
            },
            attrs: {
              column_invisible: "[('parent.picking_type_code', '=', 'incoming')]"
            },
            no_create: true
          }
        },
        _field_location_dest_id_729: {
          location_dest_id: {
            groups: 'stock.group_stock_multi_locations',
            domain: {
              todo_ctx: "[('id', 'child_of', parent.location_dest_id), '|', ('company_id', '=', False), ('company_id', '=', company_id), ('usage', '!=', 'view')]"
            },
            attrs: {
              column_invisible: "[('parent.picking_type_code', '=', 'outgoing')]"
            },
            no_create: true
          }
        },
        _field_package_id_667: {
          package_id: {
            groups: 'stock.group_tracking_lot'
          }
        },
        _field_result_package_id_637: {
          result_package_id: {
            groups: 'stock.group_tracking_lot'
          }
        },
        lots_visible: {
          invisible: '1'
        },
        owner_id: {
          groups: 'stock.group_tracking_owner',
          attrs: {
            column_invisible: "[('parent.picking_type_code', '=', 'incoming')]"
          }
        },
        state: {
          invisible: '1'
        },
        lot_id: {
          groups: 'stock.group_production_lot',
          attrs: {
            column_invisible: "[('parent.show_lots_text', '=', True)]",
            invisible: "[('lots_visible', '=', False)]"
          },
          context: {
            todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id, 'active_picking_id': picking_id}"
          }
        },
        lot_name: {
          groups: 'stock.group_production_lot',
          attrs: {
            column_invisible: "[('parent.show_lots_text', '=', False)]",
            invisible: "[('lots_visible', '=', False)]"
          },
          context: {
            todo_ctx: "{'default_product_id': product_id}"
          }
        },
        is_initial_demand_editable: {
          invisible: '1'
        },
        reserved_uom_qty: {
          attrs: {
            column_invisible: "['|', ('parent.immediate_transfer', '=', True), ('parent.picking_type_code', '=', 'incoming')]"
          }
        },
        is_locked: {
          invisible: '1'
        },
        qty_done: {
          attrs: {
            readonly: "[('state', 'in', ('done', 'cancel')), ('is_locked', '=', True)]"
          },
          force_save: '1'
        },
        product_uom_id: {
          groups: 'uom.group_uom',
          attrs: {
            readonly: "[('state', '!=', 'draft'), ('id', '!=', False)]"
          },
          force_save: '1'
        }
      }
    }
  }
}
