export default {
  stock_valuation_layer_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.valuation.layer',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            create_date: { string: 'Date' },
            product_id: {},
            stock_move_id: { invisible: [['stock_move_id', '=', false]] }
          }
        },
        _notebook: {
          _page_valuation: {
            _attr: {
              name: 'valuation',
              string: 'Valuation'
            },
            _group: {
              quantity: {},
              uom_id: { groups: 'uom.group_uom' },
              currency_id: { invisible: '1' },
              unit_cost: {},
              value: {},
              remaining_qty: {}
            }
          },
          _page_other_info: {
            _attr: {
              name: 'other_info',
              string: 'Other Info'
            },
            _group: {
              description: {},
              account_move_id: {
                groups: 'account.group_account_invoice',
                invisible: [['account_move_id', '=', false]]
              },
              company_id: { groups: 'base.group_multi_company' },
              stock_valuation_layer_id: { invisible: [['stock_valuation_layer_id', '=', false]] }
            }
          }
        }
      }
    }
  },

  stock_valuation_layer_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.valuation.layer',
    type: 'tree',
    arch: {
      sheet: {
        create_date: { string: 'Date' },
        reference: {},
        _button_action_open_layer: {
          _attr: {
            name: 'action_open_layer',
            type: 'object',
            title: 'Open Valuation Layer',
            icon: 'fa-arrow-right'
          }
        },
        product_id: {},
        company_id: { groups: 'base.group_multi_company' },
        quantity: { string: 'Moved Quantity' },
        unit_cost: {},
        uom_id: { groups: 'uom.group_uom' },
        currency_id: { invisible: '1' },
        value: {},
        _groupby_product_id: {
          _attr: { name: 'product_id' },
          cost_method: { invisible: '1' },
          quantity_svl: { invisible: '1' },
          _button_action_revaluation: {
            _attr: {
              name: 'action_revaluation',
              type: 'object',
              title: 'Add Manual Valuation',
              icon: 'fa-plus',
              invisible: ['|', ['cost_method', '=', 'standard'], ['quantity_svl', '<=', 0]]
            }
          }
        }
      }
    }
  },

  stock_valuation_layer_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.valuation.layer',
    type: 'otherview',
    arch: {}
  },

  stock_valuation_layer_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Stock Valuation',
    type: 'ir.actions.act_window',
    res_model: 'stock.valuation.layer',
    search_view_id: 'tooooooodoooooo',
    domain: "[['product_id.type', '=', 'product']]",
    views: {
      tree: 'stock_valuation_layer_tree',
      form: '=======todo=========='
    }
  },

  view_inventory_valuation_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.valuation.layer',
    type: 'search',
    arch: {
      product_id: {},
      categ_id: {},
      product_tmpl_id: {},
      _separator: {},
      _filter_incoming: {
        _attr: {
          name: 'incoming',
          string: 'Incoming',
          domain: [['stock_move_id.location_id.usage', 'not in', ('internal', 'transit')], ['stock_move_id.location_dest_id.usage', 'in', ('internal', 'transit')]]
        }
      },
      _filter_outgoing: {
        _attr: {
          name: 'outgoing',
          string: 'Outgoing',
          domain: [['stock_move_id.location_id.usage', 'in', ('internal', 'transit')], ['stock_move_id.location_dest_id.usage', 'not in', ('internal', 'transit')]]
        }
      },
      _separator_840: {},
      _filter_has_remaining_qty: {
        _attr: {
          name: 'has_remaining_qty',
          string: 'Has Remaining Qty',
          domain: [['remaining_qty', '>', 0]]
        }
      },
      _group: {
        _attr: { string: 'Group by...' },
        _filter_group_by_product_id: {
          _attr: {
            name: 'group_by_product_id',
            string: 'Product',
            context: { group_by: 'product_id' }
          }
        }
      }
    }
  },

  stock_valuation_layer_report_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.valuation.layer',
    inherit_id: 'stock_valuation_layer_tree',
    arch: {
      sheet: {
        quantity: {
          position: 'attributes',
          invisible: '1'
        },
        unit_cost: {
          position: 'after',
          __todo__after: {
            remaining_qty: {}
          }
        },
        value: {
          position: 'before',
          __todo__before: {
            remaining_value: {}
          }
        }
      }
    }
  },

  stock_valuation_layer_report_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Stock Valuation',
    type: 'ir.actions.act_window',
    res_model: 'stock.valuation.layer',
    search_view_id: 'tooooooodoooooo',
    domain: "[['product_id.type', '=', 'product']]",
    context: { search_default_has_remaining_qty: 1 },
    views: {
      tree: 'stock_valuation_layer_report_tree',
      form: '=======todo=========='
    }
  }
}
