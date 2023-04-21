export default {
  view_stock_quant_tree_inventory_editable_inherit_stock_account: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    inherit_id: 'stock.view_stock_quant_tree_inventory_editable',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='product_uom_id']",
            position: 'after'
          },
          accounting_date: { optional: 'hide' }
        }
      }
    }
  },

  view_stock_quant_tree_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    inherit_id: 'stock.view_stock_quant_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='product_uom_id']",
            position: 'after'
          },
          currency_id: { invisible: '1' },
          value: { optional: 'hidden' }
        }
      }
    }
  },

  view_stock_quant_tree_editable_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant',
    inherit_id: 'stock.view_stock_quant_tree_editable',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='product_uom_id']",
            position: 'after'
          },
          currency_id: { invisible: '1' },
          cost_method: { invisible: '1' },
          value: { optional: 'hidden' }
        },
        _xpath_440: {
          _attr: {
            expr: "//button[@name='action_view_orderpoints']",
            position: 'after'
          },
          _button_stock_valuation_layer_report_action: {
            _attr: {
              name: 'stock_valuation_layer_report_action',
              type: 'action',
              string: 'Valuation',
              title: 'Stock Valuation',
              icon: 'fa-bar-chart',
              invisible: [['cost_method', '!=', 'fifo']],
              context: { todo_ctx: "{'search_default_product_id': product_id}" },
              class: 'btn-link'
            }
          }
        }
      }
    }
  }
}
