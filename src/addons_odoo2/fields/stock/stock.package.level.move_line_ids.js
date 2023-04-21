const ModelFields = {
  lot_id: { groups: 'stock.group_production_lot' },
  lot_name: { groups: 'stock.group_production_lot' },
  owner_id: { groups: 'stock.group_tracking_owner' },
  product_id: {},
  product_uom_id: {
    string: 'Unit of Measure',
    groups: 'uom.group_uom',
    readonly: [['reserved_uom_qty', '!=', 0.0]]
  },

  qty_done: {},
  reserved_uom_qty: {},
  state: {}
}

const AddonsFields = {
  'stock.package.level.move_line_ids': ModelFields
}

export default AddonsFields

