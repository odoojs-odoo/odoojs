const ModelFields = {
  commitment_date: {},
  delivery_count: {
    string: 'Delivery'
  },

  display_qty_widget: {},
  effective_date: {},
  expected_date: {},
  forecast_expected_date: {},
  free_qty_today: {},
  incoterm: {
    groups: 'sale_stock.group_display_incoterm'
  },

  incoterm_location: {
    groups: 'sale_stock.group_display_incoterm'
  },

  invoice_status: {},
  is_mto: {},
  json_popover: {
    string: ' '
  },

  move_ids: {},
  picking_policy: {
    required: 'True'
  },

  qty_available_today: {},
  qty_to_deliver: {},
  route_id: {
    groups: 'stock.group_adv_location'
  },

  scheduled_date: {},
  show_json_popover: {},
  virtual_available_at_date: {},
  warehouse_id: {
    groups: 'stock.group_stock_multi_warehouses'
  }
}

const AddonsFields = {
  'sale.order': ModelFields
}

export default AddonsFields

