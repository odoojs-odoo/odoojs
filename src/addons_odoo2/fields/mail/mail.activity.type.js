const ModelFields = {
  active: {},
  category: {},
  chaining_type: {},
  decoration_type: { groups: 'base.group_no_one' },
  default_note: { placeholder: 'e.g. "Go over the offer and discuss details"' },
  default_user_id: { domain: [['share', '=', false]] },
  delay_count: {},
  delay_from: { string: 'Type' },
  delay_label: { string: 'Planned in' },
  delay_unit: {},
  icon: { groups: 'base.group_no_one' },
  initial_res_model: {},
  mail_template_ids: {
    domain: { todo_ctx: "[('model_id.model', '=', res_model)]" },
    context: { todo_ctx: "{'default_model': res_model}" }
  },

  name: { placeholder: 'e.g. Schedule a meeting' },
  res_model: { groups: 'base.group_no_one' },
  res_model_change: {},
  sequence: {},
  suggested_next_type_ids: {
    context: { todo_ctx: "{'default_res_model': res_model}" }
  },

  summary: { placeholder: 'e.g. "Discuss proposal"' },
  triggered_next_type_id: {
    required: ['&', ['chaining_type', '=', 'trigger'], ['category', '!=', 'upload_file']],
    context: { todo_ctx: "{'default_res_model': res_model}" }
  }
}

const AddonsFields = {
  'mail.activity.type': ModelFields
}

export default AddonsFields

