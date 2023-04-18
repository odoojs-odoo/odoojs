const ModelFields = {
  attribute_id: {
    readonly: [['id', '!=', false]]
  },

  value_count: {},
  value_ids: {
    context: {
      todo_ctx: "{'default_attribute_id': attribute_id, 'show_attribute': False}"
    }
  }
}

const AddonsFields = {
  'product.template.attribute_line_ids': ModelFields
}

export default AddonsFields

