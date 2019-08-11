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
    'mrp.workcenter': {
      fields: [
        'name',
        'time_efficiency',
        'active',
        'code',
        'note',
        'capacity',
        'sequence',
        'color',
        'costs_hour',
        'time_start',
        'time_stop',
        'routing_line_ids',
        'order_ids',
        'workorder_count',
        'workorder_ready_count',
        'workorder_progress_count',
        'workorder_pending_count',
        'workorder_late_count',
        'time_ids',
        'working_state',
        'blocked_time',
        'productive_time',
        'oee',
        'oee_target',
        'performance',
        'workcenter_load',
      ],
    },

    'mrp.unbuild': {
      fields: ['name'],

      extend: mrp_unbuild_extend,
    },
  },
};
