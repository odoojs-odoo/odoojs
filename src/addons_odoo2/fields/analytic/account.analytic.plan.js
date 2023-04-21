const ModelFields = {
  all_account_count: {},
  applicability_ids: {},
  children_count: { string: 'Subplans' },
  color: {},
  company_id: { groups: 'base.group_multi_company' },
  default_applicability: {},
  name: {},
  parent_id: {}
}

const AddonsFields = {
  'account.analytic.plan': ModelFields
}

export default AddonsFields

