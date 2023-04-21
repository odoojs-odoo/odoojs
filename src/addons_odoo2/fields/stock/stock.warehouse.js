const ModelFields = {
  active: {},
  code: { placeholder: 'e.g. CW' },
  company_id: { groups: 'base.group_multi_company' },
  delivery_steps: {},
  in_type_id: { readonly: '1' },
  int_type_id: { readonly: '1' },
  lot_stock_id: {
    required: '0',
    readonly: '1',
    groups: 'stock.group_stock_multi_locations'
  },

  name: { placeholder: 'e.g. Central Warehouse' },
  out_type_id: { readonly: '1' },
  pack_type_id: { readonly: '1' },
  partner_id: {},
  pick_type_id: { readonly: '1' },
  reception_steps: {},
  resupply_wh_ids: {
    groups: 'stock.group_stock_multi_warehouses',
    domain: [['id', '!=', <built-in function id>]]
  },

  sequence: {},
  view_location_id: {
    string: 'Warehouse view location',
    required: '0',
    readonly: '1'
  },

  wh_input_stock_loc_id: { readonly: '1' },
  wh_output_stock_loc_id: { readonly: '1' },
  wh_pack_stock_loc_id: { readonly: '1' },
  wh_qc_stock_loc_id: { readonly: '1' }
}

const AddonsFields = {
  'stock.warehouse': ModelFields
}

export default AddonsFields

