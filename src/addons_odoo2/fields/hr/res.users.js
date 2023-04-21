const ModelFields = {
  address_home_id: {},
  address_id: {
    readonly: [['can_edit', '=', false]],
    context: { show_address: 1 }
  },

  avatar_128: {},
  barcode: { readonly: [['can_edit', '=', false]] },
  birthday: { readonly: [['can_edit', '=', false]] },
  can_edit: {},
  certificate: { readonly: [['can_edit', '=', false]] },
  children: { readonly: [['can_edit', '=', false]] },
  coach_id: { readonly: [['can_edit', '=', false]] },
  company_id: {},
  country_of_birth: { readonly: [['can_edit', '=', false]] },
  create_employee: { string: 'Create Employee' },
  create_employee_id: {},
  department_id: { readonly: [['can_edit', '=', false]] },
  emergency_contact: { readonly: [['can_edit', '=', false]] },
  emergency_phone: { readonly: [['can_edit', '=', false]] },
  employee_bank_account_id: { readonly: [['can_edit', '=', false]] },
  employee_count: { string: 'Employee(s)' },
  employee_country_id: { readonly: [['can_edit', '=', false]] },
  employee_id: {},
  employee_ids: {},
  employee_parent_id: { readonly: [['can_edit', '=', false]] },
  employee_phone: {
    string: 'Phone',
    readonly: [['can_edit', '=', false]]
  },

  employee_type: { readonly: [['can_edit', '=', false]] },
  gender: { readonly: [['can_edit', '=', false]] },
  hr_presence_state: {},
  identification_id: { readonly: [['can_edit', '=', false]] },
  image_1920: {},
  job_title: {
    readonly: [['can_edit', '=', false]],
    placeholder: 'Job Position'
  },

  km_home_work: { readonly: [['can_edit', '=', false]] },
  last_activity: {},
  last_activity_time: {},
  marital: { readonly: [['can_edit', '=', false]] },
  mobile_phone: { readonly: [['can_edit', '=', false]] },
  name: {
    required: 'True',
    readonly: "context.get['from_my_profile', False]",
    placeholder: "Employee's Name"
  },

  passport_id: { readonly: [['can_edit', '=', false]] },
  permit_no: { readonly: [['can_edit', '=', false]] },
  pin: { readonly: [['can_edit', '=', false]] },
  place_of_birth: { readonly: [['can_edit', '=', false]] },
  private_city: { placeholder: 'City' },
  private_country_id: { placeholder: 'Country' },
  private_email: {
    string: 'Email',
    readonly: [['can_edit', '=', false]]
  },

  private_lang: {
    string: 'Language',
    readonly: [['can_edit', '=', false]]
  },

  private_state_id: {
    context: { todo_ctx: "{'default_country_id': private_country_id}" },
    placeholder: 'State'
  },

  private_street2: { placeholder: 'Street 2...' },
  private_street: { placeholder: 'Street...' },
  private_zip: { placeholder: 'ZIP' },
  share: {},
  spouse_birthdate: { readonly: [['can_edit', '=', false]] },
  spouse_complete_name: { readonly: [['can_edit', '=', false]] },
  study_field: { readonly: [['can_edit', '=', false]] },
  study_school: { readonly: [['can_edit', '=', false]] },
  tz: {},
  visa_expire: { readonly: [['can_edit', '=', false]] },
  visa_no: { readonly: [['can_edit', '=', false]] },
  work_email: { readonly: [['can_edit', '=', false]] },
  work_location_id: { readonly: [['can_edit', '=', false]] },
  work_phone: { readonly: [['can_edit', '=', false]] }
}

const AddonsFields = {
  'res.users': ModelFields
}

export default AddonsFields

