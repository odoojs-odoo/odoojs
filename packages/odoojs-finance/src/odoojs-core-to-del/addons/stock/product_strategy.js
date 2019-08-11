export default {
  models: {
    'product.removal': {
      fields: ['name', 'method'],
    },

    'product.putaway': {
      fields: ['name', 'fixed_location_ids', 'product_location_ids'],
    },

    'stock.fixed.putaway.strat': {
      fields: [
        'product_id',
        'putaway_id',
        'category_id',
        'fixed_location_id',
        'sequence',
      ],
    },
  },
};
