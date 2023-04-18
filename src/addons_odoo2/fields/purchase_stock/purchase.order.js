const ModelFields = {
  default_location_dest_id_usage: {},
  dest_address_id: {
    groups: 'stock.group_stock_multi_locations',
    required: [['default_location_dest_id_usage', '=', 'customer']]
  },

  effective_date: {},
  forecasted_issue: {},
  incoming_picking_count: {
    string: 'Receipt'
  },

  incoterm_id: {},
  incoterm_location: {},
  invoice_status: {},
  is_shipped: {},
  move_dest_ids: {},
  move_ids: {},
  on_time_rate: {},
  picking_type_id: {
    groups: 'stock.group_stock_multi_locations',
    domain: {
      todo_ctx: "[('code','=','incoming'), '|', ('warehouse_id', '=', False), ('warehouse_id.company_id', '=', company_id)]"
    }
  },

  propagate_cancel: {
    groups: 'base.group_no_one'
  }
}

const AddonsFields = {
  'purchase.order': ModelFields
}

export default AddonsFields

