const ModelFields = {
  active: {},
  comment: {
    placeholder: 'External note...'
  },

  company_id: {
    groups: 'base.group_multi_company'
  },

  complete_name: {
    string: 'Location'
  },

  cyclic_inventory_frequency: {},
  last_inventory_date: {},
  location_id: {
    placeholder: 'e.g. Physical Locations'
  },

  name: {
    placeholder: 'e.g. Spare Stock'
  },

  next_inventory_date: {},
  removal_strategy_id: {},
  replenish_location: {},
  return_location: {},
  scrap_location: {},
  storage_category_id: {
    groups: 'stock.group_stock_storage_categories',
    readonly: [['usage', '!=', 'internal']]
  },

  usage: {}
}

const AddonsFields = {
  'stock.location': ModelFields
}

export default AddonsFields

