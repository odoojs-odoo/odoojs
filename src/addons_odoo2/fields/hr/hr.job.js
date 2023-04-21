const ModelFields = {
  active: {},
  company_id: { groups: 'base.group_multi_company' },
  contract_type_id: {},
  department_id: {},
  description: {},
  expected_employees: {},
  message_needaction: {},
  name: { placeholder: 'e.g. Sales Manager' },
  no_of_employee: {},
  no_of_hired_employee: {},
  no_of_recruitment: {},
  sequence: {}
}

const AddonsFields = {
  'hr.job': ModelFields
}

export default AddonsFields

