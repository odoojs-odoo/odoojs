export default {
  name: 'sale_stock',
  depends: ['stock_account', 'sale'],
  models: {
    'account.invoice': {
      fields: ['incoterms_id'],
    },

    'res.company': {
      fields: ['security_lead'],
    },

    'sale.order': {
      fields: [
        'incoterm',
        'picking_policy',
        'warehouse_id',
        'picking_ids',
        'delivery_count',
        'procurement_group_id',
        'effective_date',
      ],
    },

    'sale.order.line': {
      fields: [
        'qty_delivered_method',
        'product_packaging',
        'route_id',
        'move_ids',
      ],
    },

    'stock.location.route': {
      fields: ['sale_selectable'],
    },

    'stock.move': {
      fields: ['sale_line_id'],
    },

    'procurement.group': {
      fields: ['sale_id'],
    },

    'stock.picking': {
      fields: ['sale_id'],
    },

    'stock.production.lot': {
      fields: ['sale_order_ids', 'sale_order_count'],
    },
  },
};
