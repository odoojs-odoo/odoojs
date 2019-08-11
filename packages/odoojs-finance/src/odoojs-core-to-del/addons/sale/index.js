import account from './account';
import product from './product';
import sale from './sale';

// account_invoice.py in account.js
// analytic.py in account.js
// TBD payment
// product_pricelist.py in product.js
// product_product.py in product.js
// product_template.py in product.js
// res_company.py in product.js
// res_partner.py in product.js

export default {
  name: 'sale',
  depends: ['sales_team', 'payment'],

  models: {
    ...account.models,
    ...product.models,
    ...sale.models,
  },
};
