const ModelFields = {
  default_code: {},
  description_picking: {
    placeholder: 'This note is added to internal transfer orders (e.g. where to pick the product in the warehouse).'
  },

  description_pickingin: {
    placeholder: 'This note is added to receipt orders (e.g. where to store the product in the warehouse).'
  },

  description_pickingout: {
    placeholder: 'This note is added to delivery orders.'
  },

  has_available_route_ids: {},
  nbr_moves_in: {},
  nbr_moves_out: {},
  nbr_reordering_rules: {},
  property_stock_inventory: {},
  property_stock_production: {},
  qty_available: {},
  reordering_max_qty: {},
  reordering_min_qty: {},
  responsible_id: {
    groups: 'stock.group_stock_user',
    domain: [['share', '=', false]]
  },

  route_from_categ_ids: {},
  route_ids: {},
  sale_delay: {},
  show_forecasted_qty_status_button: {},
  show_on_hand_qty_status_button: {},
  tracking: {},
  uom_id: {},
  uom_name: {},
  virtual_available: {}
}

const AddonsFields = {
  'product.template': ModelFields
}

export default AddonsFields

