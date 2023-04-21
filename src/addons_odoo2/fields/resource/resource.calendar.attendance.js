const ModelFields = {
  date_from: {},
  date_to: {},
  day_period: {},
  dayofweek: {},
  display_name: { string: ' ' },
  display_type: {},
  hour_from: {},
  hour_to: {},
  name: {},
  sequence: {},
  week_type: {
    groups: 'base.group_no_one',
    readonly: '1'
  }
}

const AddonsFields = {
  'resource.calendar.attendance': ModelFields
}

export default AddonsFields

