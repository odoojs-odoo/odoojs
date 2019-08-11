const product_product_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.get_theoretical_quantity = async (product_id, location_id, kwargs) => {
    //const { lot_id=null, package_id=null, owner_id=null, to_uom=null } = kwargs
    return cls.call(
      'get_theoretical_quantity',
      [product_id, location_id],
      kwargs
    );
  };

  return cls;
};

export default {
  models: {
    'product.product': {
      fields: [
        'stock_quant_ids',
        'stock_move_ids',
        'qty_available',
        'virtual_available',
        'incoming_qty',
        'outgoing_qty',
        'orderpoint_ids',
        'nbr_reordering_rules',
        'reordering_min_qty',
        'reordering_max_qty',
      ],

      extend: product_product_extend,
    },

    'product.template': {
      fields: [
        'responsible_id',
        'type',
        'property_stock_production',
        'property_stock_inventory',
        'sale_delay',
        'tracking',
        'description_picking',
        'description_pickingout',
        'description_pickingin',
        'qty_available',
        'virtual_available',
        'incoming_qty',
        'outgoing_qty',
        'location_id',
        'warehouse_id',
        'route_ids',
        'nbr_reordering_rules',
        'reordering_min_qty',
        'reordering_max_qty',
        'route_from_categ_ids',
      ],
    },

    'product.category': {
      fields: ['route_ids', 'removal_strategy_id', 'total_route_ids'],
    },
  },
};
