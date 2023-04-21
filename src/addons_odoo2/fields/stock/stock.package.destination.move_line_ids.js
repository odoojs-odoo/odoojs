const ModelFields = {
  location_dest_id: {},
  lot_id: { groups: 'stock.group_production_lot' },
  product_id: {},
  qty_done: {}
}

const AddonsFields = {
  'stock.package.destination.move_line_ids': ModelFields
}

export default AddonsFields

