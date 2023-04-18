const ModelFields = {
  active: {},
  code: {
    placeholder: 'e.g. CW'
  },

  company_id: {
    groups: 'base.group_multi_company'
  },

  delivery_steps: {},
  in_type_id: {},
  int_type_id: {},
  lot_stock_id: {
    groups: 'stock.group_stock_multi_locations'
  },

  name: {
    placeholder: 'e.g. Central Warehouse'
  },

  out_type_id: {},
  pack_type_id: {},
  partner_id: {},
  pick_type_id: {},
  reception_steps: {},
  resupply_wh_ids: {
    groups: 'stock.group_stock_multi_warehouses',
    domain: [['id', '!=', <built-in function id>]]
  },

  sequence: {},
  view_location_id: {
    string: 'Warehouse view location'
  },

  wh_input_stock_loc_id: {},
  wh_output_stock_loc_id: {},
  wh_pack_stock_loc_id: {},
  wh_qc_stock_loc_id: {}
}

const AddonsFields = {
  'stock.warehouse': ModelFields
}

export default AddonsFields

