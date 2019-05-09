export default {
  name: 'sale',
  depends: ['sales_team', 'payment'],
  models: {
    'sale.order': {
      fields: [],
    },

    'sale.order.line': {
      fields: [],
    },
  },
};
