import ODOO from './odoojs-core';

const get_modules = () => {
  const {
    base,
    base_address_city,
    account,
    analytic,
    zoa_account,
    hr,
    hr_contract,
    hr_payroll,
    l10n_cn_hr_payroll,
  } = ODOO.addons;

  return {
    base,
    base_address_city,
    account,
    analytic,
    zoa_account,
    hr,
    hr_contract,
    hr_payroll,
    l10n_cn_hr_payroll,
  };
};

const get_models = () => {
  return {
    'account.account': [],
    'res.partner': [],
    'res.bank': [],
    'res.partner.bank': [],
    'account.journal': [],
    'product.product': [],
    'account.analytic.account': [],
    'oba.account.sub.account': [],
    'account.account.tag': [],

    'account.invoice': [],
    'account.invoice.line': [],
    'account.invoice.tax': [],

    'account.move': [],
    'account.move.line': [],
    'oba.account.balance': [],
    'oba.account.balance.line': [],
    'account.tax': [],

    'hr.employee': [],
    'hr.contract': [],
    'hr.payroll.structure': [],
    'hr.payslip': [],
    'hr.payslip.line': [],

    //'res.company': ['name', 'company_registry', 'user_ids'],
    //'res.users': ['name', 'email', 'login', 'ref', 'company_id', 'partner_id'],
    //'uom.uom': ['name','uom_type','measure_type'],
  };
};

const get_odoo = ({ host, db, success, error }) => {
  const modules = get_modules();
  const models = get_models();

  const odoo = new ODOO({ host, db, modules, models, success, error });
  console.log(odoo);
  return odoo;
};

export default get_odoo;
