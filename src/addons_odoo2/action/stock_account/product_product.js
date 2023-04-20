export default {
  product_product_stock_tree_inherit_stock_account: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'stock.product_product_stock_tree',
    arch: {
      sheet: {
        qty_available: {
          position: 'before',
          __todo__before: {
            company_currency_id: {
              invisible: '1'
            },
            cost_method: {
              invisible: '1'
            },
            avg_cost: {
              string: 'Unit Cost',
              widget: 'monetary',
              optional: 'show',
              currency_field: 'company_currency_id'
            },
            total_value: {
              string: 'Total Value',
              widget: 'monetary',
              optional: 'show',
              currency_field: 'company_currency_id'
            },
            _button_stock_valuation_layer_action: {
              _attr: {
                name: 'stock_valuation_layer_action',
                type: 'action',
                title: 'Valuation Report',
                icon: 'fa-bar-chart',
                invisible: [['cost_method', '!=', 'average']],
                context: {
                  search_default_product_id: 'todo===id',
                  default_product_id: 'todo===id'
                },
                class: 'btn-link'
              }
            },
            _button_stock_valuation_layer_report_action: {
              _attr: {
                name: 'stock_valuation_layer_report_action',
                type: 'action',
                title: 'Valuation Report',
                icon: 'fa-bar-chart',
                invisible: [['cost_method', '!=', 'fifo']],
                context: {
                  search_default_product_id: 'todo===id',
                  default_product_id: 'todo===id'
                },
                class: 'btn-link'
              }
            }
          }
        }
      }
    }
  }
}
