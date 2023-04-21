const ModelFields = {
  calendar_id: {},
  company_id: { groups: 'base.group_multi_company' },
  date_from: {},
  date_to: {},
  name: { string: 'Reason' },
  resource_id: {}
}

const AddonsFields = {
  'resource.calendar.leaves': ModelFields
}

export default AddonsFields

