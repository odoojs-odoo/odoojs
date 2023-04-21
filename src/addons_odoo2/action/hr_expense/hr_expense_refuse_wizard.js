export default {
  hr_expense_refuse_wizard_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense.refuse.wizard',
    type: 'form',
    arch: {
      sheet: {
        _separator: {
          _attr: { string: 'Reason to refuse Expense' }
        },
        hr_expense_ids: { invisible: '1' },
        hr_expense_sheet_id: { invisible: '1' },
        reason: { class: 'w-100' },
        _footer: {
          _button_expense_refuse_reason: {
            _attr: {
              name: 'expense_refuse_reason',
              type: 'object',
              string: 'Refuse',
              class: 'oe_highlight'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'oe_link'
            }
          }
        }
      }
    }
  },

  hr_expense_refuse_wizard_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Refuse Expense',
    res_model: 'hr.expense.refuse.wizard',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'hr_expense_refuse_wizard_view_form',
      form: '=======todo=========='
    }
  }
}
