const ModelFields = {
  activity_type_id: {},
  company_id: { groups: 'base.group_multi_company' },
  note: {},
  responsible: {},
  responsible_id: {},
  summary: {}
}

const AddonsFields = {
  'hr.plan.activity.type': ModelFields
}

export default AddonsFields

