const ModelFields = {
  counter: {},
  product_id: {},
  product_qty: {},
  product_uom_id: { groups: 'uom.group_uom' },
  production_capacity: {},
  production_detailed_vals_ids: {},
  production_id: { readonly: '1' },
  production_split_multi_id: {},
  valid_details: {}
}

const AddonsFields = {
  'mrp.production.split': ModelFields
}

export default AddonsFields

