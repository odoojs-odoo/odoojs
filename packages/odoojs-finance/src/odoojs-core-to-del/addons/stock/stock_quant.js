export default {
  models: {
    'stock.quant': {
      fields: [
        'product_id',
        'product_tmpl_id',
        'product_uom_id',
        'company_id',
        'location_id',
        'lot_id',
        'package_id',
        'owner_id',
        'quantity',
        'reserved_quantity',
        'in_date',
      ],
    },

    'stock.quant.package': {
      fields: [
        'name',
        'quant_ids',
        'packaging_id',
        'location_id',
        'company_id',
        'owner_id',
      ],
    },
  },
};
