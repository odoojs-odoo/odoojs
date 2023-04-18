const ModelFields = {
  activity_category: {},
  activity_type_id: {
    required: '1'
  },

  chaining_type: {},
  date_deadline: {},
  has_recommended_activities: {},
  id: {},
  note: {
    placeholder: 'Log a note...'
  },

  previous_activity_type_id: {},
  recommended_activity_type_id: {
    string: 'Recommended Activities',
    domain: {
      todo_ctx: "[('previous_type_ids', '=', previous_activity_type_id)]"
    }
  },

  res_id: {},
  res_model: {},
  res_model_id: {},
  res_name: {},
  summary: {
    placeholder: 'e.g. Discuss proposal'
  },

  user_id: {}
}

const AddonsFields = {
  'mail.activity': ModelFields
}

export default AddonsFields

