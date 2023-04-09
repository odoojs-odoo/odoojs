const ModelFields = {
  create_variant: {
    readonly({ record }) {
      // 'readonly': [('number_related_products', '!=', 0)]
      const { number_related_products } = record
      return number_related_products !== 0
    }
  }
}

const AddonsFields = {
  'product.attribute': ModelFields
}

export default AddonsFields
