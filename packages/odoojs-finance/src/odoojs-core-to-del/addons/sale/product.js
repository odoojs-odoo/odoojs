export default {
  models: {
    'product.pricelist': {
      fields: ['discount_policy'],
    },

    'product.template': {
      fields: ['optional_product_ids'],
    },

    'product.product': {
      fields: ['sales_count', 'optional_product_ids'],
    },

    // TBD 2019-7-13 product.attribute
    // TBD 2019-7-13 res.company

    'res.partner': {
      fields: ['sale_order_count', 'sale_order_ids'],
    },
  },
};
