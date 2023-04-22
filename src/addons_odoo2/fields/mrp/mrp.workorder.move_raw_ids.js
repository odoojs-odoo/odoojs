const ModelFields = {
  product_id: {},
  product_qty: { string: 'To Consume' },
  product_qty_available: { string: 'On Hand' },
  product_type: {},
  product_virtual_available: { string: 'Forecasted' },
  quantity_done: { string: 'Consumed' },
  reserved_availability: { string: 'Reserved' },
  state: {}
}

const AddonsFields = {
  'mrp.workorder.move_raw_ids': ModelFields
}

export default AddonsFields

