export default {
  hr_expense_approve_duplicate_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense.approve.duplicate',
    type: 'form',
    arch: {
      sheet: {
        sheet_ids: { invisible: '1' },
        _p: 'The following approved expenses have similar employee, amount and category than some expenses of this report. Please verify this report does not contain duplicates.',
        expense_ids: {
          views: {
            tree: {
              arch: {
                sheet: {
                  date: { readonly: '1' },
                  employee_id: { readonly: '1' },
                  product_id: { readonly: '1' },
                  total_amount_company: { readonly: '1' },
                  name: { readonly: '1' },
                  approved_by: { readonly: '1' },
                  approved_on: { readonly: '1' }
                }
              }
            }
          }
        },
        _footer: {
          _button_action_refuse: {
            _attr: {
              name: 'action_refuse',
              type: 'object',
              string: 'Refuse',
              invisible: [['sheet_ids', '=', []]],
              class: 'btn-primary'
            }
          },
          _button_action_approve: {
            _attr: {
              name: 'action_approve',
              type: 'object',
              string: 'Approve',
              invisible: [['sheet_ids', '=', []]],
              class: 'btn-secondary'
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
  },

  hr_expense_approve_duplicate_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Validate Duplicate Expenses',
    res_model: 'hr.expense.approve.duplicate',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'hr_expense_approve_duplicate_view_form',
      form: '=======todo=========='
    }
  }
}
