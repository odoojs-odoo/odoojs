const ModelFields = {
  access_token: {},
  active: {},
  alarm_ids: { readonly: [['recurrency', '=', true]] },
  allday: {},
  attendee_ids: { readonly: '1' },
  attendee_status: {},
  byday: {
    string: 'The',
    required: [['recurrency', '=', true], ['month_by', '=', 'day'], ['rrule_type', '=', 'monthly']]
  },

  categ_ids: { readonly: [['recurrency', '=', true]] },
  count: { required: [['recurrency', '=', true]] },
  day: { required: [['month_by', '=', 'date'], ['rrule_type', '=', 'monthly']] },
  description: { readonly: [['recurrency', '=', true]] },
  duration: {
    string: 'Duration',
    readonly: '===todo=='
  },

  duration_$_form: { readonly: [['id', '!=', false], ['recurrency', '=', true]] },
  duration_$_tree: { readonly: '1' },
  end_type: { required: [['recurrency', '=', true]] },
  event_tz: {},
  interval: { required: [['recurrency', '=', true]] },
  invalid_email_partner_ids: {},
  location: { readonly: [['recurrency', '=', true]] },
  message_needaction: {},
  month_by: {},
  name: {
    placeholder: 'e.g. Business Lunch',
    string: 'Subject',
    readonly: [['recurrency', '=', true]]
  },

  partner_ids: {
    domain: [['type', '!=', 'private']],
    context: { force_email: true },
    placeholder: 'Select attendees...',
    readonly: [['recurrency', '=', true]]
  },

  privacy: { readonly: [['recurrency', '=', true]] },
  recurrence_id: {},
  recurrency: { readonly: '1' },
  res_id: {},
  res_model: {},
  rrule_type: { required: [['recurrency', '=', true]] },
  show_as: { readonly: [['recurrency', '=', true]] },
  start: {
    string: '===todo==',
    required: [['allday', '=', false]],
    readonly: '1'
  },

  start_$_form: { string: 'Starting at' },
  start_$_tree: { string: 'Start Date' },
  start_date: {
    string: 'Starting at',
    required: [['allday', '=', true]]
  },

  stop: {
    string: '===todo==',
    readonly: '1'
  },

  stop_$_form: { string: 'Ending At' },
  stop_$_tree: { string: 'End Date' },
  stop_date: {
    string: 'Ending at',
    required: [['allday', '=', true]]
  },

  until: { required: [['end_type', '=', 'end_date'], ['recurrency', '=', true]] },
  user_id: { readonly: [['recurrency', '=', true]] },
  videocall_location: {
    string: 'Videocall URL',
    readonly: '1'
  },

  videocall_source: {},
  weekday: { required: [['recurrency', '=', true], ['month_by', '=', 'day'], ['rrule_type', '=', 'monthly']] }
}

const AddonsFields = {
  'calendar.event': ModelFields
}

export default AddonsFields

