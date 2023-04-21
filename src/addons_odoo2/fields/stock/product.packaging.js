const ModelFields = {
  package_type_id: { groups: 'stock.group_tracking_lot' },
  route_ids: { groups: 'stock.group_adv_location' }
}

const AddonsFields = {
  'product.packaging': ModelFields
}

export default AddonsFields

