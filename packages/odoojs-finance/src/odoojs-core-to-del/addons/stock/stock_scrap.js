const stock_scrap_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.do_scrap = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'do_scrap',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  return cls;
};

export default {
  models: {
    'stock.scrap': {
      fields: [
        'name',
        'origin',
        'product_id',
        'product_uom_id',
        'tracking',
        'lot_id',
        'package_id',
        'owner_id',
        'move_id',
        'picking_id',
        'location_id',
        'scrap_location_id',
        'scrap_qty',
        'state',
        'date_expected',
      ],

      extend: stock_scrap_extend,
    },
  },
};
