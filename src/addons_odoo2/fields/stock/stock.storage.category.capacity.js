const ModelFields = {
  company_id: {},
  package_type_id: {
    groups: 'stock.group_tracking_lot',
    required: [['product_id', '=', false]],
    readonly: [['product_id', '!=', false]]
  },

  product_id: {
    required: [['package_type_id', '=', false]],
    readonly: [['package_type_id', '!=', false]]
  },

  product_uom_id: { groups: 'uom.group_uom' },
  quantity: {},
  storage_category_id: {}
}

const AddonsFields = {
  'stock.storage.category.capacity': ModelFields
}

export default AddonsFields

