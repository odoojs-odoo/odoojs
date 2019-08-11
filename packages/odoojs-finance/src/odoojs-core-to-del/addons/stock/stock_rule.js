export default {
  models: {
    'stock.rule': {
      fields: [
        'name',
        'active',
        'group_propagation_option',
        'group_id',
        'action',
        'sequence',
        'company_id',
        'location_id',
        'location_src_id',
        'procure_method',
        'route_sequence',
        'picking_type_id',
        'delay',
        'partner_address_id',
        'propagate',
        'warehouse_id',
        'propagate_warehouse_id',
        'auto',
        'rule_message',
      ],
    },

    'procurement.group': {
      fields: ['name', 'partner_id', 'move_type'],
    },
  },
};
