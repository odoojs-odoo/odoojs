const ModelFields = {
  active: {},
  calendar_id: {},
  company_id: { groups: 'base.group_multi_company' },
  name: {},
  resource_type: {},
  time_efficiency: {},
  tz: {},
  user_id: { required: [['resource_type', '=', 'user']] }
}

const AddonsFields = {
  'resource.resource': ModelFields
}

export default AddonsFields

