const ModelFields = {
  active: {},
  company_id: { groups: 'base.group_multi_company' },
  department_id: {},
  name: { placeholder: 'e.g. Onboarding' },
  plan_activity_type_ids: {},
  steps_count: {}
}

const AddonsFields = {
  'hr.plan': ModelFields
}

export default AddonsFields

