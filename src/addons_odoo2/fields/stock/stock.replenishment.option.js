const ModelFields = {
  free_qty: { string: 'Available Quantity' },
  lead_time: {},
  location_id: { string: 'Warehouse Location' },
  qty_to_order: {},
  route_id: {},
  uom: { string: 'UoM' },
  warehouse_id: { string: 'Warehouse' },
  warning_message: {}
}

const AddonsFields = {
  'stock.replenishment.option': ModelFields
}

export default AddonsFields

