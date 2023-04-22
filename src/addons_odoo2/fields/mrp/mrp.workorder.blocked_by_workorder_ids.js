const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  date_planned_finished: { readonly: '1' },
  date_planned_start: { readonly: '1' },
  duration_expected: {},
  name: { string: 'Operation' },
  production_state: {},
  state: {},
  workcenter_id: {}
}

const AddonsFields = {
  'mrp.workorder.blocked_by_workorder_ids': ModelFields
}

export default AddonsFields

