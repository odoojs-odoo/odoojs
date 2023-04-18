const ModelFields = {
  company_id: {},
  location_id: {
    groups: 'stock.group_stock_multi_locations'
  },

  move_dest_exists: {},
  original_location_id: {},
  parent_location_id: {},
  picking_id: {},
  product_return_moves: {}
}

const AddonsFields = {
  'stock.return.picking': ModelFields
}

export default AddonsFields

