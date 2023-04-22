const ModelFields = {
  capacity: {},
  product_id: {},
  product_uom_id: { groups: 'uom.group_uom' },
  time_start: {},
  time_stop: {}
}

const AddonsFields = {
  'mrp.workcenter.capacity_ids': ModelFields
}

export default AddonsFields

