const ModelFields = {
  activity_date_deadline_range: {},
  activity_date_deadline_range_type: {
    required: [['state', '=', 'next_activity'], ['activity_date_deadline_range', '>', 0]]
  },

  activity_note: {
    placeholder: 'Log a note...'
  },

  activity_summary: {
    placeholder: 'e.g. Discuss proposal'
  },

  activity_type_id: {
    required: [['state', '=', 'next_activity']]
  },

  activity_user_field_name: {
    required: [['state', '=', 'next_activity'], ['activity_user_type', '=', 'generic']]
  },

  activity_user_id: {
    required: [['state', '=', 'next_activity'], ['activity_user_type', '=', 'specific']]
  },

  activity_user_type: {
    required: [['state', '=', 'next_activity']]
  },

  mail_post_autofollow: {},
  mail_post_method: {
    required: [['state', '=', 'mail_post']]
  },

  partner_ids: {},
  template_id: {
    required: [['state', '=', 'mail_post']],
    context: {
      todo_ctx: "{'default_model': model_name,                                      'default_use_default_to': True}"
    }
  }
}

const AddonsFields = {
  'ir.actions.server': ModelFields
}

export default AddonsFields

