const ModelFields = {
  activity_type_id: {},
  company_id: {},
  responsible: {},
  responsible_id: { readonly: [['responsible', '!=', 'other']] },
  summary: {}
}

const AddonsFields = {
  'hr.plan.plan_activity_type_ids': ModelFields
}

export default AddonsFields

