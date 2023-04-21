const ModelFields = {
  sms_method: {
    string: 'Send as',
    required: [['state', '=', 'sms']]
  },

  sms_template_id: {
    required: [['state', '=', 'sms']],
    context: { todo_ctx: "{'default_model': model_name}" }
  }
}

const AddonsFields = {
  'ir.actions.server': ModelFields
}

export default AddonsFields

