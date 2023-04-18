export default {
  view_stock_rules_report: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.rules.report',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          product_tmpl_id: {
            invisible: '1'
          },
          product_has_variants: {
            invisible: '1'
          },
          product_id: {
            domain: {
              todo_ctx: "[('product_tmpl_id', '=', product_tmpl_id)]"
            },
            readonly: [['product_has_variants', '=', false]],
            no_create: true
          },
          warehouse_ids: {
            widget: 'many2many_tags',
            groups: 'stock.group_stock_multi_warehouses'
          }
        },
        _footer: {
          _button_print_report: {
            _attr: {
              name: 'print_report',
              type: 'object',
              string: 'Overview',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-default'
            }
          }
        }
      }
    }
  },

  action_stock_rules_report: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Stock Rules Report',
    type: 'ir.actions.act_window',
    res_model: 'stock.rules.report',
    views: {
      tree: 'view_stock_rules_report',
      form: '=======todo=========='
    }
  }
}
