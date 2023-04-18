const ModelFields = {
  location_id: {},
  lot_id: {
    groups: 'stock.group_production_lot'
  },

  quantity: {}
}

const AddonsFields = {
  'stock.warn.insufficient.qty.quant_ids': ModelFields
}

export default AddonsFields

