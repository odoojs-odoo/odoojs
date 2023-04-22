const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  date_end: {},
  date_start: {},
  description: { placeholder: 'Add a description...' },
  duration: { string: 'Duration (minutes)' },
  loss_id: { domain: [['manual', '=', true]] },
  production_id: {},
  user_id: {},
  workcenter_id: {},
  workorder_id: {}
}

const AddonsFields = {
  'mrp.workcenter.productivity': ModelFields
}

export default AddonsFields

