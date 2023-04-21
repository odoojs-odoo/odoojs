const ModelFields = {
  active: {},
  company_id: { groups: 'base.group_multi_company' },
  display_name: {},
  manager_id: {},
  name: {},
  parent_id: {},
  plans_count: { string: 'Plans' },
  total_employee: { string: 'Employees' }
}

const AddonsFields = {
  'hr.department': ModelFields
}

export default AddonsFields

