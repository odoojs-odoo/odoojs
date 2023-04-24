export default {
  hr_expense_split: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense.split.wizard',
    type: 'form',
    arch: {
      sheet: {
        total_amount_original: { invisible: '1' },
        expense_id: { invisible: '1' },
        expense_split_line_ids: {
          widget: 'one2many',
          context: { todo_ctx: "{'default_expense_id': expense_id}" },
          views: {
            tree: {
              arch: {
                sheet: {
                  currency_id: { invisible: '1' },
                  expense_id: { invisible: '1' },
                  company_id: { invisible: '1' },
                  product_has_tax: { invisible: '1' },
                  product_has_cost: { invisible: '1' },
                  name: {},
                  product_id: {},
                  total_amount: {
                    readonly: [['product_has_cost', '=', true]],
                    force_save: '1'
                  },
                  tax_ids: {
                    widget: 'many2many_tags',
                    readonly: [['product_has_tax', '=', false]]
                  },
                  amount_tax: {},
                  analytic_distribution: {
                    widget: 'analytic_distribution',
                    groups: 'analytic.group_analytic_accounting',
                    optional: 'show'
                  },
                  employee_id: { widget: 'many2one_avatar_employee' }
                }
              }
            }
          }
        },
        currency_id: { invisible: '1' },
        _group_expense_total: {
          _attr: {
            name: 'expense_total',
            class: 'oe_subtotal_footer oe_right'
          },
          _label_total_amount: {
            for: 'total_amount',
            invisible: [['split_possible', '=', true]]
          },
          total_amount: {
            invisible: [['split_possible', '=', true]],
            class: 'text-danger'
          },
          _field_total_amount_178: {
            total_amount: { invisible: [['split_possible', '=', false]] }
          },
          total_amount_original: {
            string: 'Original Amount',
            widget: 'monetary'
          },
          total_amount_taxes: {
            string: 'Taxes',
            widget: 'monetary'
          }
        },
        split_possible: { invisible: '1' },
        _footer: {
          _button_action_split_expense: {
            _attr: {
              name: 'action_split_expense',
              type: 'object',
              string: 'Split Expense',
              invisible: [['split_possible', '=', true]],
              class: 'oe_highlight disabled'
            }
          },
          _button_action_split_expense_230: {
            _attr: {
              name: 'action_split_expense',
              type: 'object',
              string: 'Split Expense',
              invisible: [['split_possible', '=', false]],
              class: 'oe_highlight'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
