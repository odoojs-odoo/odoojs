import account from './account';
import product from './product';
import purchase from './purchase';

// product.py in product.js
// res_company.py in product.js
// res_partner.py in product.js

export default {
  name: 'purchase',
  depends: ['account'],

  models: {
    ...account.models,
    ...product.models,
    ...purchase.models,
  },
};
