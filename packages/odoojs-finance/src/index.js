import ODOO from 'odoojs-core';

const get_modules = () => {
  const {
    base,
    base_address_city,
    account,
    analytic,
    ow_account,
    ow_account_balance,
    hr,
    hr_contract,
    hr_expense,
    hr_payroll,
    l10n_cn_hr_payroll,
  } = ODOO.addons;

  return {
    base,
    base_address_city,
    account,
    analytic,
    ow_account,
    ow_account_balance,
    hr,
    hr_contract,
    hr_expense,
    hr_payroll,
    l10n_cn_hr_payroll,
  };
};

const get_odoo = ({ host, db, success, error }) => {
  const modules = get_modules();

  const odoo = new ODOO({
    host,
    db,
    modules,
    success,
    error,
  });
  console.log(odoo);
  return odoo;
};

export default get_odoo;
