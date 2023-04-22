const ModelFields = {
  active: {},
  alternative_workcenter_ids: {},
  blocked_time: {},
  capacity_ids: {
    context: { default_workcenter_id: 'todo===id' }
  },

  code: {},
  company_id: { groups: 'base.group_multi_company' },
  costs_hour: {},
  default_capacity: {},
  name: {
    string: 'Work Center Name',
    required: 'True'
  },

  note: { placeholder: 'Description of the work center...' },
  oee: {},
  oee_target: {},
  performance: {},
  productive_time: {},
  resource_calendar_id: { required: '1' },
  routing_line_ids: {},
  sequence: {},
  tag_ids: {},
  time_efficiency: {},
  time_start: {},
  time_stop: {},
  workcenter_load: {}
}

const AddonsFields = {
  'mrp.workcenter': ModelFields
}

export default AddonsFields

