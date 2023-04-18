const ModelFields = {
  lot_id: {
    groups: 'stock.group_production_lot'
  },

  product_id: {},
  product_uom_id: {
    groups: 'uom.group_uom'
  },

  quantity: {}
}

const AddonsFields = {
  'stock.quant.package.quant_ids': ModelFields
}

export default AddonsFields

