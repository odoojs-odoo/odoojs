export default {
  view_hr_expense_sheet_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense.sheet',
    type: 'tree',

    fields: {
      employee_id: {},
      accounting_date: {},
      name: {},

      journal_id: {
        // domain: ({ record }) => {
        //   const { suitable_journal_ids } = record
        //   return [['id', 'in', suitable_journal_ids]]
        // }
      },

      total_amount: {},
      company_id: {},
      state: {}
    }
  },

  view_hr_expense_sheet_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense.sheet',
    type: 'form',

    fields: {
      name: {},
      employee_id: {},
      payment_mode: {},

      journal_id: {
        // domain: ({ record }) => {
        //   const { suitable_journal_ids } = record
        //   return [['id', 'in', suitable_journal_ids]]
        // }
      },

      user_id: {},
      accounting_date: {},

      company_id: {},
      state: {},
      total_amount: {},
      amount_residual: {},

      expense_line_ids: {
        widget: 'x2many_tree'
      }
    }
  },

  action_hr_expense_account: {
    _odoo_model: 'ir.actions',
    name: '员工报销费用',
    type: 'ir.actions.act_window',
    res_model: 'hr.expense.sheet',
    search_view_id: 'hr_expense_sheet_view_search',
    domain: [],
    context: {
      search_default_approved: 1,
      search_default_to_post: 1
    }
  },

  menu_hr_expense_account_employee_expenses: {
    _odoo_model: 'ir.ui.menu',
    active: false,
    parent: 'account.menu_finance_payables',
    action: 'action_hr_expense_account',
    name: '员工报销费用',
    sequence: 22
  }
}
