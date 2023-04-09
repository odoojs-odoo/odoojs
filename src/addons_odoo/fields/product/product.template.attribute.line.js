const ModelFields = {
  attribute_id: {
    readonly({ record }) {
      // 'readonly': [('id', '!=', False)]
      return !record.id
    }
  }
}

const AddonsFields = {
  'product.template.attribute.line': ModelFields
}

export default AddonsFields
