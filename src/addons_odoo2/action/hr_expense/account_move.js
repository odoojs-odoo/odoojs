export default {
  view_move_form_inherit_expense: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_move_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          expense_sheet_id: { invisible: '1' },
          _button_action_open_expense_report: {
            _attr: {
              name: 'action_open_expense_report',
              type: 'object',
              string: 'Expense Report',
              icon: 'fa-file-text-o',
              groups: 'account.group_account_user,account.group_account_readonly',
              invisible: [['expense_sheet_id', '=', []]],
              class: 'oe_stat_button'
            }
          }
        }
      }
    }
  }
}
