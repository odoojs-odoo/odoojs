export default {
  name: 'sale_purchase',
  depends: ['sale', 'purchase'],
  models: {
    'product.template': {
      fields: ['service_to_purchase'],
    },

    'purchase.order.line': {
      fields: ['sale_order_id', 'sale_line_id'],
    },

    'sale.order': {
      fields: ['purchase_order_count'],
    },

    'sale.order.line': {
      fields: ['purchase_line_ids', 'purchase_line_count'],
    },
  },
};
