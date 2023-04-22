const ModelFields = {
  cal_client_id: { required: [['external_calendar_provider', '=', 'google']] },
  cal_client_secret: { required: [['external_calendar_provider', '=', 'google']] },
  external_calendar_provider: {},
  microsoft_outlook_client_identifier: { required: [['external_calendar_provider', '=', 'microsoft']] },
  microsoft_outlook_client_secret: { required: [['external_calendar_provider', '=', 'microsoft']] }
}

const AddonsFields = {
  'calendar.provider.config': ModelFields
}

export default AddonsFields

