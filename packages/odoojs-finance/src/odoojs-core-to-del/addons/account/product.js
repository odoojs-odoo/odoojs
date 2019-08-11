export default {
  models: {
    'product.category': {
      fields: [
        'property_account_income_categ_id',
        'property_account_expense_categ_id',
      ],
    },

    'product.template': {
      fields: [
        //  'taxes_id',
        //  'supplier_taxes_id',
        'property_account_income_id',
        'property_account_expense_id',
      ],
    },

    'product.product': {
      fields: [
        //  'taxes_id',
        //  'supplier_taxes_id',
        'property_account_income_id',
        'property_account_expense_id',
      ],
    },
  },
};
