const ModelFields = {
  active: {},
  attendance_ids: {},
  company_id: { groups: 'base.group_multi_company' },
  hours_per_day: {},
  name: { string: 'Working Time' },
  two_weeks_calendar: {},
  two_weeks_explanation: {},
  tz: {},
  tz_offset: {}
}

const AddonsFields = {
  'resource.calendar': ModelFields
}

export default AddonsFields

