const ModelFields = {
  company_id: {},
  package_type_id: { required: '1' },
  quantity: {}
}

const AddonsFields = {
  'stock.storage.category.package_capacity_ids': ModelFields
}

export default AddonsFields

