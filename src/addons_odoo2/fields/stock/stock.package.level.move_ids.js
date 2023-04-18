const ModelFields = {
  product_id: {},
  product_uom: {
    groups: 'uom.group_uom'
  },

  product_uom_qty: {},
  quantity_done: {},
  state: {}
}

const AddonsFields = {
  'stock.package.level.move_ids': ModelFields
}

export default AddonsFields

