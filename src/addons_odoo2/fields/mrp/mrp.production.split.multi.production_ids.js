const ModelFields = {
  product_id: {},
  product_qty: {},
  product_uom_id: { groups: 'uom.group_uom' },
  production_capacity: {},
  production_id: {}
}

const AddonsFields = {
  'mrp.production.split.multi.production_ids': ModelFields
}

export default AddonsFields

