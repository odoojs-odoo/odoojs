export default {
  models: {
    'stock.inventory': {
      fields: [
        'name',
        'date',
        'line_ids',
        'move_ids',
        'state',
        'company_id',
        'location_id',
        'product_id',
        'package_id',
        'partner_id',
        'lot_id',
        'filter',
        'total_qty',
        'category_id',
        'exhausted',
      ],
    },

    'stock.inventory.line': {
      fields: [
        'inventory_id',
        'partner_id',
        'product_id',
        'product_uom_id',
        'product_uom_category_id',
        'product_qty',
        'location_id',
        'package_id',
        'prod_lot_id',
        'company_id',
        'state',
        'theoretical_qty',
        'inventory_location_id',
        'product_tracking',
      ],
    },
  },
};
