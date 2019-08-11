const mrp_unbuild_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.action_unbuild = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'action_unbuild',
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
    'mrp.unbuild': {
      fields: [
        'name',
        'product_id',
        'product_qty',
        'product_uom_id',
        'bom_id',
        'mo_id',
        'lot_id',
        'has_tracking',
        'location_id',
        'location_dest_id',
        'consume_line_ids',
        'produce_line_ids',
        'state',
      ],

      extend: mrp_unbuild_extend,
    },
  },
};
