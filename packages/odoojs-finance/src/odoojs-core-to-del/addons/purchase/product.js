export default {
  models: {
    'product.template': {
      fields: [
        //  'property_account_creditor_price_difference',
        'purchased_product_qty',
        'purchase_method',
      ],
    },

    'product.product': {
      fields: ['purchased_product_qty'],
    },

    'product.category': {
      fields: [
        //  'property_account_creditor_price_difference_categ',
      ],
    },

    'res.partner': {
      fields: [
        'property_purchase_currency_id',
        'purchase_order_count',
        'supplier_invoice_count',
      ],
    },
  },
};
