const ModelFields = {
  move_id: {},
  product_id: {},
  quantity: {},
  uom_id: { groups: 'uom.group_uom' }
}

const AddonsFields = {
  'stock.return.picking.product_return_moves': ModelFields
}

export default AddonsFields

