export default {
  name: 'hr_payroll_account',
  depends: ['hr_payroll', 'account'],
  models: {
    'hr.payslip': {
      fields: ['date', 'journal_id', 'move_id'],
    },

    'hr.salary.rule': {
      fields: [
        'analytic_account_id',
        'account_tax_id',
        'account_debit',
        'account_credit',
      ],
    },

    'hr.contract': {
      fields: ['analytic_account_id', 'journal_id'],
    },

    'hr.payslip.run': {
      fields: ['journal_id'],
    },
  },
};
