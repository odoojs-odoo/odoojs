export default {
  models: {
    'mrp.routing': {
      fields: [
        'name',
        'active',
        'code',
        'note',
        'operation_ids',
        'location_id',
        'company_id',
      ],
    },

    'mrp.routing.workcenter': {
      fields: [
        'name',
        'workcenter_id',
        'sequence',
        'routing_id',
        'company_id',
        'worksheet',
        'time_mode',
        'time_mode_batch',
        'time_cycle_manual',
        'time_cycle',
        'workorder_count',
        'batch',
        'batch_size',
        'workorder_ids',
      ],
    },
  },
};
