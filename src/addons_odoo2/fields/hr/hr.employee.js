const ModelFields = {
  active: {},
  activity_date_deadline: {},
  activity_ids: {},
  activity_user_id: { string: 'Activity by' },
  address_home_id: {
    context: {
      show_address: 1,
      default_type: 'private',
      form_view_ref: 'base.res_partner_view_form_private'
    }
  },

  address_id: {
    context: { show_address: 1 }
  },

  avatar_128: {},
  bank_account_id: {
    context: { todo_ctx: "{'default_partner_id': address_home_id}" }
  },

  barcode: {},
  birthday: {},
  category_ids: {
    groups: 'hr.group_hr_user',
    placeholder: 'Tags'
  },

  certificate: {},
  children: {},
  coach_id: {},
  company_country_code: {},
  company_country_id: {},
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  country_id: {},
  country_of_birth: {},
  department_id: {},
  departure_date: {},
  departure_description: {},
  departure_reason_id: {},
  emergency_contact: {},
  emergency_phone: {},
  employee_type: {},
  gender: {},
  has_work_permit: {},
  hr_icon_display: {},
  hr_presence_state: {},
  id: {},
  identification_id: {},
  image_128: {},
  image_1920: {},
  job_id: {},
  job_title: { placeholder: 'Job Position' },
  km_home_work: {},
  lang: { string: 'Language' },
  last_activity: {},
  last_activity_time: {},
  marital: {},
  mobile_phone: {},
  name: {
    required: 'True',
    placeholder: "Employee's Name",
    readonly: '1'
  },

  parent_id: {},
  passport_id: {},
  permit_no: {},
  phone: {
    string: 'Phone',
    readonly: 'True'
  },

  pin: { string: 'PIN Code' },
  place_of_birth: {},
  private_email: { string: 'Email' },
  related_contacts_count: {},
  resource_calendar_id: { required: '1' },
  spouse_birthdate: {},
  spouse_complete_name: {},
  study_field: {},
  study_school: {},
  tz: { required: [['id', '!=', false]] },
  user_id: {
    string: 'Related User',
    domain: [['share', '=', false]],
    context: {
      allow_create_employee: false,
      default_create_employee: false
    }
  },

  user_partner_id: {},
  visa_expire: {},
  visa_no: {},
  work_email: {},
  work_location_id: {
    context: { todo_ctx: "{'default_address_id': address_id}" }
  },

  work_permit_expiration_date: {},
  work_phone: { readonly: '1' }
}

const AddonsFields = {
  'hr.employee': ModelFields
}

export default AddonsFields

