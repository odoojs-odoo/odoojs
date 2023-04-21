const ModelFields = {
  company_id: {},
  product_id: {
    context: { default_detailed_type: 'product' },
    required: '1'
  },

  product_uom_id: { groups: 'uom.group_uom' },
  quantity: {}
}

const AddonsFields = {
  'stock.storage.category.product_capacity_ids': ModelFields
}

export default AddonsFields

