const ModelFields = {
  active: {},
  auto_show_reception_report: { groups: 'stock.group_reception_report' },
  code: {},
  company_id: { groups: 'base.group_multi_company' },
  create_backorder: {},
  default_location_dest_id: { required: [['code', 'in', ('internal', 'incoming')]] },
  default_location_src_id: { required: [['code', 'in', ('internal', 'outgoing')]] },
  hide_reservation_method: {},
  name: { placeholder: 'e.g. Receptions' },
  reservation_days_before: {},
  reservation_days_before_priority: {},
  reservation_method: {},
  return_picking_type_id: { string: 'Returns Type' },
  sequence: {},
  sequence_code: {},
  sequence_id: { groups: 'base.group_no_one' },
  show_entire_packs: {},
  show_operations: {},
  show_reserved: {},
  use_create_lots: { string: 'Create New' },
  use_existing_lots: { string: 'Use Existing ones' },
  warehouse_id: { groups: 'stock.group_stock_multi_warehouses' }
}

const AddonsFields = {
  'stock.picking.type': ModelFields
}

export default AddonsFields

