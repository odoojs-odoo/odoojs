const mrp_production_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.action_assign = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'action_assign',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.button_plan = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'button_plan',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.action_cancel = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'action_cancel',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.post_inventory = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'post_inventory',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.button_mark_done = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'button_mark_done',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.button_unreserve = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'button_mark_done',
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
    'mrp.production': {
      fields: [
        'name',
        'origin',
        'product_id',
        'product_tmpl_id',
        'product_qty',
        'product_uom_id',
        'product_uom_qty',
        'picking_type_id',
        'location_src_id',
        'location_dest_id',
        'date_planned_start',
        'date_planned_finished',
        'date_start',
        'date_finished',
        'bom_id',
        'routing_id',
        'move_raw_ids',
        'move_finished_ids',
        'finished_move_line_ids',
        'workorder_ids',
        'workorder_count',
        'workorder_done_count',
        'move_dest_ids',
        'state',
        'availability',
        'unreserve_visible',
        'post_visible',
        'consumed_less_than_planned',
        'user_id',
        'company_id',
        'check_to_done',
        'qty_produced',
        'procurement_group_id',
        'propagate',
        'has_moves',
        'scrap_ids',
        'scrap_count',
        'priority',
        'is_locked',
        'show_final_lots',
        'production_location_id',
        'picking_ids',
        'delivery_count',
      ],

      extend: mrp_production_extend,
    },
  },
};
