const ModelFields = {
  category_id: {
    string: 'Product Category',
    readonly: [['product_id', '!=', false]],
    required: [['product_id', '=', false], ['package_type_ids', '=', false]]
  },

  company_id: {
    groups: 'stock.group_stock_multi_locations'
  },

  location_in_id: {
    string: 'When product arrives in'
  },

  location_out_id: {
    readonly: [['location_in_id', '=', false]]
  },

  package_type_ids: {
    string: 'Package type',
    groups: 'stock.group_tracking_lot'
  },

  product_id: {
    string: 'Product',
    readonly: [['category_id', '!=', false]],
    required: [['category_id', '=', false], ['package_type_ids', '=', false]]
  },

  sequence: {},
  storage_category_id: {
    string: 'Having Category',
    groups: 'stock.group_stock_storage_categories'
  }
}

const AddonsFields = {
  'stock.putaway.rule': ModelFields
}

export default AddonsFields

