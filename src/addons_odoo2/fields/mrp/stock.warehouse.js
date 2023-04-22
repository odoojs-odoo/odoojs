const ModelFields = {
  manu_type_id: { readonly: 'True' },
  manufacture_steps: { groups: 'stock.group_adv_location' },
  manufacture_to_resupply: {},
  pbm_loc_id: {},
  pbm_type_id: {},
  sam_loc_id: {},
  sam_type_id: {}
}

const AddonsFields = {
  'stock.warehouse': ModelFields
}

export default AddonsFields

