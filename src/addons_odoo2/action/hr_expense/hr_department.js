export default {
  hr_department_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.department',
    inherit_id: 'hr.hr_department_view_kanban',
    arch: {
      sheet: {
        _data: {
          _xpath: {
            _attr: {
              expr: '//templates',
              position: 'before'
            },
            expense_sheets_to_approve_count: { groups: 'hr_expense.group_hr_expense_team_approver' }
          },
          _xpath_539: {
            _attr: {
              expr: "//div[hasclass('o_kanban_primary_right')]",
              position: 'inside'
            },
            _div: {
              _attr: {
                groups: 'hr_expense.group_hr_expense_team_approver',
                class: 'row ml16'
              },
              _div: {
                _attr: { class: 'col' },
                _a_action_hr_expense_sheet_department_to_approve: {
                  _attr: {
                    name: '%(action_hr_expense_sheet_department_to_approve)d',
                    type: 'action',
                    text: 'Expense Reports'
                  },
                  _t: {}
                }
              }
            }
          },
          _xpath_708: {
            _attr: {
              expr: "//div[hasclass('o_kanban_manage_reports')]",
              position: 'inside'
            },
            _a_action_hr_expense_sheet_department_filtered: {
              _attr: {
                name: '%(action_hr_expense_sheet_department_filtered)d',
                type: 'action',
                groups: 'hr_expense.group_hr_expense_team_approver',
                class: 'dropdown-item',
                text: 'Expenses'
              }
            }
          }
        }
      }
    }
  }
}
