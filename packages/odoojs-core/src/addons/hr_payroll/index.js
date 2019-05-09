import hr_contract from './hr_contract';
import hr_salary_rule from './hr_salary_rule';
import hr_payslip from './hr_payslip';

export default {
  name: 'hr_payroll',
  depends: [
    'hr_contract',
    'hr_holidays',
    //'decimal_precision'
  ],

  models: {
    ...hr_contract.models,
    ...hr_salary_rule.models,
    ...hr_payslip.models,
  },
};
