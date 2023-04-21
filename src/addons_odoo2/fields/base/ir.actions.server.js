const ModelFields = {
  child_ids: {
    domain: { todo_ctx: "[('model_id', '=', model_id)]" }
  },

  code: { placeholder: 'Enter Python code here. Help about Python expression is available in the help tab of this document.' },
  crud_model_id: { required: [['state', '=', 'object_create']] },
  crud_model_name: {},
  fields_lines: {},
  groups_id: {},
  link_field_id: {
    domain: { todo_ctx: "[('model_id', '=', model_id), ('relation', '=', crud_model_name),                                     ('ttype', 'in', ['many2one', 'one2many', 'many2many'])]" },
    context: { todo_ctx: "{'default_model_id': model_id, 'default_relation': crud_model_name}" }
  },

  model_id: {},
  model_name: {},
  name: { placeholder: 'e.g. Update order quantity' },
  sequence: {},
  state: {},
  type: {},
  usage: {}
}

const AddonsFields = {
  'ir.actions.server': ModelFields
}

export default AddonsFields

