import l10n_cn_hr_payroll from './l10n_cn_hr_payroll';

export default {
  name: 'l10n_cn_hr_payroll',
  depends: ['hr_payroll'],
  models: {
    ...l10n_cn_hr_payroll.models,
  },
};
