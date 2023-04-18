const ModelFields = {
  categ_id: {},
  display_name: {
    string: 'Product'
  },

  free_qty: {
    string: 'Free to Use'
  },

  id: {},
  incoming_qty: {},
  nbr_moves_in: {},
  nbr_moves_out: {},
  nbr_reordering_rules: {},
  outgoing_qty: {},
  qty_available: {
    string: 'On Hand'
  },

  reordering_max_qty: {},
  reordering_min_qty: {},
  show_forecasted_qty_status_button: {},
  show_on_hand_qty_status_button: {},
  tracking: {},
  type: {},
  uom_id: {
    string: 'Unit',
    groups: 'uom.group_uom'
  },

  uom_name: {},
  virtual_available: {
    string: 'Forecasted'
  }
}

const AddonsFields = {
  'product.product': ModelFields
}

export default AddonsFields

