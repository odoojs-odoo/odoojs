export default {
  name: 'l10n_cn_hr_payroll',
  depends: ['hr_payroll'],

  models: {
    'hr.contract': {
      fields: ['tax_deduction'],
    },
  },
};
