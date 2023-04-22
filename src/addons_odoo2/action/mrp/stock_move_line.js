export default {
  view_stock_move_line_detailed_operation_tree_mrp: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    inherit_id: 'stock.view_stock_move_line_detailed_operation_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='product_id']",
            position: 'after'
          },
          description_bom_line: {
            column_invisible: [['parent.has_kits', '=', false]],
            optional: 'show'
          }
        }
      }
    }
  },

  action_mrp_production_moves: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Inventory Moves',
    type: 'ir.actions.act_window',
    res_model: 'stock.move.line',
    search_view_id: 'tooooooodoooooo',
    domain: "['|', ['move_id.raw_material_production_id', '=', active_id], ['move_id.production_id', '=', active_id]]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  view_stock_move_line_operation_tree_finished: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    inherit_id: 'stock.view_stock_move_line_operation_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='lot_id']",
            position: 'attributes'
          },
          _attribute_context: {
            _attr: {
              name: 'context',
              text: "{\n                        'active_mo_id': context.get('active_mo_id'),\n                        'active_picking_id': picking_id,\n                        'default_company_id': parent.company_id,\n                        'default_product_id': parent.product_id,\n                        }",
              context: "{\n                        'active_mo_id': context.get('active_mo_id'),\n                        'active_picking_id': picking_id,\n                        'default_company_id': parent.company_id,\n                        'default_product_id': parent.product_id,\n                        }"
            }
          }
        }
      }
    }
  },

  stock_move_line_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move.line',
    inherit_id: 'stock.stock_move_line_view_search',
    arch: {
      sheet: {
        _filter_manufacturing: {
          _attr: {
            name: 'manufacturing',
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0',
              invisible: '0'
            }
          },
          _attribute_domain: {
            _attr: {
              name: 'domain',
              text: "[('move_id.production_id', '!=', False)]",
              domain: "[['move_id.production_id', '!=', False]]"
            }
          }
        }
      }
    }
  },

  action_mrp_unbuild_moves: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Stock Moves',
    type: 'ir.actions.act_window',
    res_model: 'stock.move.line',
    search_view_id: 'tooooooodoooooo',
    domain: "['|', ['move_id.unbuild_id', '=', active_id], ['move_id.consume_unbuild_id', '=', active_id]]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
