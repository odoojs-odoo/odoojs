export default {
  name: 'purchase_stock',
  depends: ['stock_account', 'purchase'],
  models: {
    'purchase.order': {
      fields: [
        'incoterm_id',
        'picking_count',
        'picking_ids',
        'picking_type_id',
        'default_location_dest_id_usage',
        'group_id',
        'is_shipped',
      ],
    },

    'purchase.order.line': {
      fields: ['move_ids', 'orderpoint_id', 'move_dest_ids'],
    },

    'stock.picking': {
      fields: ['purchase_id'],
    },

    'stock.move': {
      fields: ['purchase_line_id', 'created_purchase_line_id'],
    },

    'stock.warehouse': {
      fields: ['buy_to_resupply', 'buy_pull_id'],
    },

    'stock.production.lot': {
      fields: ['purchase_order_ids', 'purchase_order_count'],
    },
  },
};
