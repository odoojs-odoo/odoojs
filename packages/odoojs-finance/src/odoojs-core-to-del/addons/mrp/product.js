export default {
  models: {
    'product.template': {
      fields: [
        'bom_line_ids',
        'bom_ids',
        'bom_count',
        'used_in_bom_count',
        'mrp_product_qty',
        'produce_delay',
      ],
    },

    'product.product': {
      fields: [
        'variant_bom_ids',
        'bom_line_ids',
        'bom_count',
        'used_in_bom_count',
        'mrp_product_qty',
      ],
    },
  },
};
