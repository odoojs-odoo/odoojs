export default {
  view_production_tree_view_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.production',
    inherit_id: 'mrp.mrp_production_tree_view',
    arch: {
      sheet: {
        name: {
          position: 'after',
          __todo__after: {
            analytic_account_id: {
              groups: 'analytic.group_analytic_accounting',
              optional: 'hide'
            }
          }
        }
      }
    }
  },

  mrp_production_form_view_inherited: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.production',
    inherit_id: 'mrp.mrp_production_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='product_id']",
            position: 'before'
          },
          show_valuation: {
            groups: 'stock.group_stock_manager',
            invisible: '1'
          }
        },
        _xpath_272: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          _t: {
            _attr: { groups: 'stock.group_stock_manager' },
            _button_action_view_stock_valuation_layers: {
              _attr: {
                name: 'action_view_stock_valuation_layers',
                type: 'object',
                string: 'Valuation',
                icon: 'fa-dollar',
                groups: 'base.group_no_one',
                invisible: [['show_valuation', '=', false]],
                class: 'oe_stat_button'
              }
            },
            _button_action_view_analytic_account: {
              _attr: {
                name: 'action_view_analytic_account',
                type: 'object',
                string: 'Analytic Account',
                icon: 'fa-bar-chart-o',
                groups: 'analytic.group_analytic_accounting',
                invisible: ['|', ['analytic_account_id', '=', false], ['state', 'in', ['draft', 'cancel']]],
                class: 'oe_stat_button'
              }
            }
          }
        },
        _xpath_478: {
          _attr: {
            expr: "//page[@name='miscellaneous']//field[@name='date_deadline']",
            position: 'after'
          },
          _t: {
            _attr: { groups: 'stock.group_stock_manager' },
            analytic_account_id: { groups: 'analytic.group_analytic_accounting' }
          }
        }
      }
    }
  },

  view_production_graph_inherit_mrp_account: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.production',
    inherit_id: 'mrp.view_production_graph',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//graph',
            position: 'inside'
          },
          extra_cost: { invisible: '1' }
        }
      }
    }
  }
}
