const ModelFields = {
  col1: {
    domain: {
      todo_ctx: "['|', ('model_id', '=', parent.crud_model_id), ('model_id', '=', parent.model_id)]"
    }
  },

  evaluation_type: {},
  resource_ref: {
    readonly: [['evaluation_type', '!=', 'reference']]
  },

  value: {
    readonly: [['evaluation_type', '=', 'reference']]
  }
}

const AddonsFields = {
  'ir.actions.server.fields_lines': ModelFields
}

export default AddonsFields

