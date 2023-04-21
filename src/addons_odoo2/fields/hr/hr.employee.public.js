const ModelFields = {
  active: {},
  address_id: {
    context: { show_address: 1 }
  },

  avatar_1920: {},
  coach_id: {},
  company_id: { groups: 'base.group_multi_company' },
  department_id: {
    context: { open_employees_kanban: 1 }
  },

  employee_type: {},
  image_128: {},
  job_title: { placeholder: 'Job Title' },
  mobile_phone: {},
  name: {
    required: 'True',
    placeholder: 'e.g. John Doe'
  },

  parent_id: {},
  resource_calendar_id: {},
  user_id: {},
  user_partner_id: {},
  work_email: {},
  work_location_id: {},
  work_phone: {}
}

const AddonsFields = {
  'hr.employee.public': ModelFields
}

export default AddonsFields

