const ModelFields = {
  create_variant: {
    readonly: [['number_related_products', '!=', 0]]
  },

  display_type: {},
  name: {},
  number_related_products: {},
  sequence: {},
  value_ids: {}
}

const AddonsFields = {
  'product.attribute': ModelFields
}

export default AddonsFields

