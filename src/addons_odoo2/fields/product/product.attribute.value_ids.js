const ModelFields = {
  display_type: {},
  html_color: {},
  is_custom: {
    groups: 'product.group_product_variant'
  },

  name: {},
  sequence: {}
}

const AddonsFields = {
  'product.attribute.value_ids': ModelFields
}

export default AddonsFields

