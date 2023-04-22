const ModelFields = {
  alarm_type: {},
  body: {},
  duration: {},
  interval: {},
  mail_template_id: {
    required: [['alarm_type', '=', 'email']],
    context: { default_model: 'calendar.event' }
  },

  name: {}
}

const AddonsFields = {
  'calendar.alarm': ModelFields
}

export default AddonsFields

