import account from './account';
import account_fiscal_year from './account_fiscal_year';
import account_incoterms from './account_incoterms';
import account_invoice from './account_invoice';
import account_move from './account_move';
import account_payment from './account_payment';
import company from './company';
import product from './product';
import partner from './partner';

export default {
  name: 'account',
  depends: ['product', 'analytic'],
  models: {
    ...account.models,
    ...account_fiscal_year,
    ...account_incoterms,
    ...account_invoice.models,
    ...account_move.models,
    ...account_payment.models,
    ...company.models,
    ...product.models,
    ...partner.models,
  },
};
