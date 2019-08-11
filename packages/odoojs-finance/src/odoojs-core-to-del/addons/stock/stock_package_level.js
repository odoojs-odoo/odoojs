export default {
  models: {
    'stock.package_level': {
      fields: [
        'package_id',
        'picking_id',
        'move_ids',
        'move_line_ids',
        'location_id',
        'location_dest_id',
        'is_done',
        'state',
        'is_fresh_package',
        'picking_source_location',
        'show_lots_m2o',
        'show_lots_text',
      ],
    },
  },
};
