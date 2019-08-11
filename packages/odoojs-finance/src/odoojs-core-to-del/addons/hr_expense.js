export default {
  name: 'hr_expense',
  depends: [
    'hr_contract',
    'account',
    // resource
  ],
  models: {
    'product.template': {
      fields: ['can_be_expensed'],
    },

    'account.move.line': {
      fields: ['expense_id'],
    },

    'hr.employee': {
      fields: ['expense_manager_id'],
    },

    'hr.department': {
      fields: ['expense_sheets_to_approve_count'],
    },

    'hr.expense': {
      fields: [
        'name',
        'date',
        'employee_id',
        'product_id',
        //  'product_uom_id',
        'unit_amount',
        'quantity',
        'tax_ids',
        'untaxed_amount',
        'total_amount',
        'total_amount_company',
        'company_id',
        //  'currency_id',
        //  'company_currency_id',
        'analytic_account_id',
        'analytic_tag_ids',
        'account_id',
        'description',
        'payment_mode',
        'attachment_number',
        'state',
        'sheet_id',
        'reference',
        'is_refused',
      ],
      //extend: hr_job_extend,
    },

    'hr.expense.sheet': {
      fields: [
        'name',
        'expense_line_ids',
        'state',
        'employee_id',
        'payment_mode',
        'user_id',
        'total_amount',
        'company_id',
        'currency_id',
        'attachment_number',
        'journal_id',
        'bank_journal_id',
        'accounting_date',
        'account_move_id',
        'department_id',
        'is_multiple_currency',
        'can_reset',
      ],
      //extend: hr_job_extend,
    },
  },
};
